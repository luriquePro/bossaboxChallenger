import express from "express";
import { ToolsRoutes } from "./routes/tools.routes.ts";

const Routes = express();

Routes.use("/tools", ToolsRoutes);

export { Routes };
