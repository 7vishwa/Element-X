'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME, MOTION } from '@/constants/theme';
import { StatusIndicator } from './StatusIndicator';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isConnected: boolean;
  onMessage?: (message: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isConnected,
  onMessage,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize the welcome message on the client only to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: 'Ghost Agent Bridge Connected - Ready to handle messages',
        timestamp: new Date(),
      },
    ]);
  }, []);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    onMessage?.(input);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: Math.random().toString(36),
        role: 'agent',
        content: `Processing: "${input}" - AI drafting response...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);
  };

  const getMessageRoleBackgroundColor = (role: string) => {
    switch (role) {
      case 'user':
        return { bg: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' };
      case 'agent':
        return { bg: 'rgba(0, 255, 0, 0.05)', border: '1px solid rgba(0, 255, 0, 0.3)' };
      case 'system':
        return { bg: 'rgba(100, 100, 255, 0.05)', border: '1px solid rgba(100, 100, 255, 0.3)' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' };
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: THEME.colors.background,
        border: THEME.borders.thin,
        borderRadius: THEME.borderRadius.small,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        style={{
          padding: THEME.spacing.lg,
          borderBottom: THEME.borders.thin,
        }}
        {...MOTION.fadeIn}
      >
        <div style={{ marginBottom: THEME.spacing.md }}>
          <h2
            style={{
              fontSize: THEME.typography.xl,
              fontFamily: THEME.typography.mono,
              fontWeight: 700,
              color: THEME.colors.white,
              marginBottom: THEME.spacing.sm,
            }}
          >
            CHAT INTERFACE
          </h2>
          <p
            style={{
              fontSize: THEME.typography.sm,
              fontFamily: THEME.typography.sans,
              color: THEME.colors.inactive,
            }}
          >
            Direct messaging with automatic AI handoff
          </p>
        </div>

        {/* Status Badges */}
        <div style={{ display: 'flex', gap: THEME.spacing.md }}>
          <StatusIndicator
            status={isConnected ? 'agent_active' : 'disconnected'}
            animated={isConnected}
            size="sm"
          />
          <StatusIndicator
            status="encrypted_bridge"
            size="sm"
          />
        </div>
      </motion.div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: THEME.spacing.lg,
          display: 'flex',
          flexDirection: 'column',
          gap: THEME.spacing.md,
        }}
      >
        {messages.map((message, index) => {
          const styles = getMessageRoleBackgroundColor(message.role);
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...THEME.springPhysics.light,
                delay: index * 0.05,
              }}
              style={{
                backgroundColor: styles.bg,
                border: styles.border,
                borderRadius: THEME.borderRadius.small,
                padding: THEME.spacing.md,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: THEME.spacing.sm,
                }}
              >
                <span
                  style={{
                    fontSize: THEME.typography.xs,
                    fontFamily: THEME.typography.mono,
                    color:
                      message.role === 'user'
                        ? THEME.colors.white
                        : message.role === 'agent'
                          ? THEME.colors.active
                          : THEME.colors.encrypted,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {message.role}
                </span>
                <span
                  style={{
                    fontSize: THEME.typography.xs,
                    fontFamily: THEME.typography.mono,
                    color: THEME.colors.inactive,
                  }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p
                style={{
                  fontSize: THEME.typography.sm,
                  fontFamily: THEME.typography.sans,
                  color: THEME.colors.white,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {message.content}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Input Area */}
      <motion.div
        style={{
          padding: THEME.spacing.lg,
          borderTop: THEME.borders.thin,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{ display: 'flex', gap: THEME.spacing.md }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type message or command..."
            disabled={!isConnected}
            style={{
              flex: 1,
              padding: `${THEME.spacing.md} ${THEME.spacing.lg}`,
              backgroundColor: THEME.colors.background,
              border: THEME.borders.thin,
              color: THEME.colors.white,
              fontFamily: THEME.typography.sans,
              fontSize: THEME.typography.sm,
              borderRadius: THEME.borderRadius.small,
              cursor: isConnected ? 'text' : 'not-allowed',
              opacity: isConnected ? 1 : 0.5,
              transition: THEME.transitions.fast,
            }}
            onFocus={(e) => {
              if (isConnected) {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  THEME.colors.white;
              }
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor =
                THEME.colors.white;
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !input.trim()}
            style={{
              paddingRight: THEME.spacing.lg,
              paddingLeft: THEME.spacing.lg,
              paddingTop: THEME.spacing.md,
              paddingBottom: THEME.spacing.md,
              backgroundColor: THEME.colors.white,
              border: THEME.borders.thin,
              color: THEME.colors.black,
              fontFamily: THEME.typography.mono,
              fontSize: THEME.typography.sm,
              fontWeight: 700,
              cursor:
                isConnected && input.trim() ? 'pointer' : 'not-allowed',
              borderRadius: THEME.borderRadius.small,
              transition: THEME.transitions.fast,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: isConnected && input.trim() ? 1 : 0.5,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (isConnected && input.trim()) {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
              }
            }}
            onMouseLeave={(e) => {
              if (isConnected && input.trim()) {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }
            }}
          >
            TRANSMIT
          </button>
        </div>
      </motion.div>
    </div>
  );
};
