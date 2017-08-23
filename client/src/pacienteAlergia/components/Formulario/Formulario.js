import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectAlergiasContainer from '../../../alergia/components/FieldSelectAlergias'

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
		this.renderCargando = this.renderCargando.bind(this)
		this.renderFieldSelectAlergias = this.renderFieldSelectAlergias.bind(this)
	}

	componentWillMount() {
		this.props.listarAlergias()
	}

	enviarFormulario(formProps) {

		formProps.nroDocumento = this.props.nroDocumento
		formProps.id_tipoDocumento = this.props.id_tipoDocumento
		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPacienteAlergia(formProps)
		} else {

			this.props.crearPacienteAlergia(formProps)
		}
	}

	renderFieldSelectAlergias(listaAlergias, alergia) {
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_alergia' type='number' component={FieldSelectAlergiasContainer} listaAlergias={listaAlergias} label='Alergia'/>
			</div>
		} else {
			return <p><strong>Descripción:</strong> { alergia.descripcion }</p>
		}
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props		
		
		const { 
			abirtoCrear, abirtoEditar, cargando, alergia 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		console.log(error)

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							<MensajeOerror error={error} mensaje={null}/>
							{ this.renderCargando(cargando) }

							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								
								{ this.renderFieldSelectAlergias(this.props.listaAlergias, alergia) }
								<Field name='observaciones' type='text' component={renderField} label='Observaciones'/>
									
								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioPacienteAlergia } className="btn btn-primary btn-space">Cancelar</button>
								
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

export default Formulario
