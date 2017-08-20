import React, { Component } from 'react'

import MenuContainer from '../Menu'

class DashBoard extends Component {
	render() {

		return <div className='container-fluid'>
			<div className='row'>
				<MenuContainer/>

				<div className='col-xs-12 col-sm-12 col-md-10 col-lg-10'>
					{ this.props.children }
				</div>
			</div>
		</div>
	}
}

export default DashBoard