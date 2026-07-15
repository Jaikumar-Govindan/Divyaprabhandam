#!/usr/bin/env python3
"""Local static server with HTTP range support and content-status rebuild API.

Usage:
    python3 scripts/server.py   # PORT env overrides (default 8000)

Rebuild API (for content-status.html Update button):
    POST /api/rebuild-content-status
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
TARGET_DIR = str(ROOT)
BUILD_SCRIPT = ROOT / "scripts" / "build_content_status.py"
REBUILD_PATH = "/api/rebuild-content-status"


class RangeRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=TARGET_DIR, **kwargs)

    def send_head(self):
        self.protocol_version = "HTTP/1.1"
        return super().send_head()

    def do_POST(self):
        path = urlparse(self.path).path
        if path == REBUILD_PATH:
            self._rebuild_content_status()
            return
        self.send_error(404, "Not Found")

    def do_OPTIONS(self):
        path = urlparse(self.path).path
        if path == REBUILD_PATH:
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
            return
        self.send_error(404, "Not Found")

    def _rebuild_content_status(self) -> None:
        if not BUILD_SCRIPT.is_file():
            self._json_response(
                500,
                {"ok": False, "error": f"Missing builder: {BUILD_SCRIPT.name}"},
            )
            return

        try:
            result = subprocess.run(
                [sys.executable, str(BUILD_SCRIPT)],
                cwd=str(ROOT),
                capture_output=True,
                text=True,
                timeout=120,
            )
        except subprocess.TimeoutExpired:
            self._json_response(500, {"ok": False, "error": "Rebuild timed out"})
            return
        except OSError as exc:
            self._json_response(500, {"ok": False, "error": str(exc)})
            return

        if result.returncode != 0:
            err = (result.stderr or result.stdout or "rebuild failed").strip()
            self._json_response(500, {"ok": False, "error": err[:2000]})
            return

        out_path = ROOT / "content-status.json"
        generated_at = None
        totals = None
        if out_path.is_file():
            try:
                data = json.loads(out_path.read_text(encoding="utf-8"))
                generated_at = data.get("generatedAt")
                totals = data.get("totals")
            except json.JSONDecodeError:
                pass

        self._json_response(
            200,
            {
                "ok": True,
                "message": (result.stdout or "").strip(),
                "generatedAt": generated_at,
                "totals": totals,
            },
        )

    def _json_response(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    print(f"Starting network-optimized server on port {port}...")
    print(f"Serving files dynamically out of target folder: {TARGET_DIR}")
    print(f"Rebuild API: POST {REBUILD_PATH}")
    server = ThreadingHTTPServer(("0.0.0.0", port), RangeRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.server_close()
