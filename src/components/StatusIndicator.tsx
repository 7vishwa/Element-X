'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/constants/theme';

export type StatusType = 'agent_active' | 'user_offline' | 'encrypted_bridge' | 'processing' | 'connected' | 'disconnected';

interface StatusIndicatorProps {
  status: StatusType;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<StatusType, { label: string; color: string; bgColor: string }> = {
  agent_active: {
    label: 'AGENT_ACTIVE',
    color: THEME.colors.active,
    bgColor: 'rgba(0, 255, 0, 0.1)',
  },
  user_offline: {
    label: 'USER_OFFLINE',
    color: THEME.colors.inactive,
    bgColor: 'rgba(102, 102, 102, 0.1)',
  },
  encrypted_bridge: {
    label: 'ENCRYPTED_BRIDGE',
    color: THEME.colors.encrypted,
    bgColor: 'rgba(0, 255, 255, 0.1)',
  },
  processing: {
    label: 'PROCESSING',
    color: THEME.colors.processing,
    bgColor: 'rgba(255, 255, 0, 0.1)',
  },
  connected: {
    label: 'CONNECTED',
    color: THEME.colors.active,
    bgColor: 'rgba(0, 255, 0, 0.1)',
  },
  disconnected: {
    label: 'DISCONNECTED',
    color: THEME.colors.inactive,
    bgColor: 'rgba(102, 102, 102, 0.1)',
  },
};

const sizeConfig = {
  sm: {
    padding: `${THEME.spacing.xs} ${THEME.spacing.sm}`,
    fontSize: '10px',
    letterSpacing: '0.5px',
  },
  md: {
    padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
    fontSize: THEME.typography.xs,
    letterSpacing: '1px',
  },
  lg: {
    padding: `${THEME.spacing.sm} ${THEME.spacing.lg}`,
    fontSize: THEME.typography.sm,
    letterSpacing: '1px',
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  animated = false,
  size = 'md',
}) => {
  const config = statusConfig[status];
  const sizeStyle = sizeConfig[size];

  return (
    <motion.div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: THEME.spacing.xs,
        padding: sizeStyle.padding,
        backgroundColor: config.bgColor,
        border: `1px solid ${config.color}`,
        borderRadius: THEME.borderRadius.minimal,
      }}
      animate={animated ? { opacity: [1, 0.6, 1] } : {}}
      transition={
        animated
          ? {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
    >
      <motion.span
        style={{
          display: 'inline-block',
          width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
          height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
          borderRadius: '50%',
          backgroundColor: config.color,
        }}
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={
          animated
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
      />
      <span
        style={{
          fontFamily: THEME.typography.mono,
          fontSize: sizeStyle.fontSize,
          fontWeight: 600,
          color: config.color,
          textTransform: 'uppercase',
          letterSpacing: sizeStyle.letterSpacing,
          whiteSpace: 'nowrap',
        }}
      >
        {config.label}
      </span>
    </motion.div>
  );
};
