// src/utils/monitorFetch.ts
import { logToLoki } from './logger';

export const overrideFetch = () => {
    const origFetch = window.fetch;

    window.fetch = async (...args) => {
        const [input, init] = args;
        const start = performance.now();

        try {
            const response = await origFetch(...args);
            const duration = performance.now() - start;

            if (!response.ok || response.status >= 500) {
                logToLoki('warn', `Failed API: ${input} (${response.status})`, {
                    duration: duration.toFixed(2),
                    status: response.status,
                    type: 'fetch',
                });
            }

            return response;
        } catch (error) {
            logToLoki('error', `FetchError: ${input} ${error}`, { type: 'fetch' });
            throw error;
        }
    };
};
