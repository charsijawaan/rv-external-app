import useAxios from '../../hooks/useAxios'

const axios = useAxios()

export const addNewCard = async (data) => {
	try {
		return await axios.post('/camper/add_new_card', data)
	} catch (err) {
		return err.response
	}
}

export const getCardsByCamperId = async (camperId) => {
	try {
		return await axios.get(`/camper/get_cards?camperId=${camperId}`)
	} catch (err) {
		return err.response
	}
}

export const reserveSite = async (data) => {
	try {
		return await axios.post('/camper/reserve', data)
	} catch (err) {
		return err.response
	}
}

export const deleteCard = async (data) => {
	console.log(data)
	try {
		return await axios.post('/camper/credit_card', data)
	} catch (err) {
		return err.response
	}
}
