import * as yup from 'yup'

export const registerSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	address: yup.string().required(),
	city: yup.string().required(),
	state: yup.string().required(),
	zip: yup.number().positive().integer().required(),
	phoneNumber: yup
		.string()
		.matches(/^[0-9]*$/)
		.length(10)
		.required(),
	password: yup.string().min(8).required(),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

export const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
})
