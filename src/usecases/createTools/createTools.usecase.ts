import * as yup from "yup";

import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepository } from "../../interface/tools.inteface.ts";
import { BadRequestError } from "../../utils/ApiErros.ts";
import { YupValidate } from "../../utils/YupValidate.ts";
import { ICreateToolsEntryDTO, ICreateToolsReturnDTO, ICreateToolsUsecase } from "./createTools.interface.ts";

class CreateToolsUsecase implements ICreateToolsUsecase {
	constructor(private readonly toolsRepository: IToolsRepository) {}

	public async execute(dataCreate: ICreateToolsEntryDTO): Promise<IDefaultReturn<ICreateToolsReturnDTO>> {
		this.validate(dataCreate);

		// Check if this tool already exists
		const toolWithSameTitleExists = await this.toolsRepository.findOneByTitle(dataCreate.title);
		if (toolWithSameTitleExists) {
			throw new BadRequestError("Tool with same title already exists");
		}

		const result = await this.toolsRepository.create(dataCreate);

		const response: ICreateToolsReturnDTO = {
			id: result.id,
			title: result.title,
			link: result.link,
			description: result.description,
			tags: result.tags,
			status: result.status,
		};

		return { response, is_error: false };
	}

	private validate(dataCreate: ICreateToolsEntryDTO) {
		const schema = {
			title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
			link: yup
				.string()
				.required("Link is required")
				.test("link", "Link must be a valid URL", value => {
					try {
						new URL(value);
						return true;
					} catch (error) {
						return false;
					}
				}),
			description: yup.string().required("Description is required").min(3, "Description must be at least 3 characters"),
			tags: yup
				.array()
				.required("Tags are required")
				.min(1, "At least one tag is required")
				.of(
					yup
						.string()
						.strict()
						.required("Tag is required")
						.min(3, "Tag must be at least 3 characters")
						.test("tag", "Tag must be a string", value => typeof value === "string" && !isNaN(Number(value)) === false),
				),
		};

		YupValidate(schema, dataCreate);
	}
}

export { CreateToolsUsecase };
