import { AnyObject, object } from "yup";
import { ValidationError } from "./ApiErros.ts";

const YupValidate = (schema: AnyObject, data: object) => {
	try {
		object().shape(schema).validateSync(data);
	} catch (error: any) {
		throw new ValidationError(error.errors);
	}
};

export { YupValidate };
