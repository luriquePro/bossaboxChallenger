import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { IToolsRepository, IToolsRepositoryReturnDTO } from "../../interface/tools.inteface.ts";
import { CreateToolsUsecase } from "./craeteTools.usecase.ts";
import { ICreateToolsEntryDTO } from "./createTools.interface.ts";

describe("CreateToolsUsecase", () => {
	let toolsRepository: IToolsRepository;
	let toolsDTO: ICreateToolsEntryDTO;

	beforeEach(() => {
		toolsRepository = {
			create: jest.fn().mockImplementation(() => Promise.resolve(toolsDTO)) as IToolsRepository["create"],
			findOneByObj: jest.fn() as IToolsRepository["findOneByObj"],
			findOneByTitle: jest.fn() as IToolsRepository["findOneByTitle"],
			findOneById: jest.fn() as IToolsRepository["findOneById"],
		};

		toolsDTO = {
			title: "valid title",
			link: "https://valid-link.com",
			description: "valid description",
			tags: ["tag1", "tag2"],
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe("validate", () => {
		it("should return an error when the title is empty", async () => {
			toolsDTO.title = "";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Title is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the title is missing", async () => {
			toolsDTO.title = undefined as unknown as string;

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Title is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the title has less than 3 characters", async () => {
			toolsDTO.title = "NV";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Title must be at least 3 characters");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the link is empty", async () => {
			toolsDTO.link = "";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Link is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the link is missing", async () => {
			toolsDTO.link = undefined as unknown as string;

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Link is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the link is not a valid URL", async () => {
			toolsDTO.link = "invalid-link";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Link must be a valid URL");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the description is empty", async () => {
			toolsDTO.description = "";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Description is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the description is missing", async () => {
			toolsDTO.description = undefined as unknown as string;

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Description is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the description has less than 3 characters", async () => {
			toolsDTO.description = "NV";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Description must be at least 3 characters");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the tags array is empty", async () => {
			toolsDTO.tags = [];

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("At least one tag is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when the tags array is missing", async () => {
			toolsDTO.tags = undefined as unknown as string[];

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Tags are required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when a tag inside the tags array is missing", async () => {
			toolsDTO.tags = ["tag1", ""];
			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Tag is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when a tag inside the tags array has less than 3 characters", async () => {
			toolsDTO.tags = ["tag1", "NV"];
			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Tag must be at least 3 characters");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when a tag inside the tags array is not a string", async () => {
			toolsDTO.tags = ["tag1", 1234 as unknown as string];
			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Tag must be a string");
			expect(result.status_code).toBe(400);
		});

		it("should create a tool successfully when data is valid", async () => {
			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(false);
			expect(result.response).toEqual(toolsDTO);
		});
	});

	describe("execute", () => {
		it("should return an error when the title is missing or invalid", async () => {
			toolsDTO.title = "";

			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Title is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when a tool with the same title already exists", async () => {
			const usecase = new CreateToolsUsecase(toolsRepository);

			jest.spyOn(toolsRepository, "findOneByTitle").mockReturnValueOnce(toolsDTO as unknown as Promise<IToolsRepositoryReturnDTO>);

			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Tool with same title already exists");
			expect(result.status_code).toBe(400);
		});

		it("should create a tool successfully when all data is valid", async () => {
			const usecase = new CreateToolsUsecase(toolsRepository);
			const result = await usecase.execute(toolsDTO);

			expect(result.is_error).toBe(false);
			expect(result.response).toEqual(toolsDTO);
		});
	});
});
