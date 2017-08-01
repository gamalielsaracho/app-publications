import React, { Component } from 'react'
import { Link } from 'react-router'

class DashBoard extends Component {
	render() {
		let style = {
			color: "#fff",
			textAling: "center"
		}

		return <div className='container'>
			<div className='row justify-lg justify-md justify-sm justify-xs'>
				<div className='#00b0ff light-blue accent-3 col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					
					<ul>
						<li className='center'><Link style={style} to='/roles'>Roles</Link></li>
						<li className='center'><Link style={style} to='/usuarios'>Usuarios</Link></li>
					</ul>
				</div>

				<div className=' col-xs-12 col-sm-12 col-md-10 col-lg-10'>
					<br/>
					{ this.props.children }
				</div>
			</div>
		</div>
	}
}

export default DashBoard