import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectDrogasContainer from '../../../droga/components/FieldSelectDrogas'

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
		this.renderFieldSelectDrogas = this.renderFieldSelectDrogas.bind(this)
	}

	componentWillMount() {
		this.props.listarDrogasFuncion()
	}

	enviarFormulario(formProps) {

		formProps.id_medicamento = this.props.idMedicamento
		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarMedicamentoDroga(formProps)
		} else {
			this.props.crearMedicamentoDroga(formProps)
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


	renderFieldSelectDrogas(medicamentoDroga) {
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_droga' type='text' 
					component={FieldSelectDrogasContainer}
					listar={this.props.listarDrogas} 
					label='Droga'/>
			</div>
		} else {
			return <p><strong>Droga:</strong> { medicamentoDroga.descripcion }</p>
		}
	}

	renderFormulario(cargando, medicamentoDroga) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						{ this.renderFieldSelectDrogas(medicamentoDroga) }
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						<Field name='descripcionProporcion' type='textarea' component={this.renderFieldTextArea} label='Observaciones'/>
					</div>
																		
					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioMedicamentoDroga } className="btn btn-primary btn-space">Cancelar</button>

				</form>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '45vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, medicamentoDroga 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear
		// console.log(this.props.formulario)
		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario Drogas</h4>

					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
					</div>

					{ this.renderFormulario(cargando, medicamentoDroga) }

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
