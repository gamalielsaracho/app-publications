import React, { Component } from 'react'
import { Link } from 'react-router'
import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioTipoAnalisisContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderTiposAnalisis = this.renderTiposAnalisis.bind(this)
	}

	componentWillMount() {
		this.props.listarTiposAnalisis()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.tiposAnalisis !== this.props.tiposAnalisis) {
			return true
		}else {
			return false
		}
	}	

	renderTiposAnalisis(tiposAnalisis) {

		return <tbody>
			{
				tiposAnalisis.map((tipo) => {
					return <tr key={tipo.id_tipoAnalisis}>
			            <td>{ tipo.id_tipoAnalisis }</td>
			            <td>{ tipo.descripcion }</td>
			            <td>
			           		<Link to={`/dashboard/tipos-analisis/${tipo.id_tipoAnalisis}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarTipoAnalisis(tipo.id_tipoAnalisis) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarTipoAnalisis(tipo.id_tipoAnalisis) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { tiposAnalisis, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Tipos de análisis</h1>
					
					<FormularioTipoAnalisisContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearTipoAnalisis } className='btn btn-success'>Agregar</button>
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

							{ this.renderTiposAnalisis(tiposAnalisis) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar