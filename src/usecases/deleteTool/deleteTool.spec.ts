import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepository, IToolsRepositoryReturnDTO, ToolsStatus } from "../../interface/tools.inteface.ts";
import { DeleteToolUsecase } from "./deleteTool.usecase.ts";

describe("DeleteToolUsecase", () => {
	let toolsRepository: IToolsRepository;

	beforeEach(() => {
		toolsRepository = {
			create: jest.fn() as IToolsRepository["create"],
			findOneByObj: jest.fn() as IToolsRepository["findOneByObj"],
			findOneByTitle: jest.fn() as IToolsRepository["findOneByTitle"],
			findOneById: jest.fn() as IToolsRepository["findOneById"],
			findByObj: jest.fn() as IToolsRepository["findByObj"],
			list: jest.fn() as IToolsRepository["list"],
			deleteOneByObj: jest.fn() as IToolsRepository["deleteOneByObj"],
			deleteOneById: jest.fn() as IToolsRepository["deleteOneById"],
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe("validate", () => {
		it("should return an error when id is missing", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);
			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Id is required");
		});

		it("should return an error when id is empty", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);
			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Id is required");
		});

		it("should return an error when id is invalid", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);
			await expect(usecase.execute({ toolId: "invalid-id" as unknown as string })).rejects.toThrow("Id must be a valid UUID");
		});

		it("should return an error when tool is not found", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IToolsRepositoryReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce(null as unknown as Promise<null>);

			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Tool with this id does not exist");
		});

		it("should return an error when tool is deleted", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IToolsRepositoryReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce({
				id: "1",
				title: "title",
				link: "link",
				description: "description",
				tags: ["tag1", "tag2"],
				status: ToolsStatus.DELETED,
			} as unknown as Promise<IToolsRepositoryReturnDTO>);

			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Tool with this id is already deleted");
		});
	});

	describe("execute", () => {
		it("should return an error when tool is deleted", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IToolsRepositoryReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce({
				id: "1",
				title: "title",
				link: "link",
				description: "description",
				tags: ["tag1", "tag2"],
				status: ToolsStatus.DELETED,
			} as unknown as Promise<IToolsRepositoryReturnDTO>);

			await expect(usecase.execute({ toolId: undefined as unknown as string })).rejects.toThrow("Tool with this id is already deleted");
		});

		it("should delete tool", async () => {
			const usecase = new DeleteToolUsecase(toolsRepository);

			jest
				.spyOn(usecase, "validate" as unknown as "execute")
				.mockReturnValueOnce({ isValid: true } as unknown as Promise<IDefaultReturn<IToolsRepositoryReturnDTO>>);

			jest.spyOn(toolsRepository, "findOneById").mockReturnValueOnce({
				id: "1",
				title: "title",
				link: "link",
				description: "description",
				tags: ["tag1", "tag2"],
				status: ToolsStatus.ACTIVE,
			} as unknown as Promise<IToolsRepositoryReturnDTO>);

			jest.spyOn(toolsRepository, "deleteOneById").mockReturnValueOnce(Promise.resolve());

			await expect(usecase.execute({ toolId: undefined as unknown as string })).resolves.toEqual({
				is_error: false,
				response: {
					id: "1",
					title: "title",
					link: "link",
					description: "description",
					tags: ["tag1", "tag2"],
					status: ToolsStatus.DELETED,
				},
			});
		});
	});
});
