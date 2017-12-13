import React, { Component } from 'react'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioAnalisisSolicitadoTipoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisSolicitadoTipos = this.renderAnalisisSolicitadoTipos.bind(this)
		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)

		this.renderFormularioByRolYIdPersonal = this.renderFormularioByRolYIdPersonal.bind(this)
	}

	// this.props.idAnalisisSolicitado -> es pasado como property.
	componentWillMount() {
		this.props.listarAnalisisSolicitadoTipos(this.props.idAnalisisSolicitado)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.analisisSolicitadoTipos !== this.props.analisisSolicitadoTipos
	}

	getEstadoHabilitado() {
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(this.props.solicitudPendiente) {
			desabilitado = false
		} else {
			desabilitado = true
		}

		// 3 administración.
		if(idRol == 3) {
			desabilitado = false
		}

		return desabilitado
	}

	renderBtnsOpciones(i) {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		if((idRol == 3) || (idRol == 1 && idPersonal == i.consulta.id_personal)) {
			return <div>
				<button disabled={this.getEstadoHabilitado()} type="button" onClick={() => { this.props.eliminarAnalisisSolicitadoTipo(i.analisisSolicitadoTipo.id_analisisSolicitadoTipo) }} className="btn btn-danger btn-sm btn-space">
					<span className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span> Eliminar
				</button>
			</div>
		} else {
			return <span></span>
		}
	}

	renderFormularioByRolYIdPersonal() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		const { cargando, analisisSolicitado, error } = this.props.mostrar

		if(!cargando && analisisSolicitado) {
				if(analisisSolicitado.personal.id_personal) {
					if((idRol == 3) || (idRol == 1 && idPersonal == analisisSolicitado.personal.id_personal)) {
						return <div>
							<FormularioAnalisisSolicitadoTipoContainer
								solicitudPendiente = { this.props.solicitudPendiente }
								idAnalisisSolicitado={this.props.idAnalisisSolicitado}/>
							<br/>
						</div>
					} else {
						return <span></span>
					}
				}
		}
	}

	renderAnalisisSolicitadoTipos(analisisSolicitadoTipos) {
		// console.log(analisisSolicitadoTipos)

		return <div>
			{
				analisisSolicitadoTipos.map((i) => {
					return <tr key={i.analisisSolicitadoTipo.id_analisisSolicitadoTipo}>
						<br/>
						<br/>
			            <td><li>{ i.tipoAnalisis.descripcion }</li></td>
			            <td>
							{ this.renderBtnsOpciones(i) }
						</td>
			        </tr>		
				})
			}
		</div>
	}

	render() {
		const { analisisSolicitadoTipos, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<h3 className='text-center'>Análisis solicitados</h3>

				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderFormularioByRolYIdPersonal() }

				{ this.renderAnalisisSolicitadoTipos(analisisSolicitadoTipos) }
			</div>
		}

	}
}

export default Listar