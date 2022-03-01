import { Store } from 'pullstate'

export const camperStore = new Store({
	camper:
		typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('camper')) || null : null,
})

export const mutateCamper = (camper) => {
	if (camper == null) localStorage.removeItem('camper')
	else {
		localStorage.setItem('camper', JSON.stringify(camper))
	}
	camperStore.update((s) => {
		s.camper = camper
	})
}
