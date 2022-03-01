import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false })
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<div className='font-Montserrat'>
			<Toaster />
			<Navbar />
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
