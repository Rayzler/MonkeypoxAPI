import { Router } from "express";
import { CaseRoutes } from "./cases.routes";

export class AppRoutes {
    static get routes() {
        const router = Router();
        router.use("/api/cases", CaseRoutes.routes);
        return router;
    }
}