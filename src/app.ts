import cors from "cors";
import "dotenv/config";
import "express-async-errors";
import helmet from "helmet";

import express, { Application } from "express";
import mongoose from "mongoose";
import { errorMiddleware } from "./middlewares/errorMiddleware.ts";
import { Routes } from "./routes.ts";
import { generateSwaggerDoc } from "./swagger.ts";
class App {
	private application: Application;
	private FORMAT_MESSAGE_ON_ERROR = process.env.FORMAT_MESSAGE_ON_ERROR === "true";

	constructor() {
		this.application = express();
		this.config();
	}

	public listen(port: number, cb?: () => void) {
		this.application.listen(port, cb);
	}

	private config() {
		this.application.use(
			cors({
				origin: (origin, callback) => {
					const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

					if (!origin || allowedOrigins.includes(origin)) {
						callback(null, true);
					} else {
						callback(new Error("Not allowed by CORS"));
					}
				},
				credentials: true,
			}),
		);

		this.application.use(express.json());

		this.application.disable("X-Powered-By");

		this.application.use(
			helmet({
				contentSecurityPolicy: {
					directives: {
						defaultSrc: ["'self'"], // Allows only resources from the same domain
						scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"], // Blocks external scripts
						styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/"], // Blocks external styles
						fontSrc: ["'self'", "https://fonts.gstatic.com"],
						objectSrc: ["'none'"], // Blocks plugins like Flash
						imgSrc: ["'self'", "data:", "https://framerusercontent.com"], // Allows images only from the same domain and base64
						upgradeInsecureRequests: [], // Forces HTTPS
						workerSrc: ["'self'", "blob:"],
					},
				},
			}),
		);

		this.application.use(helmet.xssFilter());

		generateSwaggerDoc();

		mongoose
			.connect(process.env.MONGODB_URL!, { dbName: process.env.MONGODB_NAME! })
			.then(() => console.log("DB connected"))
			.catch(err => console.log("DB connection error"));

		this.application.use(Routes);

		if (this.FORMAT_MESSAGE_ON_ERROR) {
			this.application.use(errorMiddleware);
		}
	}
}

export { App };
