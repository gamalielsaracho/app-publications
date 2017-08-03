import React, { Component } from 'react'
import { Link } from 'react-router'
import MenuContainer from '../Menu'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div>
			<MenuContainer/>

			{ this.props.children }
		</div>
	}
}

export default App