import express from "express";
import "dotenv/config";
import { envs } from "./config/env.plugin";
import { MongoDatabase } from "./infraestructure/database/init";
import { AppRoutes } from "./infraestructure/routes/app.routes";
import { emailJob } from "./domain/jobs/email.job";

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: "MonkeypoxAPI"
    });
})();

app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
    emailJob();
});