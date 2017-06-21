import React, { Component } from 'react'

import ListarContainer from '../../../usuario/components/Listar'

class DashBoard extends Component {
	render() {
		return <div className='container-fruit'>
			<div className='row'>
				<div className='#00b0ff light-blue accent-3 col-sm-8 col-md-6 col-lg-2'>
					<h5 className='center'>Menu</h5>
				</div>
				<div className='col-sm-8 col-md-6 col-lg-10'>
					<h3 className='center'>Bienvenido al Dashboard.</h3>
					<ListarContainer/>
					{ this.props.children }
				</div>
			</div>
		</div>
	}
}

export default DashBoard