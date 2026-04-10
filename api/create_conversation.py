import json
import requests

def main(request):
    TAVUS_API_KEY = "7c055a37d70c46719aaddaa9c34bc638"

    url = "https://api.tavus.io/v2/conversations"
    headers = {
        "Authorization": f"Bearer {TAVUS_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "assistant_id": "p3dc8f32b370"
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({
            "conversation_url": data.get("conversation_url")
        })
    }

def handler(request):
    return main(request)
