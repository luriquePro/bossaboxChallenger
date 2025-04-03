import { Router } from "express";
import { ToolsController } from "../controllers/tools.controller.ts";
import { ToolsRepository } from "../repositories/tools.repository.ts";
import { CreateToolsUsecase } from "../usecases/createTools/createTools.usecase.ts";
import { GetToolusecase } from "../usecases/getTool/getTool.usecase.ts";
import { ListToolsUsecase } from "../usecases/listTools/listTools.usecase.ts";

const ToolsRoutes = Router();

const toolsRepository = new ToolsRepository();

const createToolsUsecase = new CreateToolsUsecase(toolsRepository);
const getToolUsecase = new GetToolusecase(toolsRepository);
const listToolsUsecase = new ListToolsUsecase(toolsRepository);

const toolsController = new ToolsController(createToolsUsecase, getToolUsecase, listToolsUsecase);

ToolsRoutes.post("/", toolsController.createTools.bind(toolsController));
ToolsRoutes.get("/:toolId", toolsController.getTool.bind(toolsController));
ToolsRoutes.get("/", toolsController.listTools.bind(toolsController));

export { ToolsRoutes };
