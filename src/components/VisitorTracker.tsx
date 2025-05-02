'use client';

// No need to import useEffect as it's used internally by the hook
import { useVisitorLogger } from '@/lib/visitorLogger';

/**
 * Component that silently tracks visitor information
 * Add this component to your layout to track all page visits
 */
export default function VisitorTracker() {
  // Initialize the visitor logger with default options
  useVisitorLogger({
    logToConsole: false, // Set to true for debugging
    logToServer: true,
    excludePaths: ['/api/', '/_next/', '/favicon.ico', '/admin/']
  });

  return null; // This component doesn't render anything
}
