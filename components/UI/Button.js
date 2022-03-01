import classNames from 'classnames'

const Button = ({ children, type, onClick, buttonClasses }) => {
	return (
		<button
			type={type}
			className={classNames(
				'px-4 py-2 text-sm font-medium text-white rounded-md shadow-md bg-airbnb-red',
				buttonClasses
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
