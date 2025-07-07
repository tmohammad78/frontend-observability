// src/utils/globalErrorHandler.ts
import { logToLoki } from './logger';

export const initGlobalErrorHandling = () => {
    window.onerror = (message, source, lineno, colno, error) => {
        logToLoki('error', `RuntimeError: ${message}`, {
            type: 'runtime',
            source,
            lineno,
            colno,
        });
    };

    window.onunhandledrejection = (event) => {
        logToLoki('error', `UnhandledPromise: ${event.reason}`, {
            type: 'runtime',
        });
    };
};
