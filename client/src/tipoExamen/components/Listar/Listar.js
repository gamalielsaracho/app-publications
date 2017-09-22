import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioTipoExamenContainer from '../Formulario'
import MostarTipoExamenContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderTiposExamenes = this.renderTiposExamenes.bind(this)
	}

	componentWillMount() {
		this.props.listarTiposExamenes()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.tiposExamenes !== this.props.tiposExamenes) {
			return true
		}else {
			return false
		}
	}	

	renderTiposExamenes(tiposExamenes) {
		if(tiposExamenes) {
			return <tbody>
				{
					tiposExamenes.map((tipo) => {
						return <tr key={tipo.id_tipoExamen}>
				            <td>{ tipo.id_tipoExamen }</td>
				            <td>{ tipo.descripcion }</td>
				            <td>
								<button type="button" onClick={() => { this.props.mostrarTipoExamen(tipo.id_tipoExamen) }} className="btn btn-info btn-space">Mostrar</button>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarTipoExamen(tipo.id_tipoExamen) }} className="btn btn-warning btn-space">Editar</button>
								<button type="button" onClick={() => { this.props.eliminarTipoExamen(tipo.id_tipoExamen) }} className="btn btn-danger btn-space">Eliminar</button>
				            </td>
				        </tr>		
					})
				}
			</tbody>
		} else {
			return <span></span>
		}
	}

	render() {

		const { tiposExamenes, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Tipos de examenes</h1>
					
					<FormularioTipoExamenContainer/>
					<MostarTipoExamenContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearTipoExamen } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderTiposExamenes(tiposExamenes) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar