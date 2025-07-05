// import { getLCP, getFID, getCLS, getFCP, getTTFB } from 'web-vitals';
import { onLCP, onINP, onCLS } from 'web-vitals/attribution';

function sendToLoki(metric: any) {
    console.log(metric, 'dd');

    const pageUrl = window.location.href;
    const metricValue = metric?.value;
    const timestamp = Date.now() * 1e6;  // Timestamp in nanoseconds

    const payload = {
        streams: [
            {
                stream: {
                    level: 'info', 
                    metric: metric.name,
                    url: pageUrl,
                    score: metricValue,
                    id: metric.id || ''
                },
                values: [
                    [String(timestamp), JSON.stringify({
                        metric: metric.name,
                        url: pageUrl,
                        score: metricValue,
                        details: metric,
                        timestamp: Date.now(),
                        /// uun
                    })],
                ],
            },
        ],
    };

    console.log('Sending to Loki:', JSON.stringify(payload));

    fetch('http://localhost:3101/loki/api/v1/push', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Loki push response:', data);
        })
        .catch(error => {
            console.error('Error sending to Loki:', error);
        });
}

export function initVitalsMonitoring() {
    onCLS(sendToLoki);
    onINP(sendToLoki);
    onLCP(sendToLoki);
}
