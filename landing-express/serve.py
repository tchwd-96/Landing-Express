"""Servidor de vista previa, accesible solo en esta máquina."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parent)
print("Vista previa: http://127.0.0.1:8765 — Ctrl+C para detener")
ThreadingHTTPServer(("127.0.0.1",8765),SimpleHTTPRequestHandler).serve_forever()
