import {
    initializeFaro,
    getWebInstrumentations,
    WebVitalsInstrumentation,
    ErrorsInstrumentation,
    ConsoleInstrumentation,
    LogLevel,
    ReactIntegration,
    createReactRouterV6Options,
} from '@grafana/faro-react';
import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

const initFaro = () => {
    initializeFaro({
        url: import.meta.env.VITE_FARO, /// Your Grafana cloud
        app: {
            name: 'frontend-app',
            version: '1.0.0',
            environment: 'development',
        },
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: true,
            }),
            new ReactIntegration({
                router: createReactRouterV6Options({
                    createRoutesFromChildren,
                    matchRoutes,
                    Routes,
                    useLocation,
                    useNavigationType,
                }),
            }),
            new TracingInstrumentation(),
            new ConsoleInstrumentation({
                disabledLevels: [LogLevel.WARN, LogLevel.LOG, LogLevel.DEBUG, LogLevel.INFO]
            }),
            new ErrorsInstrumentation(),
            new WebVitalsInstrumentation(),
        ],
    });     
}
export default initFaro;