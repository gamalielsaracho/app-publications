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
		this.renderCargando = this.renderCargando.bind(this)
	}

	enviarFormulario(formProps) {
		if(this.props.editarContenido) {
			this.props.editarEspecialidad(formProps)
		} else {
			this.props.crearEspecialidad(formProps)
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
			abirtoCrear, abirtoEditar, cargando, especialidad 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario especialidad</h4>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							<MensajeOerror error={error} mensaje={null}/>
							{ this.renderCargando(cargando) }

							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								<Field name='descripcion' type='text' component={renderField} label='Descripción'/>
														
								<button type="submit" className='btn btn-info btn-space' disabled={pristine || submitting}>Guardar</button>
								<button type="button" className='btn btn-primary btn-space' onClick={ this.props.cerrarFormularioEspecialidad }>Cancelar</button>
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
