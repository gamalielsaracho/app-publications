import React, { Component } from 'react'
import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import FormularioParametroAnalisisContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderParametrosAnalisis = this.renderParametrosAnalisis.bind(this)
		this.renderParametroAnalisisFormulario = this.renderParametroAnalisisFormulario.bind(this)
		this.renderBtnAuditByRol = this.renderBtnAuditByRol.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarParametrosAnalisisByIdTipoAnalisis(this.props.urls.idTipoAnalisis)
	}

	renderParametroAnalisisFormulario() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioParametroAnalisisContainer
				idTipoAnalisis={ this.props.urls.idTipoAnalisis }/>
		} else {
			return <span></span>
		}
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.parametrosAnalisis !== this.props.parametrosAnalisis ||
			nextProps.formulario !== this.props.formulario ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	


	renderBtnAuditByRol() {
		let idRol = this.personalLocalSt.id_rol
		
		if(idRol == 3) {
			return <div className='row'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.urls.idTipoAnalisis}/auditoria/parametros-analisis`}>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Auditoría
						</button>
					</Link>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	renderParametrosAnalisis(parametrosAnalisis) {
		if(parametrosAnalisis) {
			// <button type="button" onClick={() => { this.props.mostrarParametroAnalisis(i.parametro.id_parametroAnalisis) }} className="btn btn-info btn-space">Mostrar</button>
			
			return <tbody>
				{
					parametrosAnalisis.map((i) => {
						return <tr key={i.parametro.id_parametroAnalisis}>
				            <td>{ i.parametro.descripcion }</td>
				            <td>{ i.tipoExamen.descripcion }</td>
				            <td>{ i.unidad.descripcion }</td>
				            <td>
				            	<Link to={`/dashboard/tipos-analisis/${this.props.urls.idTipoAnalisis}/parametros/${i.parametro.id_parametroAnalisis}/referencias`}>
									<button type="button" className="btn btn-info btn-space">Mostrar</button>
								</Link>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarParametroAnalisis(i.parametro.id_parametroAnalisis) }} className="btn btn-warning btn-space">Editar</button>
								<button type="button" onClick={() => { this.props.eliminarParametroAnalisis(i.parametro.id_parametroAnalisis) }} className="btn btn-danger btn-space">Eliminar</button>
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

		const { parametrosAnalisis, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Paramentros de Análisis</h1>
					
					{ this.renderParametroAnalisisFormulario() }

					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderBtnAuditByRol() }

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
						        	<th>Nombre</th>
						        	<th>Tipo de examen</th>
						        	<th>Unidad de medida</th>
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