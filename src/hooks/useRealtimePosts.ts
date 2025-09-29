import { useEffect, useRef } from 'react'

type PostEvent = {
  type: string
  resource: string
  id?: number | string
  // be conservative: payload shape varies, prefer unknown/Record
  payload?: Record<string, unknown>
}

export function useRealtimePosts(onEvent: (ev: PostEvent) => void) {
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Build WS url based on current location
    const loc = window.location
    const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:'
    // Backend exposes websocket at /ws/v1/posts/
    const url = `${protocol}//${loc.host}/ws/v1/posts/`

    let ws: WebSocket
    try {
      ws = new WebSocket(url)
    } catch (err) {
      console.error('Realtime WS connection failed to create', err)
      return
    }

    wsRef.current = ws

    ws.onopen = () => {
      console.debug('Realtime posts WS connected', url)
    }

    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data) as PostEvent
        onEvent(data)
      } catch (err) {
        console.error('Invalid WS message', err, evt.data)
      }
    }

    ws.onclose = (e) => {
      console.debug('Realtime posts WS closed', e.code, e.reason)
      wsRef.current = null
    }

    ws.onerror = (err) => {
      console.error('Realtime posts WS error', err)
    }

    return () => {
      try {
        ws.close()
      } catch (e: unknown) {
        console.debug('Error closing WS', e)
      }
      wsRef.current = null
    }
  }, [onEvent])
}

export default useRealtimePosts
