from http.server import HTTPServer, SimpleHTTPRequestHandler
import socket
from pyngrok import ngrok
import logging
import os

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve home.html when accessing the root URL
        if self.path == '/':
            self.path = '/home.html'
        
        # Log the requested path
        logging.info(f"Request path: {self.path}")
        
        # Check if the file exists in the current directory
        full_path = os.path.join(os.getcwd(), self.path.strip('/'))
        if not os.path.isfile(full_path):
            self.send_error(404, "File not found")
            self.serve_404_page()
            logging.error(f"File not found: {self.path}")
            return
        
        return super().do_GET()

    def serve_404_page(self):
        """Serve the custom 404 page."""
        self.send_response(404)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        try:
            with open("404.html", "rb") as file:
                self.wfile.write(file.read())
        except FileNotFoundError:
            logging.error("404.html not found")
            self.wfile.write(b"404 - File Not Found")

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

if __name__ == '__main__':
    port = 8080  # Using a non-standard port for easier setup
    server_address = ('', port)  # Listen on all available interfaces

    # Set up logging
    logging.basicConfig(level=logging.INFO)

    try:
        httpd = HTTPServer(server_address, MyHandler)
        # Set up ngrok tunnel
        public_url = ngrok.connect(port)
        
        logging.info(f"Server running on http://localhost:{port}")
        logging.info(f"From other devices on your network, use: http://{get_ip()}:{port}")
        logging.info(f"Public URL via ngrok: {public_url}")

        # Start the server
        httpd.serve_forever()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
