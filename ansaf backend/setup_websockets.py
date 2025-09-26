#!/usr/bin/env python
"""
Script to install missing WebSocket dependencies and test the setup.
"""
import subprocess
import sys

def install_daphne():
    """Install Daphne for WebSocket support"""
    print("Installing Daphne...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "daphne==4.1.2"])
        print("✅ Daphne installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install Daphne: {e}")
        return False

def test_websocket_setup():
    """Test if WebSocket setup is working"""
    print("\nTesting WebSocket setup...")

    try:
        import daphne
        print("✅ Daphne is available")
    except ImportError:
        print("❌ Daphne is not available")
        return False

    try:
        import channels
        print("✅ Channels is available")
    except ImportError:
        print("❌ Channels is not available")
        return False

    try:
        import websockets
        print("✅ WebSockets library is available")
    except ImportError:
        print("❌ WebSockets library is not available")
        return False

    return True

if __name__ == "__main__":
    print("Setting up WebSocket dependencies...")

    if install_daphne():
        if test_websocket_setup():
            print("\n🎉 WebSocket setup complete!")
            print("You can now run: python runserver_ws.py")
        else:
            print("\n❌ WebSocket setup failed")
    else:
        print("\n❌ Failed to install dependencies")