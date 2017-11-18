import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import ListarPreConsultasContainer from '../Listar'

import FieldSelectNivelesContainer from '../../../nivel/components/FieldSelectNiveles'

import FiltrosPreConsultasContainer from '../Filtros'


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
	}

	componentWillMount() {
		this.props.listarPreConsultas()
	}

	renderFormularioFiltros() {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		const { abierto } = this.props.formularioFiltro

		if(abierto) {
			return <FiltrosPreConsultasContainer reset={reset}/>
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

		const { preConsultas, cargando, error } = this.props.listar		


		if(cargando) {
			return <Cargando/>
		} else {
			// console.log(preConsultas)

			let v = this.props.valoresFiltro
			let preConsultasFiltradas = preConsultas

			let condition = (
				v.fecha.length > 0 || v.hora.length > 0 || v.id_nivel.length > 0 ||
				
				v.nroDocumento_paciente.length > 0 || v.id_tipoDocumento_paciente.length > 0 ||
				v.nombres_paciente.length > 0 || v.apellidos_paciente.length > 0 ||
				
				v.nroDocumento_enfermera.length > 0 || v.id_tipoDocumento_enfermera.length > 0 ||
				v.nombres_enfermera.length > 0 || v.apellidos_enfermera.length > 0
			)

			if(condition){
				preConsultasFiltradas = this.props.preConsultasFiltradasPorValores(preConsultasFiltradas, v)
			}

			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderFormularioFiltros() }

				<ListarPreConsultasContainer 
					preConsultasFiltradas={ preConsultasFiltradas }/>
			</div>
		}

	}
}

export default FiltrosApp