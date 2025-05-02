import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the log file path
const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'visitors.log');

// Ensure the log directory exists
if (!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR, { recursive: true });
}

export async function POST(request: NextRequest) {
	try {
		// Get visitor data from request
		const visitorData = await request.json();

		// Add server timestamp
		const logEntry = {
			...visitorData,
			serverTimestamp: new Date().toISOString(),
		};

		// Format log entry as JSON string with newline
		const logLine = JSON.stringify(logEntry) + '\n';

		// Append to log file
		fs.appendFileSync(LOG_FILE, logLine);

		// Return success response
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error logging visitor:', error);
		return NextResponse.json({ error: 'Failed to log visitor information' }, { status: 500 });
	}
}

// Optional: Add a GET endpoint to retrieve logs (protected by authentication in production)
export async function GET() {
	// In a real application, you would add authentication here
	// This is just for demonstration purposes

	try {
		if (!fs.existsSync(LOG_FILE)) {
			return NextResponse.json({ logs: [] }, { status: 200 });
		}

		const logContent = fs.readFileSync(LOG_FILE, 'utf-8');
		const logs = logContent
			.split('\n')
			.filter(line => line.trim() !== '')
			.map(line => JSON.parse(line));

		return NextResponse.json({ logs }, { status: 200 });
	} catch (error) {
		console.error('Error retrieving visitor logs:', error);
		return NextResponse.json({ error: 'Failed to retrieve visitor logs' }, { status: 500 });
	}
}
