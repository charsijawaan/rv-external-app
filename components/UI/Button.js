import classNames from 'classnames'

const Button = ({ children, type, onClick, buttonClasses, disabled }) => {
	return (
		<button
			type={type}
			className={classNames(
				'px-4 py-2 text-sm font-medium text-white rounded-md shadow-md',
				disabled ? 'bg-gray-400' : 'bg-airbnb-red',
				buttonClasses
			)}
			onClick={onClick}
			disabled={disabled || false}
		>
			{children}
		</button>
	)
}

export default Button
