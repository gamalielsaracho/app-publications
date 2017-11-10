import React, { Component } from 'react'
import { Link } from 'react-router'

class MostrarModulos extends Component {
	render() {

		// ....
		return <div>
			<h1 className='text-center'>Módulos auditados</h1>

			<div className='row'>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
				  	<Link to='/dashboard/modulos-auditados/areas'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Areas
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/niveles'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Niveles
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/pacientes'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Pacientes
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/departamentos'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Departamentos
						</button>
				  	</Link>
				</div>
			</div>

			{/* ---------------------------------------------------------- */}
			<br/>
			<div className='row'>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
				  	<Link to='/dashboard/modulos-auditados/ciudades'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Ciudades
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/alergias'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> alérgias
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/unidades-parametro-preconsulta'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Unidades pre-consulta
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/parametros-preconsulta'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Parametros pre-consulta
						</button>
				  	</Link>
				</div>
			</div>


			<h3 className=''>Algo</h3>
			<div className='row'>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/diagnosticos'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> diagnósticos
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
				  	<Link to='/dashboard/modulos-auditados/sintomas'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Síntomas
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> -----
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> -----
						</button>
				  	</Link>
				</div>
			</div>


			<h3 className=''>Farmacia</h3>
			<div className='row'>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
				  	<Link to='/dashboard/modulos-auditados/farmaceuticas'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Farmaceuticas
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/nombres-medicamentos'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Nombres medicamentos
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/presentaciones'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Presentaciones
						</button>
				  	</Link>
				</div>
				<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
					<Link to='/dashboard/modulos-auditados/drogas'>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Drogas
						</button>
				  	</Link>
				</div>
			</div>

		</div>
	}
}

export default MostrarModulos