"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { abandonAndDeleteRegistration } from './actions1'; // We will create this action

export function useAbandonment(isRegistrationComplete: boolean) {
  const router = useRouter();

  // The core deletion logic, wrapped in useCallback for stability
  const handleDelete = useCallback(async () => {
    console.log("Abandonment detected. Deleting registration data...");
    await abandonAndDeleteRegistration();
  }, []);

  useEffect(() => {
    // This function will be called when the user tries to refresh or close the tab
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // If registration is complete, do nothing. Let them leave freely.
      if (isRegistrationComplete) return;

      // For modern browsers, this is all we can do.
      // We can't guarantee our async cleanup runs, but we can warn the user.
      event.preventDefault();
      event.returnValue = ''; // This triggers the browser's native "Are you sure you want to leave?" dialog.
      
      // We use a beacon to *try* and send a signal to the server to delete the user.
      // This is a "fire-and-forget" method that has a better chance of succeeding on page unload.
      navigator.sendBeacon('/api/abandon-registration');
    };

    // This handles the browser's back/forward buttons
    const handlePopState = () => {
        if (isRegistrationComplete) return;
        // When the user navigates back, delete their data.
        handleDelete();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Cleanup function: remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isRegistrationComplete, handleDelete]); // Rerun if completion status changes
}