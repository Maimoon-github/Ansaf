import { useEffect, useRef, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export interface WebSocketMessage {
  type: string;
  resource?: string;
  id?: string | number;
  payload?: unknown;
  timestamp?: string;
}

interface UseWebSocketOptions {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
  enabled?: boolean;
}

export function useWebSocket({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
  enabled = true,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 1000; // Start with 1 second

  const connect = useCallback(() => {
    if (!enabled || wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        // eslint-disable-next-line no-console
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempts.current = 0;
        onOpen?.();
      };

      wsRef.current.onmessage = (event: MessageEvent) => {
        try {
          const parsed = JSON.parse(event.data as string) as unknown;
          // Basic runtime check
          if (parsed && typeof parsed === 'object' && 'type' in (parsed as Record<string, unknown>)) {
            const message = parsed as WebSocketMessage;
            setLastMessage(message);
            onMessage?.(message);
          } else {
            // Unknown message shape — store as payload wrapper
            setLastMessage({ type: 'message', payload: parsed });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      wsRef.current.onclose = () => {
        // eslint-disable-next-line no-console
        console.log('WebSocket disconnected');
        setIsConnected(false);
        onClose?.();

        // Attempt to reconnect if enabled and under max attempts
        if (enabled && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          const delay = reconnectDelay * Math.pow(2, reconnectAttempts.current - 1); // Exponential backoff
          // eslint-disable-next-line no-console
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = window.setTimeout(() => {
            connect();
          }, delay);
        }
      };

      wsRef.current.onerror = (error) => {
        // eslint-disable-next-line no-console
        console.error('WebSocket error:', error);
        onError?.(error);
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create WebSocket connection:', error);
      onError?.(error as Event);
    }
  }, [enabled, url, onOpen, onClose, onError, onMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((message: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      // eslint-disable-next-line no-console
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, url, connect, disconnect]);

  return {
    isConnected,
    lastMessage,
    sendMessage,
    connect,
    disconnect,
  };
}

// Hook for real-time blog updates
export function useBlogWebSocket(queryClient: ReturnType<typeof useQueryClient>) {
  const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws/v1/posts/`;

  return useWebSocket({
    url: wsUrl,
    onMessage: (message) => {
      if (message.type === 'posts.created' || message.type === 'posts.updated' || message.type === 'posts.deleted') {
        // Invalidate and refetch blog queries
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        queryClient.invalidateQueries({ queryKey: ['blog', message.id] });

        // Show notification for real-time updates
        console.log(`Blog ${message.type.split('.')[1]}:`, message.id);
      }
    },
    onError: (error) => {
      console.error('Blog WebSocket error:', error);
    },
  });
}

// Hook for real-time page updates
export function usePageWebSocket(queryClient: ReturnType<typeof useQueryClient>) {
  const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws/v1/pages/`;

  return useWebSocket({
    url: wsUrl,
    onMessage: (message) => {
      if (message.type === 'pages.created' || message.type === 'pages.updated' || message.type === 'pages.deleted') {
        // Invalidate and refetch page queries
        queryClient.invalidateQueries({ queryKey: ['pages'] });
        queryClient.invalidateQueries({ queryKey: ['page', message.id] });

        // Show notification for real-time updates
        console.log(`Page ${message.type.split('.')[1]}:`, message.id);
      }
    },
    onError: (error) => {
      console.error('Page WebSocket error:', error);
    },
  });
}