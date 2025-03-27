import fs from "fs";
import path from "path";

import swaggerJSDoc, { Components, Information, OAS3Definition, OAS3Options, Paths, Server, Tag } from "swagger-jsdoc";
import { ToolsPath } from "./documentation/Tools/tools.path.ts";
import { ToolsSchema } from "./documentation/Tools/tools.schema.ts";
import { ErrorSchema } from "./documentation/app/error.schema.ts";

const DIRNAME = process.cwd();

const swaggerInfo: Information = {
	title: "Bossbox Api Documentation",
	version: "1.0.0",
	description: "Bossabox Api Documentation - Using Swagger",
	contact: { email: "luiz.prog.henri@gmail.com", name: "Luiz Henrique", url: "https://github.com/luriquePro" },
	"x-logo": {
		url: "https://framerusercontent.com/images/4v2FtQL8pVhEsvAy90OuFGWAykU.png",
		backgroundColor: "#FFFFFF",
		altText: "BossaBox logo",
	},
	license: { name: "MIT", url: "https://github.com/luriquePro/bossaboxChallenger/blob/master/LICENSE" },
};

const swaggerServes: Server[] = [{ url: "http://localhost:3000/", description: "Local server", variables: {} }];

const swagerTags: Tag[] = [{ name: "Tools", description: "Endpoints to manage tools" }];

const swaggerComponentsSchema: Components["schemas"] = {
	...ErrorSchema,
	...ToolsSchema,
};

const swaggerComponents: Components = {
	schemas: swaggerComponentsSchema,
};

const swaggerPaths: Paths = {
	...ToolsPath,
};

const swaggerDefinition: OAS3Definition = {
	openapi: "3.0.0",
	info: swaggerInfo,
	servers: swaggerServes,
	tags: swagerTags,
	components: swaggerComponents,
	paths: swaggerPaths,
	externalDocs: {
		description: "Github repository",
		url: "https://github.com/luriquePro/bossaboxChallenger/",
	},
};

const options: OAS3Options = {
	swaggerDefinition,
	apis: [path.resolve(DIRNAME, "../routes.ts")],
};

const getSwaggerTags = (swaggerData: OAS3Definition) => {
	const urls = Object.keys(swaggerData.paths!);

	urls.forEach(url => {
		const segments = url.split("/").filter(Boolean);

		if (segments.length) {
			const group = segments[0];

			const fristLetterGroup = group.charAt(0);
			const restLetters = group.slice(1);

			const tag = fristLetterGroup.toUpperCase() + restLetters;
			const methods = swaggerData.paths![url];

			Object.keys(methods).forEach(methodKey => {
				methods[methodKey].tags = [tag];
			});
		}
	});

	return swaggerData;
};

const generateSwaggerDoc = () => {
	const outputFile = path.join(DIRNAME, "src/swagger-output.json");
	options.swaggerDefinition! = getSwaggerTags(options.swaggerDefinition!);

	fs.writeFileSync(outputFile, JSON.stringify(swaggerJSDoc(options), null, 2));
};

export { generateSwaggerDoc };
