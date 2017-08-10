import React, { Component } from 'react'

import Header from '../components/Header'
import Nosotros from '../components/Nosotros'
import Mapa from '../components/Mapa'
import Footer from '../components/Footer'


class HomePage extends Component {
	render() {
		return <div>
			<Nosotros/>
			<Mapa/>
			<Footer/>
		</div>
	}
}

export default HomePage