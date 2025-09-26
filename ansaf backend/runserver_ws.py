#!/usr/bin/env python
"""
Development script to run Django with Daphne for WebSocket support.
Usage: python runserver_ws.py
"""
import os
import sys
import subprocess
import importlib.util
from pathlib import Path

def is_daphne_available():
    """Check if daphne is available"""
    try:
        import daphne
        return True
    except ImportError:
        return False

def main():
    """Run Django development server with Daphne for WebSocket support"""

    # Add the current directory to Python path
    current_dir = Path(__file__).parent
    sys.path.insert(0, str(current_dir))

    # Set Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    try:
        if is_daphne_available():
            # Try to run with Daphne (ASGI server for WebSockets)
            print("Starting Django with Daphne (WebSocket support)...")
            subprocess.run([
                sys.executable, '-m', 'daphne',
                '--bind', '0.0.0.0',
                '--port', '8000',
                'backend.asgi:application'
            ], check=True)
        else:
            print("Daphne not available, falling back to standard Django runserver...")
            # Fallback to standard Django runserver
            subprocess.run([
                sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000'
            ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error starting server: {e}")
        print("Make sure Django is properly configured and all dependencies are installed.")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()