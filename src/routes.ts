import express from "express";
import { DocumentationsRoutes } from "./routes/documentations.routes.ts";
import { ToolsRoutes } from "./routes/tools.routes.ts";

const Routes = express();

Routes.use("/tools", ToolsRoutes);
Routes.use("/docs", DocumentationsRoutes);
export { Routes };
