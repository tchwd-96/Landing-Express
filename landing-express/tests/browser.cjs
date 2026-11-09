const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH,
    headless: true,
    args: ["--no-sandbox"],
  });
  const results = [];
  try {
    for (const slug of JSON.parse(
      fs.readFileSync(path.join(__dirname, "demos.json")),
    )) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const errors = [],
        external = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      page.on("request", (r) => {
        if (new URL(r.url()).hostname !== "127.0.0.1") external.push(r.url());
      });
      for (const width of [360, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`http://127.0.0.1:8765/demos/${slug}/`);
        assert.equal(await page.locator("h1").count(), 1);
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "horizontal overflow",
        );
        for (const a of await page.locator('a[href^="#"]').all()) {
          const target = await a.getAttribute("href");
          assert.equal(
            await page.locator(target).count(),
            1,
            `broken anchor ${target}`,
          );
        }
        await page.locator("nav .btn").click();
        assert.equal(new URL(page.url()).hash, "#contacto");
        const form = page.locator("form");
        await form.locator("button").click();
        assert.equal(await form.locator(".feedback").textContent(), "");
        await form.locator("input").nth(0).fill("Alex Demo");
        await form.locator("input[type=email]").fill("invalid");
        assert.equal(await form.evaluate((f) => f.checkValidity()), false);
        await form.locator("input[type=email]").fill("alex@example.test");
        for (const select of await form.locator("select").all())
          await select.selectOption({ index: 1 });
        const date = form.locator("[type=date]");
        if (await date.count()) {
          await date.fill("2020-01-01");
          assert.equal(await date.evaluate((e) => e.checkValidity()), false);
          await date.fill(await date.getAttribute("min"));
        }
        assert.equal(await form.evaluate((f) => f.checkValidity()), true);
        const url = page.url();
        await form.locator("button").click();
        assert.match(
          await form.locator(".feedback").textContent(),
          /No se ha enviado/,
        );
        assert.equal(page.url(), url);
        assert.equal(await form.locator("input").nth(0).inputValue(), "");
        await page.locator("details summary").first().click();
        assert.equal(
          await page.locator("details").first().getAttribute("open"),
          "",
        );
        for (const button of await page.locator("[data-simulate]").all()) {
          await button.click();
          assert(await page.locator("dialog").isVisible());
          await page.keyboard.press("Escape");
          assert.equal(await page.locator("dialog").isVisible(), false);
        }
        if (slug === "05-software") {
          await page.locator(".task input").first().check();
          assert.match(
            await page.locator("[data-count]").textContent(),
            /^1 de 3/,
          );
        }
        assert.equal(await page.evaluate(() => localStorage.length), 0);
        assert.equal((await context.cookies()).length, 0);
        results.push({
          slug,
          width,
          status: "passed",
          checks: [
            "no horizontal overflow",
            "anchors",
            "required fields",
            "invalid email",
            "valid local simulation",
            "reset",
            "FAQ",
            "modal/escape",
            "no storage",
          ],
        });
      }
      for (const [name, width] of [
        ["desktop", 1440],
        ["mobile", 390],
      ]) {
        await page.setViewportSize({
          width,
          height: name === "desktop" ? 1000 : 844,
        });
        await page.goto(`http://127.0.0.1:8765/demos/${slug}/`);
        await page.screenshot({
          path: path.join(root, "screenshots", `${slug}-${name}.png`),
          fullPage: true,
        });
      }
      await page.goto(`http://127.0.0.1:8765/demos/${slug}/`);
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").textContent(),
        "Saltar al contenido",
      );
      assert.deepEqual(errors, []);
      assert.deepEqual(external, []);
      const nojs = await browser.newContext({ javaScriptEnabled: false });
      const p = await nojs.newPage();
      await p.goto(`http://127.0.0.1:8765/demos/${slug}/`);
      assert(await p.locator("noscript").isVisible());
      await p.locator("form button").click();
      assert(!p.url().includes("?"));
      await nojs.close();
      await context.close();
    }
    fs.writeFileSync(
      path.join(__dirname, "results.json"),
      JSON.stringify(
        {
          testedAt: new Date().toISOString(),
          engine: await browser.version(),
          results,
          externalRequests: 0,
          pageErrors: 0,
          scope: "Chromium headless; not real device certification",
        },
        null,
        2,
      ),
    );
    console.log(
      `${results.length} viewport scenarios passed; 10 screenshots saved`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
