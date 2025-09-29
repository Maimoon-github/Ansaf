import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useBlogWebSocket, usePageWebSocket, WebSocketMessage } from '@/hooks/websocket';

interface WebSocketContextType {
  isBlogConnected: boolean;
  isPageConnected: boolean;
  lastBlogMessage: WebSocketMessage | null;
  lastPageMessage: WebSocketMessage | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const queryClient = useQueryClient();

  const blogWs = useBlogWebSocket(queryClient);
  const pageWs = usePageWebSocket(queryClient);

  const value: WebSocketContextType = {
    isBlogConnected: blogWs.isConnected,
    isPageConnected: pageWs.isConnected,
    lastBlogMessage: blogWs.lastMessage,
    lastPageMessage: pageWs.lastMessage,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}