import { Router } from "express";
import { CaseController } from "../controllers/cases.controller";

export class CaseRoutes {
    static get routes() {
        const router = Router();
        const controller = new CaseController();
        router.get("/", controller.getAllCases);
        router.post("/", controller.createCase);
        router.get("/latest", controller.getLatestCases);
        router.get("/:id", controller.getCaseById);
        router.put("/:id", controller.updateCase);
        router.delete("/:id", controller.deleteCase);
        return router;
    }
}