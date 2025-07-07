// src/utils/logger.ts
export const logToLoki = (level: 'info' | 'warn' | 'error', message: string, labels = {}) => {
    const payload = {
        streams: [
            {
                stream: {
                    level,
                    app: 'my-frontend',
                    ...labels,
                },
                values: [
                    [String(Date.now() * 1e6), message],
                ],
            },
        ],
    };

    fetch('http://localhost:3101/observing/loki/api/v1/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(console.error);
};
  