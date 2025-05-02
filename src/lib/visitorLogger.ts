'use client';

import { useEffect } from 'react';

interface VisitorInfo {
	ip?: string;
	country?: string;
	region?: string;
	city?: string;
	timezone?: string;
	userAgent: string;
	referrer: string;
	timestamp: string;
	path: string;
}

interface LoggingOptions {
	endpoint?: string;
	logToConsole?: boolean;
	logToFile?: boolean;
	logToServer?: boolean;
	excludePaths?: string[];
}

/**
 * Utility for logging visitor information without requiring user permission
 * Can be reused across different projects
 */
export class VisitorLogger {
	private static instance: VisitorLogger;
	private options: LoggingOptions;
	private visitorInfo: VisitorInfo | null = null;
	private isInitialized = false;

	private constructor(options: LoggingOptions = {}) {
		this.options = {
			endpoint: '/api/log-visitor',
			logToConsole: false,
			logToServer: true,
			logToFile: false,
			excludePaths: ['/api/', '/_next/', '/favicon.ico'],
			...options,
		};
	}

	/**
	 * Get singleton instance of VisitorLogger
	 */
	public static getInstance(options?: LoggingOptions): VisitorLogger {
		if (!VisitorLogger.instance) {
			VisitorLogger.instance = new VisitorLogger(options);
		}
		return VisitorLogger.instance;
	}

	/**
	 * Initialize the visitor logger
	 * Collects visitor information and logs it according to options
	 */
	public async init(): Promise<void> {
		// Only run on client side
		if (typeof window === 'undefined' || this.isInitialized) return;

		this.isInitialized = true;

		try {
			// Collect basic information available without permission
			const basicInfo: VisitorInfo = {
				userAgent: navigator.userAgent,
				referrer: document.referrer || 'direct',
				timestamp: new Date().toISOString(),
				path: window.location.pathname,
			};

			// Check if current path should be excluded
			if (this.shouldExcludePath(basicInfo.path)) {
				return;
			}

			// Get IP and location data from external service
			const geoInfo = await this.fetchIpInfo();

			this.visitorInfo = {
				...basicInfo,
				...geoInfo,
			};

			// Log the information according to options
			this.logVisitorInfo();
		} catch (error) {
			console.error('Error initializing visitor logger:', error);
		}
	}

	/**
	 * Check if the current path should be excluded from logging
	 */
	private shouldExcludePath(path: string): boolean {
		return (
			this.options.excludePaths?.some(excludePath => path.startsWith(excludePath)) || false
		);
	}

	/**
	 * Fetch IP and location information from external service
	 * Uses a free IP geolocation API that doesn't require API keys
	 */
	private async fetchIpInfo(): Promise<Partial<VisitorInfo>> {
		try {
			const response = await fetch('https://ipapi.co/json/');
			if (!response.ok) {
				throw new Error(`Failed to fetch IP info: ${response.status}`);
			}

			const data = await response.json();

			return {
				ip: data.ip,
				country: data.country_name,
				region: data.region,
				city: data.city,
				timezone: data.timezone,
			};
		} catch (error) {
			console.error('Error fetching IP info:', error);
			return {};
		}
	}

	/**
	 * Log visitor information according to configured options
	 */
	private logVisitorInfo(): void {
		if (!this.visitorInfo) return;

		// Log to console if enabled
		if (this.options.logToConsole) {
			console.log('[VisitorLogger] Visitor information:', this.visitorInfo);
		}

		// Log to server if enabled
		if (this.options.logToServer) {
			this.sendToServer();
		}

		// Log to file is handled on the server side
	}

	/**
	 * Send visitor information to server endpoint
	 */
	private async sendToServer(): Promise<void> {
		if (!this.visitorInfo || !this.options.endpoint) return;

		try {
			const response = await fetch(this.options.endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(this.visitorInfo),
				// Don't send cookies or credentials
				credentials: 'omit',
			});

			if (!response.ok) {
				throw new Error(`Failed to log visitor: ${response.status}`);
			}
		} catch (error) {
			// Silently fail to avoid affecting user experience
			console.error('Error logging visitor to server:', error);
		}
	}

	/**
	 * Get the current visitor information
	 */
	public getVisitorInfo(): VisitorInfo | null {
		return this.visitorInfo;
	}
}

/**
 * Hook to use visitor logger in React components
 */
export function useVisitorLogger(options?: LoggingOptions): void {
	// Only run the effect on the client side
	useEffect(() => {
		// Skip execution on server
		if (typeof window === 'undefined') return;

		const logger = VisitorLogger.getInstance(options);
		logger.init();
	}, [options]);
}
