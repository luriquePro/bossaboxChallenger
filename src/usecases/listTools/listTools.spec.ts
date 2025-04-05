import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { IToolsRepository } from "../../interface/tools.inteface.ts";
import { IListToolsReturnDTO } from "./listTools.interface.ts";
import { ListToolsUsecase } from "./listTools.usecase.ts";

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
			deleteOneByObj: jest.fn() as IToolsRepository["deleteOneByObj"],
			deleteOneById: jest.fn() as IToolsRepository["deleteOneById"],
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe("execute", () => {
		it("should return a list of tools successfully", async () => {
			const expectedObject = {
				is_error: false,
				response: [
					{ id: "1", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
					{ id: "2", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
				],
			};

			const usecase = new ListToolsUsecase(toolsRepository);

			jest.spyOn(toolsRepository, "list").mockReturnValueOnce([
				{ id: "1", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
				{ id: "2", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
			] as unknown as Promise<IListToolsReturnDTO[]>);

			await expect(usecase.execute({})).resolves.toEqual(expectedObject);
		});

		it("should return an empty list when tag is invalid", async () => {
			const expectedObject = {
				is_error: false,
				response: [],
			};

			const usecase = new ListToolsUsecase(toolsRepository);

			jest.spyOn(toolsRepository, "list").mockReturnValueOnce([] as unknown as Promise<IListToolsReturnDTO[]>);

			await expect(usecase.execute({ tag: "invalid" })).resolves.toEqual(expectedObject);
		});

		it("should return an empty list when tag is empty", async () => {
			const expectedObject = {
				is_error: false,
				response: [],
			};

			const usecase = new ListToolsUsecase(toolsRepository);

			jest.spyOn(toolsRepository, "list").mockReturnValueOnce([] as unknown as Promise<IListToolsReturnDTO[]>);

			await expect(usecase.execute({ tag: "" })).resolves.toEqual(expectedObject);
		});

		it("should return a list of tools when useRegex is true and tag is valid", async () => {
			const expectedObject = {
				is_error: false,
				response: [
					{ id: "1", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
					{ id: "2", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
				],
			};

			const usecase = new ListToolsUsecase(toolsRepository);

			jest.spyOn(toolsRepository, "list").mockReturnValueOnce([
				{ id: "1", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
				{ id: "2", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
			] as unknown as Promise<IListToolsReturnDTO[]>);

			await expect(usecase.execute({ tag: "tag", useRegex: true })).resolves.toEqual(expectedObject);
		});

		it("should return a list of tools when useRegex is false and tag is valid", async () => {
			const expectedObject = {
				is_error: false,
				response: [
					{ id: "1", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
					{ id: "2", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
				],
			};

			const usecase = new ListToolsUsecase(toolsRepository);

			jest.spyOn(toolsRepository, "list").mockReturnValueOnce([
				{ id: "1", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
				{ id: "2", title: "title", link: "link", description: "description", tags: ["tag1", "tag2"], status: "status" },
			] as unknown as Promise<IListToolsReturnDTO[]>);

			await expect(usecase.execute({ tag: "tag", useRegex: false })).resolves.toEqual(expectedObject);
		});
	});
});
