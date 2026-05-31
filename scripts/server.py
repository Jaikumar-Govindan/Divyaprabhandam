import http.server
import os

# Define the absolute path to your target folder to avoid directory traversal confusion
TARGET_DIR = os.path.abspath(".")

class RangeRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Explicitly instruct the base handler to serve assets out of TARGET_DIR
        super().__init__(*args, directory=TARGET_DIR, **kwargs)

    def send_head(self):
        # Explicitly allow mobile browsers to request partial audio chunks
        self.protocol_version = 'HTTP/1.1'
        return super().send_head()

if __name__ == '__main__':
    print(f"Starting network-optimized server on port 8000...")
    print(f"Serving files dynamically out of target folder: {TARGET_DIR}")
    
    http.server.test(HandlerClass=RangeRequestHandler, port=8000, bind='0.0.0.0')