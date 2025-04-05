import { string } from "yup";

import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepository, IToolsRepositoryReturnDTO, ToolsStatus } from "../../interface/tools.inteface.ts";
import { BadRequestError, NotFoundError } from "../../utils/ApiErros.ts";
import { YupValidate } from "../../utils/YupValidate.ts";
import { IDeleteToolEntryDTO, IDeleteToolUsecase } from "./deleteTool.interface.ts";

class DeleteToolUsecase implements IDeleteToolUsecase {
	constructor(private toolsRepository: IToolsRepository) {}

	public async execute({ toolId }: IDeleteToolEntryDTO): Promise<IDefaultReturn<IToolsRepositoryReturnDTO>> {
		this.validate(toolId);

		// Valide if tool exists
		const toolWithThisIdExists = await this.toolsRepository.findOneById(toolId);
		if (!toolWithThisIdExists) {
			throw new NotFoundError("Tool with this id does not exist");
		}

		if (toolWithThisIdExists.status === ToolsStatus.DELETED) {
			throw new BadRequestError("Tool with this id is already deleted");
		}

		// Delete tool
		await this.toolsRepository.deleteOneById(toolId);

		return { response: { ...toolWithThisIdExists, status: ToolsStatus.DELETED }, is_error: false };
	}

	private validate(toolId: string) {
		const schema = { toolId: string().required("Id is required").uuid("Id must be a valid UUID") };
		YupValidate(schema, { toolId });
	}
}

export { DeleteToolUsecase };
