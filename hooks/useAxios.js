import axios from 'axios'

const useAxios = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API,
	})

	axiosInstance.interceptors.request.use(
		async (config) => {
			config.headers = {
				'Content-Type': 'application/json',
				Authorization:
					typeof window !== 'undefined'
						? `Bearer ${localStorage.getItem('accessToken')}`
						: '',
			}
			return config
		},
		(error) => {
			Promise.reject(error)
		}
	)

	axiosInstance.interceptors.response.use(
		(response) => {
			return response
		},
		async function (error) {
			const originalRequest = error.config
			if (error.response.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true
				const res = await fetch(`${process.env.NEXT_PUBLIC_API}/token`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						refreshToken: localStorage.getItem('refreshToken'),
					}),
				})
				const content = await res.json()
				const accessToken = content.accessToken
				localStorage.setItem('accessToken', accessToken)
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
				return axiosInstance(originalRequest)
			}
			return Promise.reject(error)
		}
	)

	return axiosInstance
}

export default useAxios
