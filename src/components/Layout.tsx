'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME, MOTION } from '@/constants/theme';
import { SecureBridge } from './SecureBridge';
import { ActivityMonitor } from './ActivityMonitor';
import { ChatInterface } from './ChatInterface';
import { StatusIndicator } from './StatusIndicator';

export const GhostAgentLayout: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showSecureBridge, setShowSecureBridge] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setMounted(true);
    // Auto-show SecureBridge on first load
    const hasConnected = localStorage.getItem('ghostAgentConnected');
    if (!hasConnected) {
      setShowSecureBridge(true);
    } else {
      setIsConnected(true);
    }

    // Update time on client only
    setCurrentTime(new Date().toLocaleString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthenticated = () => {
    setIsConnected(true);
    localStorage.setItem('ghostAgentConnected', 'true');
  };

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      localStorage.removeItem('ghostAgentConnected');
    } else {
      setShowSecureBridge(true);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: THEME.colors.background,
        color: THEME.colors.white,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header */}
      <motion.header
        style={{
          padding: `${THEME.spacing.lg} ${THEME.spacing.xl}`,
          borderBottom: THEME.borders.thin,
          position: 'relative',
          zIndex: 1,
        }}
        {...MOTION.slideInFromTop}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <motion.h1
              style={{
                fontSize: THEME.typography['2xl'],
                fontFamily: THEME.typography.mono,
                fontWeight: 700,
                margin: 0,
                marginBottom: THEME.spacing.sm,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              ◆ GHOST AGENT
            </motion.h1>
            <motion.p
              style={{
                fontSize: THEME.typography.sm,
                fontFamily: THEME.typography.sans,
                color: THEME.colors.inactive,
                margin: 0,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              Agentic Intermediary for Social Messaging
            </motion.p>
          </div>

          {/* Control Panel */}
          <motion.div
            style={{
              display: 'flex',
              gap: THEME.spacing.lg,
              alignItems: 'center',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatusIndicator
              status={isConnected ? 'connected' : 'disconnected'}
              animated={isConnected}
              size="md"
            />

            <button
              onClick={toggleConnection}
              style={{
                padding: `${THEME.spacing.md} ${THEME.spacing.lg}`,
                backgroundColor: isConnected ? THEME.colors.background : THEME.colors.white,
                border: THEME.borders.thin,
                color: isConnected ? THEME.colors.white : THEME.colors.black,
                fontFamily: THEME.typography.mono,
                fontSize: THEME.typography.sm,
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: THEME.borderRadius.small,
                transition: THEME.transitions.fast,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => {
                if (!isConnected) {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                } else {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    THEME.colors.white;
                  (e.currentTarget as HTMLButtonElement).style.color =
                    THEME.colors.black;
                }
              }}
              onMouseLeave={(e) => {
                if (!isConnected) {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                } else {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    THEME.colors.background;
                  (e.currentTarget as HTMLButtonElement).style.color =
                    THEME.colors.white;
                }
              }}
            >
              {isConnected ? 'DISCONNECT' : 'CONNECT'}
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        style={{
          flex: 1,
          display: 'flex',
          gap: THEME.spacing.md,
          padding: THEME.spacing.lg,
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Left Column - Chat Interface */}
        <motion.div
          style={{
            flex: 1,
            display: 'flex',
            minWidth: 0,
          }}
          {...MOTION.slideInFromLeft}
        >
          <ChatInterface isConnected={isConnected} />
        </motion.div>

        {/* Right Column - Activity Monitor */}
        <motion.div
          style={{
            flex: 1,
            display: 'flex',
            minWidth: 0,
          }}
          {...MOTION.slideInFromRight}
        >
          <ActivityMonitor isConnected={isConnected} />
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        style={{
          padding: `${THEME.spacing.md} ${THEME.spacing.xl}`,
          borderTop: THEME.borders.thin,
          position: 'relative',
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: THEME.typography.xs,
            fontFamily: THEME.typography.mono,
            color: THEME.colors.inactive,
          }}
        >
          <span>
            v1.0.0 | Ghost Agent UI — Agentic Intermediary
          </span>
          <span>
            {mounted ? currentTime : ''}
          </span>
        </div>
      </motion.footer>

      {/* Secure Bridge Modal */}
      <SecureBridge
        isOpen={showSecureBridge}
        onClose={() => setShowSecureBridge(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};
