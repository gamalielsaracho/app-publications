import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'

import { browserHistory } from 'react-router'

// LISTA DE PRE-CONSULTAS.
import FieldSelectPreConsultasContainer from '../../../preconsulta/components/FieldSelectPreConsultas'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class AnadirPreConsulta extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
	}

	componentWillMount() {
		let datosCita = this.props.datosCita

		this.props.listarPreConsultasFechaDiaFuncion(datosCita.cita.fecha, datosCita.paciente.id_paciente)
	}

	enviarFormulario(formProps) {
		// this.props.datosCita es pasado como property al ser llamdo dentro de 
		// MostarCitaContainer.

		let datosCita = this.props.datosCita

		formProps.id_cita = datosCita.cita.id_cita
		formProps.id_preconsulta = formProps.id_preconsulta[0]

		console.log(formProps)

		this.props.editarCitaIdPreConsultaField(formProps)

		this.props.cerrarModalListarPreConsultasFechaDia()
		browserHistory.push(`/dashboard/citas/${formProps.id_cita}/preconsulta/${formProps.id_preconsulta}`)
	}

	
	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props		
		const { abierto } = this.props.modalAgregarPreConsulta

		// console.log(this.props.listarPreConsultasFechaDia)
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>
					
					<div className='row'>
						<div className='col-xs-12 col-sm-10 col-md-10 col-lg-12'>
							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								<div className='form-group'>
									<label>Pre-consulta realizada en el día</label>
									<Field name='id_preconsulta' type='text'
										component={FieldSelectPreConsultasContainer} 
										listar={this.props.listarPreConsultasFechaDia} 
										label=''/>
								</div>

								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarModalListarPreConsultasFechaDia } className="btn btn-primary btn-space">Cancelar</button>
							</form>
						</div>
					</div>
					
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}	
	}
}

export default AnadirPreConsulta
