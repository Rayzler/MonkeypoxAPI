import cron from "node-cron";
import { EmailService } from "../services/email.service";
import { generateEmailTemplate } from "../templates/email.template";
import { CaseModel } from "../entities/case.model";

export const emailJob = () => {
    const emailService = new EmailService();
    
    cron.schedule("*/10 * * * * *", async () => {
        try {
            const cases = await CaseModel.find({
                isSent: false
            });
            if (!cases.length) {
                console.log("No cases to send");
                return;
            }
            
            console.log(`Cases to send: ${cases.length}`);
            await Promise.all(
                cases.map(async (c) => {
                    try {
                        const emailSent = await emailService.sendMail({
                            to: "rayzler.404@gmail.com",
                            subject: "Nuevo Caso Registrado",
                            body: generateEmailTemplate(c.genre, c.age, c.lat, c.lng)
                        });
                        
                        console.log(`Email sent: ${c._id}`);
                        
                        await CaseModel.updateOne({ _id: c._id }, {
                            isSent: true
                        });
                    } catch (error) {
                        console.error(error);
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
    });
};