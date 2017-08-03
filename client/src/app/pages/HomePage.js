import React, { Component } from 'react'

import Header from '../components/Header'
import Nosotros from '../components/Nosotros'
import Footer from '../components/Footer'

class HomePage extends Component {
	render() {
		return <div>
			<Header/>
			<Nosotros/>
			
			<Footer/>
		</div>
	}
}

export default HomePage