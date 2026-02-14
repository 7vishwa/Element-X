# Ghost Agent UI - Build Instructions

## Project Overview
Ghost Agent UI is an agentic intermediary for social messaging that bridges offline status with active social threads (WhatsApp & Facebook). It acts as a "digital twin" for real-time message monitoring and handoff control.

## Completed Steps

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Next.js-based agentic intermediary dashboard
- [x] Scaffold the Project - Next.js 16 with TypeScript, Tailwind CSS, ESLint, App Router
- [x] Installed Dependencies - framer-motion, lucide-react, qrcode.react, axios

## Remaining Steps

- [ ] Customize the Project
  - [ ] Create design system and theme configuration
  - [ ] Build SecureBridge.tsx (QR code authentication modal)
  - [ ] Build ActivityMonitor.tsx (Live feed dashboard)
  - [ ] Build chat interface components
  - [ ] Create status indicator components
  - [ ] Set up layout and routing

- [ ] Install Required Extensions
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

- [ ] Compile the Project
  - Run `npm run build` to check for TypeScript errors
  - Verify all components compile

- [ ] Create and Run Task
  - Set up development server task in tasks.json

- [ ] Launch the Project
  - Start dev server with `npm run dev`

- [ ] Ensure Documentation is Complete
  - Update README.md with project details
  - Clean up copilot-instructions.md

## Key Components to Build

1. **SecureBridge.tsx** - Frosted-glass modal with QR code for WhatsApp/FB linking
2. **ActivityMonitor.tsx** - Live feed showing incoming messages and AI processing
3. **ChatInterface.tsx** - Typography-first, brutalist design with "TRANSMIT" button
4. **StatusIndicators.tsx** - Sharp-edged tags for connection status
5. **DarkTheme.css** - Black backgrounds, razor-thin white borders, sharp edges

## Design System Rules

- No rounding (max 4px)
- Black (#000) backgrounds with white borders
- Typography over icons
- Framer Motion spring physics
- Parallax depth effects
- Sharp, professional brutalist aesthetic
