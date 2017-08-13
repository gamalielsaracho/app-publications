import React, { Component } from 'react'

class Cargando extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div className='row'>
			<div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered'>
				<div className="spinner">
					<div className="cube1"></div>
					<div className="cube2"></div>
				</div>
			</div>
		</div>
	}
}

export default Cargando