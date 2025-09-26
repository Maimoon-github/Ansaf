import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface WebSocketMessage {
  type: string;
  resource: string;
  id: string | number;
  payload?: any;
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
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 1000; // Start with 1 second

  const connect = () => {
    if (!enabled || wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempts.current = 0;
        onOpen?.();
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
          onMessage?.(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        onClose?.();

        // Attempt to reconnect if enabled and under max attempts
        if (enabled && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          const delay = reconnectDelay * Math.pow(2, reconnectAttempts.current - 1); // Exponential backoff
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError?.(error);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      onError?.(error as Event);
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  };

  const sendMessage = (message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  };

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, url]);

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