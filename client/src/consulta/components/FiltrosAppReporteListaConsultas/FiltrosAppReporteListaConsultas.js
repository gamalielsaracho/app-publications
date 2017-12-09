import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import ReporteListaConsultasContainer from '../ReporteListaConsultas'

import FieldSelectNivelesContainer from '../../../nivel/components/FieldSelectNiveles'

import FiltrosConsultasContainer from '../Filtros'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control input-md" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class FiltrosAppReporteListaConsultas extends Component {
	constructor(props) {
		super(props)
		this.renderFormularioFiltros = this.renderFormularioFiltros.bind(this)
		
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		let idRol = this.personalLocalSt.id_rol

		if(this.props.urls.idPaciente) {
			this.props.listarConsultasPaciente(this.props.urls.idPaciente)
		} else {
			// 3 administración.
			// 1 médico.
			if(this.props.urls.idPreConsulta) {
				this.props.listarConsultasPreConsulta(this.props.urls.idPreConsulta)
			} else {
				this.props.reporteListarConsultas()
			}
		}
	}

	renderFormularioFiltros() {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		const { abierto } = this.props.formularioFiltro

		if(abierto) {
			return <FiltrosConsultasContainer 
				reset={reset}
				urls = { this.props.urls }/>
		} else {
			return <div className='no-print-data'>
				<br/>
				<div className='row'>
					<div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
						<button onClick={ this.props.abrirFormularioFiltro } className='btn btn-info'>Filtrar datos</button>
					</div>
				</div>
			</div> 
		}
	}


	render() {

		const { consultas, cargando, error } = this.props.listarReportes

		if(cargando) {
			return <Cargando/>
		} else {

			// console.log(consultas)

			let v = this.props.valoresFiltro
			let consultasFiltradas = consultas

			let condition = (
				v.fechaDesde.length > 0 || v.fechaHasta.length > 0 ||
				v.fecha.length > 0 || v.hora.length > 0 ||
				v.fechaProximaConsulta.length > 0 ||
				v.id_nivel.length > 0 || v.id_especialidad.length > 0 ||

				v.nroDocumento_paciente.length > 0 || v.id_tipoDocumento_paciente.length > 0 ||
				v.nombres_paciente.length > 0 || v.apellidos_paciente.length > 0 ||
				
				v.nroDocumento_medico.length > 0 || v.id_tipoDocumento_medico.length > 0 ||
				v.nombres_medico.length > 0 || v.apellidos_medico.length > 0
			)


			// para que No filtre por fecha si quiere filtrar por 
			// rango de fechas.
			if(v.fechaDesde.length > 0) {
				v.fecha = v.fechaDesde
			}

			if(!v.fechaHasta.length != 0) {
				v.fechaHasta = v.fechaDesde
			}

			
			if(condition){
				consultasFiltradas = this.props.consultasFiltradasEnGeneral(consultasFiltradas, v)
			}


			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderFormularioFiltros() }
 
				<ReporteListaConsultasContainer 
					consultasFiltradas={ consultasFiltradas }/>
			</div>
		}

	}
}

export default FiltrosAppReporteListaConsultas