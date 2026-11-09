# Landing Express · Entrada aislada

Adjunta este ZIP a la conversación de CodeRabbit si la interfaz permite adjuntar archivos. `ORDEN_CODERABBIT.md` contiene el encargo completo. Para el primer paso basta el contenido de TRAZO junto con la orden.

## Abrir las demos

```bash
# Cambia a la carpeta que contiene el índice y el servidor de vista previa.
cd landing-express
# Sirve los archivos en 127.0.0.1, accesible desde este equipo.
python3 serve.py
```

Abre http://127.0.0.1:8765/ y detén el servidor con Ctrl+C. Las cinco demos son ficticias. El ZIP incluye cuatro capturas de la entrega original, dos para TRAZO y dos para BRUMA. Para ejecutar la prueba incluida, se requiere Node, Playwright y Chromium. El script usa el servidor anterior y actualiza las capturas y `tests/results.json`.

```bash
# Ejecuta las comprobaciones originales de las cinco demos con Playwright disponible.
node tests/browser.cjs
```

Si tu instalación utiliza una ruta propia, el script admite las variables `PLAYWRIGHT_MODULE` y `CHROMIUM_PATH`. El conjunto de pruebas original cubre las demos, por lo que la página de venta nueva requiere pruebas específicas.
