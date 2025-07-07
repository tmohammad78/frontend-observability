import {
    initializeFaro,
    getWebInstrumentations,
    WebVitalsInstrumentation,
    ErrorsInstrumentation,
    ConsoleInstrumentation,
    LogLevel,
} from '@grafana/faro-react';

initializeFaro({
    url: 'http://localhost:3101/observing', // Your Alloy receiver
    app: {
        name: 'frontend-app',
        version: '1.0.0',
        environment: 'development',
    },
    instrumentations: [
        ...getWebInstrumentations(),
        new ConsoleInstrumentation({
            disabledLevels: [LogLevel.WARN, LogLevel.LOG, LogLevel.DEBUG, LogLevel.INFO]
        }),
        new ErrorsInstrumentation(),
        new WebVitalsInstrumentation(),
    ],
});
  