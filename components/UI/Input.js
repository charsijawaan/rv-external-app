import classNames from 'classnames'

const Input = ({ type, placeholder, inputClasses, register }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={classNames(
				'block w-full px-2 py-2 sm:text-sm border rounded-md outline-none',
				inputClasses
			)}
			{...register}
		/>
	)
}

export default Input
