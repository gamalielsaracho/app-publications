import React, { Component } from 'react'
import { Link } from 'react-router'

class MostrarModulos extends Component {
	render() {
		// ..
		return <div>
			<h1 className='text-center'>Módulos auditados</h1>

			<div className='row'>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
				  	<Link to='/dashboard/modulos-auditados/areas'>
						<button type="button" className="btn btn-primary btn-lg">
							Areas
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/niveles'>
						<button type="button" className="btn btn-primary btn-lg">
							Niveles
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>

				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>

				</div>
			</div>			
		</div>
	}
}

export default MostrarModulos