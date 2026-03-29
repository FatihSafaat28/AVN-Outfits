'use client';

import { useEffect } from 'react';

const SessionChecker = () => {
  useEffect(() => {
    // Check for session cookie
    const hasSession = document.cookie
      .split('; ')
      .find((row) => row.startsWith('avn_demo_session='));

    if (!hasSession) {
      // New browser session detected (cookie was deleted on browser close)
      console.log('New session detected. Clearing demo data...');
      
      // Clear the specific store key from localStorage
      localStorage.removeItem('avn-demo-storage');
      
      // Set session cookie (no expires = expires on browser close)
      document.cookie = "avn_demo_session=active; path=/; SameSite=Strict";
      
      // Optional: Force a reload to ensure store re-initializes with defaults
      // But usually Zustand persist will pick up the empty localStorage on next render
      // Let's force a reload just to be 100% sure the UI resets immediately
      window.location.reload();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default SessionChecker;
