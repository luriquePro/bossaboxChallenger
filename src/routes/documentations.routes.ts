import { Request, Response, Router } from "express";

const DocumentationsRoutes = Router();

DocumentationsRoutes.get("/", (req: Request, res: Response) => {
	return res.sendFile(process.cwd() + "/src/documentation/index.html");
});

DocumentationsRoutes.get("/swagger-file", (req: Request, res: Response) => {
	return res.sendFile(process.cwd() + "/src/swagger-output.json");
});

export { DocumentationsRoutes };
