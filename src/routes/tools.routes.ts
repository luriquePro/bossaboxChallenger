import { Router } from "express";
import { ToolsController } from "../controllers/tools.controller.ts";
import { ToolsRepository } from "../repositories/tools.repository.ts";
import { CreateToolsUsecase } from "../usecases/createTools/craeteTools.usecase.ts";

const ToolsRoutes = Router();

const toolsRepository = new ToolsRepository();

const createToolsUsecase = new CreateToolsUsecase(toolsRepository);

const toolsController = new ToolsController(createToolsUsecase);

ToolsRoutes.post("/", toolsController.createTools.bind(toolsController));

export { ToolsRoutes };
