import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioNivelContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderUnidadesParametroPre = this.renderUnidadesParametroPre.bind(this)
	}

	componentWillMount() {
		this.props.listarUnidadesParametroPre()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.unidadesParametroPre !== this.props.unidadesParametroPre) {
			return true
		}else {
			return false
		}
	}	

	renderUnidadesParametroPre(unidadesParametroPre) {

		return <tbody>
			{
				unidadesParametroPre.map((unidad) => {
					return <tr key={unidad.id_unidadParametroPre}>
			            <td>{ unidad.id_unidadParametroPre }</td>
			            <td>{ unidad.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarUnidadParametroPre(unidad.id_unidadParametroPre) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarUnidadParametroPre(unidad.id_unidadParametroPre) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarUnidadParametroPre(unidad.id_unidadParametroPre) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { unidadesParametroPre, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Unidades parametro pre-consulta</h1>
					
					<FormularioNivelContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearUnidadParametroPre } className='btn btn-success'>Agregar</button>
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

							{ this.renderUnidadesParametroPre(unidadesParametroPre) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar