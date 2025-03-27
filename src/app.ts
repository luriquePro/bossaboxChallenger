import "dotenv/config";
import "express-async-errors";

import express, { Application } from "express";
import mongoose from "mongoose";
import { Routes } from "./routes.ts";
import { generateSwaggerDoc } from "./swagger.ts";
class App {
	private application: Application;

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
	}
}

export { App };
