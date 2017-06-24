import React, { Component } from 'react'
import { Link } from 'react-router'

class DashBoard extends Component {
	render() {
		let style = {
			color: "#fff",
			textAling: "center"
		}

		return <div className='container-fruit'>
			<div className='row'>
				<div className='#00b0ff light-blue accent-3 col-sm-8 col-md-6 col-lg-2'>
					<h5 className='center'>Menu</h5>
					<br/>
					
					<ul>
						<li className='center'><Link style={style} to='/roles'>Roles</Link></li>
						<li className='center'><Link style={style} to='/usuarios'>Usuarios</Link></li>
					</ul>
				</div>
				<div className='col-sm-8 col-md-6 col-lg-10'>
					<br/>
					{ this.props.children }
				</div>
			</div>
		</div>
	}
}

export default DashBoard