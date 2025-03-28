import * as yup from "yup";

import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepository } from "../../interface/tools.inteface.ts";
import { YupValidate } from "../../utils/YupValidate.ts";
import { IGetToolEntryDTO, IGetToolReturnDTO, IGetToolUsecase } from "./getTool.interface.ts";

class GetToolusecase implements IGetToolUsecase {
	constructor(private readonly toolsRepository: IToolsRepository) {}

	public async execute(dataFilter: IGetToolEntryDTO): Promise<IDefaultReturn<IGetToolReturnDTO>> {
		const { isValid, errors } = this.validate(dataFilter);
		if (!isValid && errors && errors.length) {
			return { is_error: true, message: errors[0], status_code: 400 };
		}

		const toolWithThisIdExists = await this.toolsRepository.findOneById(dataFilter.toolId);
		if (!toolWithThisIdExists) {
			return { is_error: true, message: "Tool with this id does not exist", status_code: 404 };
		}

		return { response: { ...toolWithThisIdExists, _id: undefined, __v: undefined }, is_error: false };
	}

	private validate(dataFilter: IGetToolEntryDTO) {
		const schema = {
			toolId: yup.string().required("Id is required").uuid("Id must be a valid UUID"),
		};

		const errors = YupValidate(schema, dataFilter);
		return { isValid: !errors, errors };
	}
}

export { GetToolusecase };
