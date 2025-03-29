import * as yup from "yup";

import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepository } from "../../interface/tools.inteface.ts";
import { NotFoundError } from "../../utils/ApiErros.ts";
import { YupValidate } from "../../utils/YupValidate.ts";
import { IGetToolEntryDTO, IGetToolReturnDTO, IGetToolUsecase } from "./getTool.interface.ts";

class GetToolusecase implements IGetToolUsecase {
	constructor(private readonly toolsRepository: IToolsRepository) {}

	public async execute(dataFilter: IGetToolEntryDTO): Promise<IDefaultReturn<IGetToolReturnDTO>> {
		this.validate(dataFilter);

		const toolWithThisIdExists = await this.toolsRepository.findOneById(dataFilter.toolId);
		if (!toolWithThisIdExists) {
			throw new NotFoundError("Tool with this id does not exist");
		}

		const response: IGetToolReturnDTO = {
			id: toolWithThisIdExists.id,
			title: toolWithThisIdExists.title,
			link: toolWithThisIdExists.link,
			description: toolWithThisIdExists.description,
			tags: toolWithThisIdExists.tags,
			status: toolWithThisIdExists.status,
		};

		return { response, is_error: false };
	}

	private validate(dataFilter: IGetToolEntryDTO) {
		const schema = { toolId: yup.string().required("Id is required").uuid("Id must be a valid UUID") };
		YupValidate(schema, dataFilter);
	}
}

export { GetToolusecase };
