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
		this.renderBtnsOpcionesByRolYpersonal = this.renderBtnsOpcionesByRolYpersonal.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

		this.renderFormularioByRolYpersonal = this.renderFormularioByRolYpersonal.bind(this)
	}

	// this.props.idAnalisisSolicitado -> es pasado como property.
	componentWillMount() {
		this.props.listarAnalisisSolicitadoTipos(this.props.idAnalisisSolicitado)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.analisisSolicitadoTipos !== this.props.analisisSolicitadoTipos
	}

	renderBtnsOpcionesByRolYpersonal(i) {
		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal

		if((rol == 'administracion') || (rol == 'medico' && idPersonal == i.consulta.id_personal)) {
			return <div>
				<button type="button" onClick={() => { this.props.eliminarAnalisisSolicitadoTipo(i.analisisSolicitadoTipo.id_analisisSolicitadoTipo) }} className="btn btn-danger btn-sm btn-space">
					<span className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span> Eliminar
				</button>
			</div>
		} else {
			return <span></span>
		}
	}

	renderFormularioByRolYpersonal() {
		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal

		const { cargando, analisisSolicitado, error } = this.props.mostrar

		if(!cargando && analisisSolicitado) {
				if(analisisSolicitado.personal.id_personal) {
					if((rol == 'administracion') || (rol == 'medico' && idPersonal == analisisSolicitado.personal.id_personal)) {
						return <div>
							<FormularioAnalisisSolicitadoTipoContainer
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
							{ this.renderBtnsOpcionesByRolYpersonal(i) }
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

				{ this.renderFormularioByRolYpersonal() }

				{ this.renderAnalisisSolicitadoTipos(analisisSolicitadoTipos) }
			</div>
		}

	}
}

export default Listar