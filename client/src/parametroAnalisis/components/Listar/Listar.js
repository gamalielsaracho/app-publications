import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioParametroAnalisisContainer from '../Formulario'
import MostarNivelContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderParametrosAnalisis = this.renderParametrosAnalisis.bind(this)
		this.renderParametroAnalisisFormulario = this.renderParametroAnalisisFormulario.bind(this)
	}

	componentWillMount() {
		this.props.listarParametrosAnalisis()
	}

	renderParametroAnalisisFormulario() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioParametroAnalisisContainer/>
		} else {
			return <span></span>
		}
	}

	// shouldComponentUpdate(nextProps) {
	// 	if(nextProps.parametrosAnalisis !== this.props.parametrosAnalisis) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }	


	renderParametrosAnalisis(parametrosAnalisis) {
		if(parametrosAnalisis) {
			return <tbody>
				{
					parametrosAnalisis.map((parametro) => {
						return <tr key={parametro.id_parametroAnalisis}>
				            <td>{ parametro.descripcion }</td>
				            <td>
								<button type="button" onClick={() => { this.props.mostrarParametroAnalisis(parametro.id_parametroAnalisis) }} className="btn btn-info btn-space">Mostrar</button>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarParametroAnalisis(parametro.id_parametroAnalisis) }} className="btn btn-warning btn-space">Editar</button>
								<button type="button" onClick={() => { this.props.eliminarNivel(parametro.id_parametroAnalisis) }} className="btn btn-danger btn-space">Eliminar</button>
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

		const { parametrosAnalisis, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Paramentros de Análisis</h1>
					
					<MostarNivelContainer/>
					{ this.renderParametroAnalisisFormulario() }

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearParametroAnalisis } className='btn btn-success'>Agregar</button>
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

							{ this.renderParametrosAnalisis(parametrosAnalisis) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar