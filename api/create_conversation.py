from http.server import BaseHTTPRequestHandler
import json
import requests
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Tavus API endpoint
        url = "https://api.tavus.io/v2/conversations"

        payload = {
            "avatar_id": os.environ["r9bfd10a3e41"],
            "input": {}
        }

        headers = {
            "Authorization": f"Bearer {os.environ['7c055a37d70c46719aaddaa9c34bc638']}",
            "Content-Type": "application/json"
        }

        response = requests.post(url, json=payload, headers=headers)
        data = response.json()

        # Return JSON to the browser
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
