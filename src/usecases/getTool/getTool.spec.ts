import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepository, IToolsRepositoryReturnDTO } from "../../interface/tools.inteface.ts";
import { IGetToolReturnDTO } from "./getTool.interface.ts";
import { GetToolusecase } from "./getTool.usecase.ts";

describe("GetToolUsecase", () => {
	let toolsRepository: IToolsRepository;

	beforeEach(() => {
		toolsRepository = {
			create: jest.fn() as IToolsRepository["create"],
			findOneByObj: jest.fn() as IToolsRepository["findOneByObj"],
			findOneByTitle: jest.fn() as IToolsRepository["findOneByTitle"],
			findOneById: jest.fn() as IToolsRepository["findOneById"],
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe("validate", () => {
		it("should return an error when id is missing", async () => {
			const usecase = new GetToolusecase(toolsRepository);
			const result = await usecase.execute({ toolId: undefined as unknown as string });

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Id is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when id is empty", async () => {
			const usecase = new GetToolusecase(toolsRepository);
			const result = await usecase.execute({ toolId: "" });

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Id is required");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when id is invalid", async () => {
			const usecase = new GetToolusecase(toolsRepository);
			const result = await usecase.execute({ toolId: "invalid-id" });

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Id must be a valid UUID");
			expect(result.status_code).toBe(400);
		});

		it("should return an error when tool is not found", async () => {
			const usecase = new GetToolusecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IGetToolReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce(null as unknown as Promise<null>);

			const result = await usecase.execute({ toolId: "valid-id" });

			expect(result.is_error).toBe(true);
			expect(result.message).toBe("Tool with this id does not exist");
			expect(result.status_code).toBe(404);
		});
	});

	describe("execute", () => {
		it("should return a tool successfully when all data is valid", async () => {
			const usecase = new GetToolusecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IGetToolReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce({} as unknown as Promise<IToolsRepositoryReturnDTO>);

			const result = await usecase.execute({ toolId: "valid-id" });

			expect(result.is_error).toBe(false);
			expect(result.response).toEqual({});
		});
	});
});
