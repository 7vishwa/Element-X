'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, MOTION } from '@/constants/theme';

interface SecureBridgeProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const SecureBridge: React.FC<SecureBridgeProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const [qrValue, setQrValue] = useState('');
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate a unique QR code value for authentication
      const timestamp = Date.now();
      const sessionId = Math.random().toString(36).substring(7);
      setQrValue(`ghost-agent://auth/${timestamp}/${sessionId}`);
      setScanned(false);
    }
  }, [isOpen]);

  const handleSimulateScan = () => {
    setScanned(true);
    setTimeout(() => {
      onAuthenticated();
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md mx-4 p-8"
            style={{
              backgroundColor: THEME.colors.background,
              border: THEME.borders.thin,
              borderRadius: THEME.borderRadius.small,
            }}
            {...MOTION.scaleIn}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h2
                style={{
                  fontSize: THEME.typography['2xl'],
                  fontFamily: THEME.typography.mono,
                  fontWeight: 700,
                  color: THEME.colors.white,
                  marginBottom: THEME.spacing.sm,
                }}
              >
                SECURE BRIDGE
              </h2>
              <p
                style={{
                  fontSize: THEME.typography.sm,
                  fontFamily: THEME.typography.sans,
                  color: THEME.colors.inactive,
                  marginBottom: THEME.spacing.md,
                }}
              >
                Link your WhatsApp or Facebook account via secure QR code
              </p>
            </motion.div>

            {/* QR Code Container */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div
                style={{
                  padding: THEME.spacing.md,
                  backgroundColor: THEME.colors.white,
                  border: THEME.borders.medium,
                  borderRadius: THEME.borderRadius.minimal,
                }}
              >
                {!scanned ? (
                  <QRCodeCanvas
                    value={qrValue}
                    size={256}
                    level="H"
                    includeMargin={false}
                  />
                ) : (
                  <div
                    style={{
                      width: 256,
                      height: 256,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: THEME.typography.xl,
                      fontFamily: THEME.typography.mono,
                      color: THEME.colors.active,
                      fontWeight: 700,
                    }}
                  >
                    ✓ CONNECTED
                  </div>
                )}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <p
                style={{
                  fontSize: THEME.typography.xs,
                  fontFamily: THEME.typography.mono,
                  color: THEME.colors.inactive,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: THEME.spacing.sm,
                }}
              >
                SCAN WITH YOUR DEVICE
              </p>
              <ul
                style={{
                  fontSize: THEME.typography.sm,
                  fontFamily: THEME.typography.sans,
                  color: THEME.colors.white,
                  lineHeight: 1.8,
                }}
              >
                <li>1. Open WhatsApp Web or Facebook Messenger</li>
                <li>2. Scan this QR code with your phone</li>
                <li>3. Confirm the connection request</li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: `${THEME.spacing.md} ${THEME.spacing.lg}`,
                  backgroundColor: THEME.colors.background,
                  border: THEME.borders.thin,
                  color: THEME.colors.white,
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
                Cancel
              </button>
              <button
                onClick={handleSimulateScan}
                disabled={scanned}
                style={{
                  flex: 1,
                  padding: `${THEME.spacing.md} ${THEME.spacing.lg}`,
                  backgroundColor: scanned
                    ? THEME.colors.active
                    : THEME.colors.white,
                  border: THEME.borders.thin,
                  color: scanned ? THEME.colors.black : THEME.colors.black,
                  fontFamily: THEME.typography.mono,
                  fontSize: THEME.typography.sm,
                  fontWeight: 600,
                  cursor: scanned ? 'not-allowed' : 'pointer',
                  borderRadius: THEME.borderRadius.small,
                  transition: THEME.transitions.fast,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: scanned ? 1 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!scanned) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!scanned) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                  }
                }}
              >
                {scanned ? '✓ SCANNED' : 'SIMULATE SCAN'}
              </button>
            </motion.div>

            {/* Status Message */}
            <AnimatePresence>
              {scanned && (
                <motion.div
                  className="mt-6 p-4"
                  style={{
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    border: `1px solid ${THEME.colors.active}`,
                    borderRadius: THEME.borderRadius.small,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p
                    style={{
                      fontSize: THEME.typography.sm,
                      fontFamily: THEME.typography.mono,
                      color: THEME.colors.active,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    CONNECTION ESTABLISHED - REDIRECTING...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
