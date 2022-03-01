import { useEffect, useState } from 'react'

const useNextAppElement = () => {
	const [appElement, setAppElement] = useState(null)
	useEffect(() => {
		setAppElement(document.getElementById('__next'))
	}, [])
	return appElement
}

export default useNextAppElement
