"use strict";
const dialog = document.querySelector("dialog");
function showMessage(title, text) {
  dialog.querySelector("h2").textContent = title;
  dialog.querySelector("p").textContent = text;
  dialog.showModal();
}
document
  .querySelectorAll("[data-simulate]")
  .forEach((b) =>
    b.addEventListener("click", () =>
      showMessage("Simulación local", b.dataset.simulate),
    ),
  );
document
  .querySelector("[data-close]")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
const form = document.querySelector("form");
form.addEventListener("submit", (e) => e.preventDefault());
form.addEventListener("input", () => {
  form.querySelector(".feedback").textContent = "";
});
form.querySelector("button").addEventListener("click", () => {
  if (form.reportValidity()) {
    form.querySelector(".feedback").textContent =
      "Simulación completada. No se ha enviado ni guardado ningún dato. No hay reserva, cita ni alta confirmada.";
    form.reset();
  }
});
const date = form.querySelector("[type=date]");
if (date) {
  const now = new Date();
  date.min = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}
const count = document.querySelector("[data-count]");
if (count)
  document
    .querySelectorAll(".task input")
    .forEach((x) =>
      x.addEventListener(
        "change",
        () =>
          (count.textContent =
            document.querySelectorAll(".task input:checked").length +
            " de 3 tareas completadas · simulación"),
      ),
    );
