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
	}

	// this.props.idAnalisisSolicitado -> es pasado como property.
	componentWillMount() {
		this.props.listarAnalisisSolicitadoTipos(this.props.idAnalisisSolicitado)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.analisisSolicitadoTipos !== this.props.analisisSolicitadoTipos
	}

	renderBtnsOpcionesByRolYpersonal(i) {
		
		// if(personalPre != null) {
		// 	if(removeAccents(datosToken.rol.descripcion) == 'enfermeria' && datosToken.personal.id_personal == personalPre.personal.id_personal) {
				return <div>
					<button type="button" onClick={() => { this.props.eliminarAnalisisSolicitadoTipo(i.analisisSolicitadoTipo.id_analisisSolicitadoTipo) }} className="btn btn-danger btn-sm btn-space">
						<span className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span> Eliminar
					</button>
				</div>
		// 	} else {
		// 		return <span></span>
		// 	}
		// }
	}

	renderAnalisisSolicitadoTipos(analisisSolicitadoTipos) {
		console.log(analisisSolicitadoTipos)

		let datosToken = null
		let personalPre = null

		// let condition = (
		// 	this.props.preConsulta != undefined && 
		// 	this.props.usuarioEstado.datosToken.rol != null
		// );

		// if(condition) {
		// 	datosToken = this.props.usuarioEstado.datosToken
		// 	personalPre = this.props.preConsulta
		// }


		return <div>
			{
				analisisSolicitadoTipos.map((i) => {
					return <tr key={i.analisisSolicitadoTipo.id_analisisSolicitadoTipo}>
						<br/>
						<br/>
			            <td>{ i.tipoAnalisis.descripcion }</td>
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
				<h4 className='text-center'>Análisis solicitados</h4>

				<MensajeOerror error={error} mensaje={null}/>

				<FormularioAnalisisSolicitadoTipoContainer
					idAnalisisSolicitado={this.props.idAnalisisSolicitado}/>
				<br/>
				{ this.renderAnalisisSolicitadoTipos(analisisSolicitadoTipos) }
			</div>
		}

	}
}

export default Listar