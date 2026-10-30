"""Optional: run a local test server with `python serve.py` (then open http://localhost:8000).
Not needed for hosting - the site is plain static files."""
import http.server, socketserver, webbrowser


PORT = 8000
with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as srv:
    print(f"NaijaWeb running at http://localhost:{PORT}  (Ctrl+C to stop)")
    webbrowser.open(f"http://localhost:{PORT}")
    srv.serve_forever()