import React, { Component } from 'react'
import { Link } from 'react-router'
import MenuContainer from '../Menu'

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const token = localStorage.getItem('token')
		// console.log(token)

		if(token) {
			this.props.verificarTokenPersonal(token)
			
			console.log("hola de el punto de entrada.")
		}else {
			console.log("no hay token..")
		}
	}

	render() {
		return <div>
			<MenuContainer/>

			{ this.props.children }
		</div>
	}
}

export default App