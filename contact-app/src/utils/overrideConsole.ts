// src/utils/consoleOverride.ts
import { logToLoki } from './logger';

export const overrideConsole = () => {
    const origError = console.error;
    const origWarn = console.warn;

    console.error = (...args) => {
        logToLoki('error', args.map(String).join(' '), { type: 'console' });
        origError(...args);
    };

    console.warn = (...args) => {
        logToLoki('warn', args.map(String).join(' '), { type: 'console' });
        origWarn(...args);
    };
};
