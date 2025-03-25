import * as yup from "yup";

const YupValidate = (schema: yup.AnyObject, data: object) => {
	try {
		yup.object().shape(schema).validateSync(data);
	} catch (error: any) {
		return error.errors;
	}
};

export { YupValidate };
