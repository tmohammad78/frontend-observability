import { onLCP, onINP, onFCP, onCLS, onTTFB } from 'web-vitals/attribution';
import { sendLogToLoki } from './monitor';

function reportWebVital(metric) {
    sendLogToLoki('web-vital', JSON.stringify(metric));
}

onCLS(reportWebVital,{ reportAllChanges: true });
onINP(reportWebVital,{ reportAllChanges: true });
onLCP(reportWebVital,{ reportAllChanges: true });
onFCP(reportWebVital,{ reportAllChanges: true });
onTTFB(reportWebVital,{ reportAllChanges: true });
