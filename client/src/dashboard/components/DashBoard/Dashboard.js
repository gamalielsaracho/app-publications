import React, { Component } from 'react'

import Menu from '../Menu'

class DashBoard extends Component {
	render() {

		return <div className='container-fluid'>
			<div className='row'>
				<Menu/>

				<div className='col-xs-12 col-sm-12 col-md-10 col-lg-10'>
					<br/>
					{ this.props.children }
				</div>
			</div>
		</div>
	}
}

export default DashBoard