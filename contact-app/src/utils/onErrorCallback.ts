export const onErrorCallback = (error: Error, info: { componentStack: string }) => {
    console.log(error,'dd');

    const timestamp = Date.now() * 1e6; 
    // Send error info to a logging service like Loki
    fetch('http://localhost:3101/loki/api/v1/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            streams: [
                {
                    stream: { level: 'error', error: error.toString() },
                    values: [
                        [String(timestamp), JSON.stringify({ error: error.toString(), info })],
                    ],
                },
            ],
        }),
    });
};
  