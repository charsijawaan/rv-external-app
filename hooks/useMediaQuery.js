import { useEffect, useState } from 'react'

/*
    Usage
    useMediaQuery('(max-width: 380px)')
*/

const useMediaQuery = (q) => {
	const [result, setResult] = useState(false)
	useEffect(() => {
		const mq = window.matchMedia(q)
		const cb = (m) => setResult(m.matches)
		mq.addEventListener('change', cb)
		if (mq.matches !== result) setResult(mq.matches)
		return () => mq.removeEventListener('change', cb)
	}, [])
	return result
}

export default useMediaQuery
