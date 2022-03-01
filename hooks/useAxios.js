import axios from 'axios'

const useAxios = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return axiosInstance
}

export default useAxios
