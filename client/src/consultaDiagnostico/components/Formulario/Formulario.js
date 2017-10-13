import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectDiagnosticosContainer from '../../../diagnostico/components/FieldSelectDiagnosticos'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldTextArea = this.renderFieldTextArea.bind(this)
		this.renderFieldSelectDiagnosticos = this.renderFieldSelectDiagnosticos.bind(this)
	}

	componentWillMount() {
		this.props.listarDiagnosticosFuncion()
	}

	// this.props.urls es pasado como property al ser llamado dentro de
	// ListarConsultaDiagnosticosContainer, para obtener los parametros
	// del la url.
	enviarFormulario(formProps) {
		formProps.id_consulta = this.props.urls.idConsulta
		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarConsultaDiagnostico(formProps)
		} else {
			this.props.crearConsultaDiagnostico(formProps)
		}
	}

	renderFieldTextArea({ input, label, type, meta: { touched, error, warning } }) {
		return <div>
			<div className="form-group">
			 	<label htmlFor={label}>{label}</label>
		    	<textarea className="form-control" {...input} placeholder={label} type={type}>
		    	</textarea>
			</div>
		    { touched && ((error && <label className="text-danger">{ error }</label>)) }
		</div>
	}


	renderFieldSelectDiagnosticos(listarDiagnosticos, consultaDiagnostico) {
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_diagnostico' type='text' 
					component={FieldSelectDiagnosticosContainer}
					listar={listarDiagnosticos} 
					label='Diagnóstico'/>
			</div>
		} else {
			return <p><strong>Síntoma:</strong> { consultaDiagnostico.descripcion }</p>
		}
	}


	renderFormulario(cargando, consultaDiagnostico) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			// console.log(consultaDiagnostico)
			return <div className='row'>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						{ this.renderFieldSelectDiagnosticos(this.props.listarDiagnosticos, consultaDiagnostico) }
					</div>

					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						<Field name='observaciones' type='textarea' component={this.renderFieldTextArea} label='Observaciones'/>
					</div>
																		
					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioConsultaDiagnostico } className="btn btn-primary btn-space">Cancelar</button>
				</form>
			</div>
		}
	}


	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, consultaDiagnostico 
		} = this.props.formulario

		// console.log(this.props.formulario)
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		console.log(error)

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear


		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario diagnósticos</h4>

					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
					</div>

					{ this.renderFormulario(cargando, consultaDiagnostico) }				

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
