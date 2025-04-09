import { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import path from "path";

const DocumentationsRoutes = Router();

DocumentationsRoutes.get("/", (req: Request, res: Response) => {
	const filePath = path.join(process.cwd(), "src/documentation/index.html");
	const fileContent = readFileSync(filePath, "utf-8");

	const port = process.env.PORT!; // pega do .env ou usa 3000 por padrão
	const renderedHtml = fileContent.replace("{{PORT}}", port);

	res.send(renderedHtml);
	return;
});

DocumentationsRoutes.get("/swagger-file", (req: Request, res: Response) => {
	return res.sendFile(process.cwd() + "/src/swagger-output.json");
});

export { DocumentationsRoutes };
