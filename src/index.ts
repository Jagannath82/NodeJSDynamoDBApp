import express from 'express'
import { registerUserRoute } from './controller';
import bodyParser from "body-parser";
import { WinstonInstrumentation }  from '@opentelemetry/instrumentation-winston';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

export const app = express();
app.use(bodyParser.json());

registerInstrumentations({
    instrumentations: [
        new WinstonInstrumentation({
            // Optional hook to insert additional context to log metadata.
            logHook: (span, record) => {
              record['resource.service.name'] = "MyService";
            },
          }),
    ],
    });

registerUserRoute(app);

app.listen(8081, () => {
    console.log("Express listening to 8080")
})