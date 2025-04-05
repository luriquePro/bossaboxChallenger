import { Router } from "express";
import { ToolsController } from "../controllers/tools.controller.ts";
import { RateLimit } from "../middlewares/RateLimitMiddleware.ts";
import { ToolsRepository } from "../repositories/tools.repository.ts";
import { CreateToolsUsecase } from "../usecases/createTools/createTools.usecase.ts";
import { DeleteToolUsecase } from "../usecases/deleteTool/deleteTool.usecase.ts";
import { GetToolusecase } from "../usecases/getTool/getTool.usecase.ts";
import { ListToolsUsecase } from "../usecases/listTools/listTools.usecase.ts";

const ToolsRoutes = Router();

const toolsRepository = new ToolsRepository();

const createToolsUsecase = new CreateToolsUsecase(toolsRepository);
const getToolUsecase = new GetToolusecase(toolsRepository);
const listToolsUsecase = new ListToolsUsecase(toolsRepository);
const deleteToolUsecase = new DeleteToolUsecase(toolsRepository);

const toolsController = new ToolsController(createToolsUsecase, getToolUsecase, listToolsUsecase, deleteToolUsecase);

// The rate limit middleware is applied to all routes
const rateLimitMiddleware = RateLimit({ limitRequestPerTime: 10, timeLimitInSeconds: 30 });

ToolsRoutes.post("/", rateLimitMiddleware, toolsController.createTools.bind(toolsController));
ToolsRoutes.get("/:toolId", rateLimitMiddleware, toolsController.getTool.bind(toolsController));
ToolsRoutes.get("/", rateLimitMiddleware, toolsController.listTools.bind(toolsController));
ToolsRoutes.delete("/:toolId", rateLimitMiddleware, toolsController.deleteTool.bind(toolsController));

export { ToolsRoutes };
