import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

// Global runtime error handlers to prevent a silent blank page.
function showFatalError(message: string) {
	const root = document.getElementById('root')
	if (root) {
		root.innerHTML = `\n+      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:#fff6f6;">
				<div style="max-width:900px;border:1px solid #f5c2c7;background:#fff;padding:20px;border-radius:8px;">
					<h2 style="color:#b91c1c;margin:0 0 8px 0;font-size:18px;">A runtime error occurred</h2>
					<pre style="white-space:pre-wrap;color:#111;">${escapeHtml(message)}</pre>
					<p style="color:#333;margin-top:8px">See the browser console for full details.</p>
				</div>
			</div>`
	}
}

function escapeHtml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

window.addEventListener('error', (ev) => {
	try {
		const msg = ev?.error?.stack || ev?.message || String(ev);
		console.error('Global error caught:', ev.error || ev.message || ev);
		showFatalError(String(msg));
	} catch (e) {
		// ignore
	}
});

window.addEventListener('unhandledrejection', (ev) => {
	try {
		const reason = (ev.reason && (ev.reason.stack || ev.reason.message)) || String(ev.reason);
		console.error('Unhandled rejection:', ev.reason);
		showFatalError(`Unhandled promise rejection: ${reason}`);
	} catch (e) {
		// ignore
	}
});

createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>
);
