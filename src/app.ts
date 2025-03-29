import "dotenv/config";
import "express-async-errors";

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
		this.application.use(express.json());

		this.application.disable("x-powered-by");

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
