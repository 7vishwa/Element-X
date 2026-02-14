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
  const [activeNav, setActiveNav] = useState<'chat' | 'monitor'>('chat');

  useEffect(() => {
    setMounted(true);
    const hasConnected = localStorage.getItem('ghostAgentConnected');
    if (!hasConnected) {
      setShowSecureBridge(true);
    } else {
      setIsConnected(true);
    }

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

  const navItems = [
    { id: 'chat' as const, label: 'CHAT', icon: '◇' },
    { id: 'monitor' as const, label: 'MONITOR', icon: '◈' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: THEME.colors.background,
        color: THEME.colors.white,
        display: 'flex',
        flexDirection: 'row',
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

      {/* Left Sidebar Navigation */}
      <motion.aside
        style={{
          width: '64px',
          minWidth: '64px',
          borderRight: THEME.borders.thin,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          paddingTop: THEME.spacing.lg,
          paddingBottom: THEME.spacing.lg,
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
      >
        {/* Logo / Brand Mark */}
        <motion.div
          style={{
            width: '36px',
            height: '36px',
            border: THEME.borders.medium,
            borderRadius: THEME.borderRadius.small,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontFamily: THEME.typography.mono,
            fontWeight: 700,
            marginBottom: THEME.spacing.xl,
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.1, borderColor: THEME.colors.active }}
          whileTap={{ scale: 0.95 }}
        >
          ◆
        </motion.div>

        {/* Nav Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: THEME.spacing.sm,
            flex: 1,
          }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '44px',
                height: '44px',
                border: activeNav === item.id ? THEME.borders.thin : '1px solid transparent',
                borderRadius: THEME.borderRadius.small,
                backgroundColor: activeNav === item.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                color: activeNav === item.id ? THEME.colors.white : THEME.colors.inactive,
                fontFamily: THEME.typography.mono,
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: THEME.transitions.fast,
              }}
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: THEME.colors.white,
              }}
              title={item.label}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>

        {/* Connection indicator at bottom of sidebar */}
        <motion.div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isConnected ? THEME.colors.active : THEME.colors.inactive,
            boxShadow: isConnected ? `0 0 8px ${THEME.colors.active}` : 'none',
          }}
          animate={isConnected ? { opacity: [1, 0.5, 1] } : {}}
          transition={isConnected ? { duration: 2, repeat: Infinity } : {}}
        />
      </motion.aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          minWidth: 0,
        }}
      >
        {/* Top Toolbar */}
        <motion.header
          style={{
            padding: `${THEME.spacing.md} ${THEME.spacing.xl}`,
            borderBottom: THEME.borders.thin,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          {...MOTION.slideInFromTop}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: THEME.spacing.lg }}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1
                style={{
                  fontSize: THEME.typography.xl,
                  fontFamily: THEME.typography.mono,
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: '-0.5px',
                }}
              >
                GHOST AGENT
              </h1>
            </motion.div>

            <motion.span
              style={{
                fontSize: THEME.typography.xs,
                fontFamily: THEME.typography.mono,
                color: THEME.colors.inactive,
                borderLeft: '1px solid rgba(255,255,255,0.2)',
                paddingLeft: THEME.spacing.lg,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {mounted ? currentTime : ''}
            </motion.span>
          </div>

          <motion.div
            style={{
              display: 'flex',
              gap: THEME.spacing.md,
              alignItems: 'center',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatusIndicator
              status={isConnected ? 'connected' : 'disconnected'}
              animated={isConnected}
              size="sm"
            />

            <button
              onClick={toggleConnection}
              style={{
                padding: `${THEME.spacing.xs} ${THEME.spacing.lg}`,
                backgroundColor: isConnected ? THEME.colors.background : THEME.colors.white,
                border: THEME.borders.thin,
                color: isConnected ? THEME.colors.white : THEME.colors.black,
                fontFamily: THEME.typography.mono,
                fontSize: THEME.typography.xs,
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
        </motion.header>

        {/* Main Split View */}
        <motion.main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            minHeight: 0,
            position: 'relative',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Chat Interface - takes more space */}
          <motion.div
            style={{
              flex: 3,
              display: 'flex',
              minWidth: 0,
              borderRight: THEME.borders.thin,
            }}
            {...MOTION.slideInFromLeft}
          >
            <ChatInterface isConnected={isConnected} />
          </motion.div>

          {/* Activity Monitor - narrower right panel */}
          <motion.div
            style={{
              flex: 2,
              display: 'flex',
              minWidth: 0,
            }}
            {...MOTION.slideInFromRight}
          >
            <ActivityMonitor isConnected={isConnected} />
          </motion.div>
        </motion.main>

        {/* Bottom Status Bar */}
        <motion.footer
          style={{
            padding: `${THEME.spacing.xs} ${THEME.spacing.xl}`,
            borderTop: THEME.borders.thin,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: THEME.typography.xs,
            fontFamily: THEME.typography.mono,
            color: THEME.colors.inactive,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>v1.0.0 — Ghost Agent UI</span>
          <div style={{ display: 'flex', gap: THEME.spacing.lg, alignItems: 'center' }}>
            <span style={{ color: isConnected ? THEME.colors.active : THEME.colors.inactive }}>
              {isConnected ? '● BRIDGE ACTIVE' : '○ BRIDGE INACTIVE'}
            </span>
            <span>Agentic Intermediary</span>
          </div>
        </motion.footer>
      </div>

      {/* Secure Bridge Modal */}
      <SecureBridge
        isOpen={showSecureBridge}
        onClose={() => setShowSecureBridge(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};
