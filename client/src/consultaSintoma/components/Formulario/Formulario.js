import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'


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
		this.renderFieldSelectSintomas = this.renderFieldSelectSintomas.bind(this)
		this.renderBtnCancelar = this.renderBtnCancelar.bind(this)
	}

	componentWillMount() {
		this.props.listarSintomasFuncion()
	}

	enviarFormulario(formProps) {

		formProps.id_consulta = this.props.idConsulta
		
		console.log(formProps)

		// if(this.props.editarContenido) {
		// 	this.props.editarConsultaSintoma(formProps)
		// } else {
		// 	this.props.crearConsultaSintoma(formProps)
		// }
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

	renderBtnCancelar() {
		if(this.props.editarContenido) {
			return <button type="button" onClick={ this.props.cerrarFormularioConsultaSintoma } className="btn btn-primary btn-space">Cancelar</button>
		} else {
			return <span></span>
		}
	}

	renderFieldSelectSintomas(sintomaConsulta) {
		if(!this.props.editarContenido) {
				// <Field name='id_sintoma' type='text' 
				// 				component={}
				// 				listaParametros={} 
				// 				label='Síntoma'/>
			return <div>
				<h3>Select option (síntomas)</h3>
			</div>
		} else {
			return <p><strong>Síntoma:</strong> { sintomaConsulta.descripcion }</p>
		}
	}

	renderFormulario(cargando, sintomaConsulta) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
						{ this.renderFieldSelectSintomas(sintomaConsulta) }
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-4 col-lg-8'>
						<Field name='observaciones' type='textarea' component={this.renderFieldTextArea} label='Observaciones'/>
					</div>
				</div>
																	
				<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
				{ this.renderBtnCancelar() }
			</form>
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
			abirtoCrear, abirtoEditar, cargando, sintomaConsulta 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario síntomas</h4>

					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
					</div>
						
					<div className='row'>
						{ renderFormulario(cargando, sintomaConsulta) }
					</div>

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
