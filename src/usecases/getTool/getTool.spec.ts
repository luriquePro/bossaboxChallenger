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
			findByObj: jest.fn() as IToolsRepository["findByObj"],
			list: jest.fn() as IToolsRepository["list"],
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
			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Id is required");
		});

		it("should return an error when id is empty", async () => {
			const usecase = new GetToolusecase(toolsRepository);
			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Id is required");
		});

		it("should return an error when id is invalid", async () => {
			const usecase = new GetToolusecase(toolsRepository);
			await expect(usecase.execute({ toolId: "invalid-id" as unknown as string })).rejects.toThrow("Id must be a valid UUID");
		});

		it("should return an error when tool is not found", async () => {
			const usecase = new GetToolusecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IGetToolReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce(null as unknown as Promise<null>);

			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Tool with this id does not exist");
		});
	});

	describe("execute", () => {
		it("should return a tool successfully when all data is valid", async () => {
			const expectedObject = {
				is_error: false,
				response: {
					id: expect.any(String),
					title: expect.any(String),
					link: expect.any(String),
					description: expect.any(String),
					tags: expect.any(Array),
					status: expect.any(String),
				},
			};

			const usecase = new GetToolusecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IGetToolReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce({
				id: "1",
				title: "title",
				link: "link",
				description: "description",
				tags: ["tag1", "tag2"],
				status: "status",
			} as unknown as Promise<IToolsRepositoryReturnDTO>);

			await expect(usecase.execute({ toolId: undefined as unknown as string })).resolves.toEqual(expectedObject);
		});
	});
});
