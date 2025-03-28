import { Router } from "express";
import { ToolsController } from "../controllers/tools.controller.ts";
import { ToolsRepository } from "../repositories/tools.repository.ts";
import { CreateToolsUsecase } from "../usecases/createTools/craeteTools.usecase.ts";
import { GetToolusecase } from "../usecases/getTool/getTool.usecase.ts";

const ToolsRoutes = Router();

const toolsRepository = new ToolsRepository();

const createToolsUsecase = new CreateToolsUsecase(toolsRepository);
const getToolsUsecase = new GetToolusecase(toolsRepository);

const toolsController = new ToolsController(createToolsUsecase, getToolsUsecase);

ToolsRoutes.post("/", toolsController.createTools.bind(toolsController));
ToolsRoutes.get("/:toolId", toolsController.getTool.bind(toolsController));

export { ToolsRoutes };
