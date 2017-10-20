import React, { Component } from 'react'
import removeAccents from 'remove-accents'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// PreConsulta X Parametro.
import FormularioPreConsultaParametroContainer from '../../../preConsultaParametro/components/Formulario'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderPreConsulta = this.renderPreConsulta.bind(this)

		this.formularioPreConsultaParametroByRol = this.formularioPreConsultaParametroByRol.bind(this)
	}

	componentWillMount() {
		this.props.mostrarPreConsulta(this.props.idPreConsulta)
	}

	formularioPreConsultaParametroByRol(datosToken, personalPre) {
		// let personal = datosToken.personal
		// let rol = removeAccents(.rol.descripcion)
		// let rol = 'medico'
		if(personalPre != null) {
			if(removeAccents(datosToken.rol.descripcion) == 'enfermeria' && datosToken.personal.id_personal == personalPre.personal.id_personal) {
				return <FormularioPreConsultaParametroContainer
							idPreConsulta={this.props.idPreConsulta}/>
			} else {
				return <span></span>
			}
		}
		// console.log('El ROL ES DESDE EL SERVER:'+this.props.usuarioEstado.datosToken.rol.descripcion)

		// if(rol == 'enfermeria') {
		// } else {
		// }

	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderPreConsulta(preConsulta) {
		let datosToken = null
		let personalPre = null

		let condition = (
			this.props.preConsulta != undefined && 
			this.props.usuarioEstado.datosToken.rol != null
		);

		if(condition) {
			datosToken = this.props.usuarioEstado.datosToken
			personalPre = this.props.preConsulta
		}

		if(preConsulta && preConsulta.personal !== undefined) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
					<p><strong>Enfermero/a:</strong>{ preConsulta.personal.nombres +' '+ preConsulta.personal.apellidos }</p>
					<p><strong>Fecha:</strong>{ preConsulta.preconsulta.fecha }</p>
					<p><strong>Nivel:</strong>{ preConsulta.nivel.descripcion }</p>				
				</div>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
					{ this.formularioPreConsultaParametroByRol(datosToken, personalPre) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {

		const { cargando, preConsulta, abierto } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
			this.props.eliminar.error
		// console.log(this.props.mostrar)
		
		return <div>
			{ this.renderCargando(cargando) }
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderPreConsulta(preConsulta) }
		</div>

	}
}

export default Mostrar