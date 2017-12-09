import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import ListarContainer from '../Listar'

import FieldSelectNivelesContainer from '../../../nivel/components/FieldSelectNiveles'

import FiltrosPacientesContainer from '../Filtros'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control input-md" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class FiltrosApp extends Component {
	constructor(props) {
		super(props)
		this.renderFormularioFiltros = this.renderFormularioFiltros.bind(this)
		
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarPacientes()
	}


	renderFormularioFiltros() {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		const { abierto } = this.props.formularioFiltro

		if(abierto) {
			return <FiltrosPacientesContainer 
				reset={reset}/>
		} else {
			return <div>
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

		const { pacientes, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
			

			let v = this.props.valoresFiltro
			let pacientesFiltrados = pacientes

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
				pacientesFiltrados = this.props.pacientesFiltradosEnGeneral(pacientesFiltrados, v)
			}


			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderFormularioFiltros() }
 
				<ListarContainer 
					pacientesFiltrados={ pacientesFiltrados }/>
			</div>
		}

	}
}

export default FiltrosApp