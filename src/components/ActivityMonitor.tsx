'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, MOTION } from '@/constants/theme';

interface MessageInteraction {
  id: string;
  from: string;
  platform: 'whatsapp' | 'facebook';
  message: string;
  timestamp: Date;
  status: 'processing' | 'drafted' | 'sent' | 'delivered';
  draftReply?: string;
}

interface ActivityMonitorProps {
  isConnected: boolean;
}

export const ActivityMonitor: React.FC<ActivityMonitorProps> = ({
  isConnected,
}) => {
  const [interactions, setInteractions] = useState<MessageInteraction[]>([]);

  // Simulate incoming messages
  useEffect(() => {
    if (!isConnected) return;

    const addDemoInteraction = () => {
      const platforms = ['whatsapp', 'facebook'] as const;
      const users = ['Sarah Chen', 'Alex Rodriguez', 'Jordan Smith', 'Casey Moore'];
      const messages = [
        'Hey, when are you free for coffee?',
        'Did you see the project update?',
        'Thanks for the earlier message!',
        'Can we schedule a call?',
        'Just checking in! How are you?',
      ];

      const newInteraction: MessageInteraction = {
        id: Math.random().toString(36).substring(7),
        from: users[Math.floor(Math.random() * users.length)],
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        status: 'processing',
        draftReply: 'Currently in a meeting. Will get back to you soon.',
      };

      setInteractions((prev) => [newInteraction, ...prev].slice(0, 10));

      // Simulate status change
      setTimeout(() => {
        setInteractions((prev) =>
          prev.map((interaction) =>
            interaction.id === newInteraction.id
              ? { ...interaction, status: 'drafted' }
              : interaction
          )
        );
      }, 2000);
    };

    const interval = setInterval(addDemoInteraction, 8000);
    const initialTimeout = setTimeout(addDemoInteraction, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [isConnected]);

  const getPlatformBadge = (platform: string) => {
    const baseStyle = {
      display: 'inline-block',
      padding: `${THEME.spacing.xs} ${THEME.spacing.sm}`,
      fontSize: THEME.typography.xs,
      fontFamily: THEME.typography.mono,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderRadius: THEME.borderRadius.minimal,
      border: `1px solid ${THEME.colors.white}`,
    };

    const color =
      platform === 'whatsapp'
        ? { backgroundColor: 'rgba(0, 200, 100, 0.2)', color: '#00FF00' }
        : { backgroundColor: 'rgba(0, 100, 200, 0.2)', color: '#00FFFF' };

    return { ...baseStyle, ...color };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return THEME.colors.processing;
      case 'drafted':
        return THEME.colors.active;
      case 'sent':
      case 'delivered':
        return THEME.colors.inactive;
      default:
        return THEME.colors.white;
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: THEME.spacing.lg,
      }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: THEME.spacing.md,
          }}
        >
          <h3
            style={{
              fontSize: THEME.typography.xl,
              fontFamily: THEME.typography.mono,
              fontWeight: 700,
              color: THEME.colors.white,
              marginRight: THEME.spacing.md,
            }}
          >
            ACTIVITY MONITOR
          </h3>
          <motion.div
            animate={{ opacity: isConnected ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isConnected ? THEME.colors.active : THEME.colors.inactive,
                marginRight: THEME.spacing.sm,
              }}
            />
            <span
              style={{
                fontSize: THEME.typography.xs,
                fontFamily: THEME.typography.mono,
                color: isConnected ? THEME.colors.active : THEME.colors.inactive,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {isConnected ? 'LISTENING' : 'DISCONNECTED'}
            </span>
          </motion.div>
        </div>
        <p
          style={{
            fontSize: THEME.typography.sm,
            fontFamily: THEME.typography.sans,
            color: THEME.colors.inactive,
          }}
        >
          Real-time message stream with AI-drafted responses
        </p>
      </motion.div>

      {/* Interactions Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: THEME.spacing.sm,
        }}
      >
        <AnimatePresence mode="popLayout">
          {interactions.length === 0 ? (
            <motion.div
              key="empty"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p
                style={{
                  fontSize: THEME.typography.sm,
                  fontFamily: THEME.typography.mono,
                  color: THEME.colors.inactive,
                  textAlign: 'center',
                }}
              >
                {isConnected
                  ? 'AWAITING MESSAGES...'
                  : 'CONNECT TO RECEIVE MESSAGES'}
              </p>
            </motion.div>
          ) : (
            interactions.map((interaction, index) => (
              <motion.div
                key={interaction.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  ...THEME.springPhysics.light,
                  delay: index * 0.05,
                }}
                className="mb-4"
              >
                <div
                  style={{
                    padding: THEME.spacing.md,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: THEME.borders.thin,
                    borderRadius: THEME.borderRadius.small,
                    transition: THEME.transitions.fast,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  {/* Message Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: THEME.spacing.sm,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: THEME.typography.sm,
                          fontFamily: THEME.typography.mono,
                          color: THEME.colors.white,
                          fontWeight: 600,
                          marginBottom: THEME.spacing.xs,
                        }}
                      >
                        {interaction.from}
                      </div>
                      <div
                        style={{
                          display: 'span',
                        }}
                      >
                        <span style={getPlatformBadge(interaction.platform) as React.CSSProperties}>
                          {interaction.platform}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: THEME.typography.xs,
                          fontFamily: THEME.typography.mono,
                          color: THEME.colors.inactive,
                          marginBottom: THEME.spacing.xs,
                        }}
                      >
                        {interaction.timestamp.toLocaleTimeString()}
                      </div>
                      <motion.div
                        animate={{
                          opacity:
                            interaction.status === 'processing' ? [1, 0.5] : 1,
                        }}
                        transition={{
                          duration: 1,
                          repeat:
                            interaction.status === 'processing'
                              ? Infinity
                              : 0,
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: THEME.typography.xs,
                            fontFamily: THEME.typography.mono,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: getStatusColor(interaction.status),
                          }}
                        >
                          {interaction.status === 'processing'
                            ? '◆ PROCESSING'
                            : interaction.status === 'drafted'
                              ? '◆ DRAFTED'
                              : '◆ SENT'}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Incoming Message */}
                  <div
                    style={{
                      marginBottom: THEME.spacing.md,
                      paddingBottom: THEME.spacing.md,
                      borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: THEME.typography.sm,
                        fontFamily: THEME.typography.sans,
                        color: THEME.colors.white,
                        lineHeight: 1.6,
                      }}
                    >
                      {interaction.message}
                    </p>
                  </div>

                  {/* AI Draft */}
                  {interaction.draftReply && (
                    <div
                      style={{
                        padding: THEME.spacing.sm,
                        backgroundColor: 'rgba(0, 255, 0, 0.05)',
                        border: `1px solid rgba(0, 255, 0, 0.3)`,
                        borderRadius: THEME.borderRadius.small,
                      }}
                    >
                      <div
                        style={{
                          fontSize: THEME.typography.xs,
                          fontFamily: THEME.typography.mono,
                          color: THEME.colors.active,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          marginBottom: THEME.spacing.xs,
                        }}
                      >
                        AI DRAFT
                      </div>
                      <p
                        style={{
                          fontSize: THEME.typography.sm,
                          fontFamily: THEME.typography.sans,
                          color: THEME.colors.active,
                          lineHeight: 1.6,
                        }}
                      >
                        {interaction.draftReply}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      gap: THEME.spacing.sm,
                      marginTop: THEME.spacing.md,
                    }}
                  >
                    <button
                      style={{
                        flex: 1,
                        padding: `${THEME.spacing.xs} ${THEME.spacing.sm}`,
                        backgroundColor: THEME.colors.background,
                        border: THEME.borders.thin,
                        color: THEME.colors.white,
                        fontFamily: THEME.typography.mono,
                        fontSize: THEME.typography.xs,
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: THEME.borderRadius.small,
                        transition: THEME.transitions.fast,
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          THEME.colors.white;
                        (e.currentTarget as HTMLButtonElement).style.color =
                          THEME.colors.black;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          THEME.colors.background;
                        (e.currentTarget as HTMLButtonElement).style.color =
                          THEME.colors.white;
                      }}
                    >
                      TAKE CONTROL
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: `${THEME.spacing.xs} ${THEME.spacing.sm}`,
                        backgroundColor: THEME.colors.background,
                        border: THEME.borders.thin,
                        color: THEME.colors.active,
                        fontFamily: THEME.typography.mono,
                        fontSize: THEME.typography.xs,
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: THEME.borderRadius.small,
                        transition: THEME.transitions.fast,
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          THEME.colors.active;
                        (e.currentTarget as HTMLButtonElement).style.color =
                          THEME.colors.black;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          THEME.colors.background;
                        (e.currentTarget as HTMLButtonElement).style.color =
                          THEME.colors.active;
                      }}
                    >
                      SEND DRAFT
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
