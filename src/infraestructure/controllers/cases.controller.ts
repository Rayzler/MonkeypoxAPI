import { Request, Response } from "express";
import { CaseModel } from "../../domain/entities/case.model";

export class CaseController {
    public getAllCases = async (req: Request, res: Response) => {
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.json({
                message: "Error fetching cases"
            });
        }
    };
    
    public createCase = async (req: Request, res: Response) => {
        try {
            const { lat, lng, genre, age } = req.body;
            const newCase = await CaseModel.create({
                lat,
                lng,
                isSent: false,
                genre,
                age,
                creationDate: new Date()
            });
            res.json(newCase);
        } catch (error) {
            res.status(500).json({
                message: "Error registering case"
            });
        }
    };
    
    public getCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const incident = await CaseModel.findById(id);
            if (!incident) {
                return res.status(404).json({
                    message: "Caso no encontrado"
                });
            }
            return res.json(incident);
        } catch (error) {
            return res.status(500).json({
                message: "Error al obtener el caso"
            });
        }
    };
    
    public getLatestCases = async (req: Request, res: Response) => {
        const days = 7;
        const lastDays = new Date();
        lastDays.setDate(lastDays.getDate() - days);
        try {
            const cases = await CaseModel.find({
                creationDate: {
                    $gte: lastDays
                }
            });
            return res.json(cases);
        } catch (error) {
            return res.status(500).json({
                message: "Error al obtener los casos"
            });
        }
    };
    
    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, genre, age } = req.body;
            await CaseModel.findByIdAndUpdate(id, {
                lat,
                lng,
                genre,
                age
            });
            const updatedCase = await CaseModel.findById(id);
            if (!updatedCase) {
                return res.status(404).json({
                    message: "Caso no encontrado"
                });
            }
            return res.json(updatedCase);
        } catch (error) {
            return res.status(500).json({
                message: "Error al actualizar el caso"
            });
        }
    };
    
    public deleteCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await CaseModel.findByIdAndDelete(id);
            return res.json({
                message: "Caso eliminado"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error al eliminar el caso"
            });
        }
    };
}