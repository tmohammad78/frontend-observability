export function sendLogToLoki(level: string, message: string) {
    const payload = {
        streams: [
            {
                stream: {
                    level,
                    app: 'your-app-name',
                },
                values: [[`${Date.now()}000000`, JSON.stringify({ message })]],
            },
        ],
    };

    fetch('http://localhost:3101/loki/api/v1/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(console.error);
}

// Override console methods
['log', 'info', 'warn', 'error'].forEach(level => {
    const original = console[level as keyof Console];
    console[level as keyof Console] = function (...args: any[]) {
        original.apply(console, args);
        sendLogToLoki(level, args.map(String).join(' '));
    };
});

// Catch uncaught exceptions
window.onerror = function (message, source, lineno, colno, error) {
    sendLogToLoki('error', `Uncaught: ${message} at ${source}:${lineno}:${colno}`);
};
