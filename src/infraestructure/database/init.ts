import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect({ mongoUrl, dbName }: ConnectionOptions) {
        try {
            await mongoose.connect(mongoUrl, { dbName });
            console.log(`Connected to MongoDB`);
        } catch (error) {
            console.error(`Error connecting to MongoDB: ${error}`);
        }
    }
}