import React, { Component } from 'react'

import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisis = this.renderAnalisis.bind(this)
		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)
		this.renderBtnsOpcionesCrud = this.renderBtnsOpcionesCrud.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		// idAnalisis es pasado como property al ser llamado.
		this.props.mostrarAnalisis(this.props.idAnalisis)
	}


	getEstadoHabilitado(i) {
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(i.ana.impreso) {
			desabilitado = true
		} else {
			desabilitado = false
		}

		// 3 administración.
		if(idRol == 3) {
			desabilitado = false
		}

		return desabilitado
	}


	renderBtnsOpcionesCrud(urlToRedirect, i) {
		let idRol = this.personalLocalSt.id_rol

		// 6 laboratorio.
		// 3 administración.
		if((idRol == 6) || (idRol == 3)) {
			return <div className=''>
				<button disabled={this.getEstadoHabilitado(i)} onClick={ 
					() => { this.props.eliminarAnalisis(urlToRedirect, i.ana.id_analisis) } } className='btn btn-danger btn-space'>
					Eliminar
				</button>				
			</div>
		} else {
			return <span></span>
		}
	}


	renderAnalisis(analisis, cargando) {
		let urlToRedirect = ``

		// urls es pasado como property al ser llamado dentro de MostrarApp.
		if(this.props.urls.idAnalisisSolicitado) {
			urlToRedirect = `/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}`
		} else if (this.props.urls.idConsulta) {
			urlToRedirect = `/dashboard/lista-analisis`
		}

		if(cargando) {
			return <Cargando/>
		} else if (analisis){

			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>	
					<p><strong>bioquímico/a:</strong>{ analisis.personal.nombres+' '+analisis.personal.apellidos }</p>
					<p><strong>Nro. Registro:</strong>{ analisis.personal.nroRegistro }</p>
					<p><strong>Correo:</strong>{ analisis.personal.correo }</p>
					<p><strong>Celular:</strong>{ analisis.personal.celular }</p>
				</div>

				{/*  */}
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>	
					{ this.renderBtnsOpcionesCrud(urlToRedirect, analisis) }
				</div>				
			</div>
		}
	}

	render() {
		const { cargando, analisis } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
			this.props.eliminar.error
		
		return <div>
			<MensajeOerror error={error} mensaje={null}/>
			<br/>
			{ this.renderAnalisis(analisis, cargando) }
		</div>
	}
}

export default Mostrar