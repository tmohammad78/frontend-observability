// src/utils/vitals.ts
import { onLCP, onINP, onFCP, onCLS, onTTFB } from 'web-vitals/attribution';
import { logToLoki } from './logger';

const reportVital = (metric: any) => {
    logToLoki('info', `WebVital:${metric.name}:${metric.value}`, {
        type: 'webvitals',
        name: metric.name,
    });
};

export const initWebVitals = () => {
onCLS(reportVital,{ reportAllChanges: true });
onINP(reportVital,{ reportAllChanges: true });
onLCP(reportVital,{ reportAllChanges: true });
onFCP(reportVital,{ reportAllChanges: true });
onTTFB(reportVital,{ reportAllChanges: true });
};
