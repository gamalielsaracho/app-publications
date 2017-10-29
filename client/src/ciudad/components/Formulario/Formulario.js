import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import FieldSelectDepartamentosContainer from '../../../departamento/components/FieldSelectDepartamentos'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="form-group">
      <label htmlFor={label}>{ label }</label>
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
	}

	componentWillMount() {
		this.props.listarDepartamentosFuncion()
	}

	enviarFormulario(formProps) {
		if(this.props.editarContenido) {
			this.props.editarCiudad(formProps)
		} else {
			this.props.crearCiudad(formProps)
		}
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>

					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						<Field name='id_departamento' type='text' 
							component={FieldSelectDepartamentosContainer}
							listar={this.props.listarDepartamentos} 
							label='Departamento:'/>
							
						<Field name='descripcion' type='text' component={renderField} label='Descripción'/>
														
						<button type="submit" className='btn btn-info btn-space' disabled={pristine || submitting}>Guardar</button>
						<button type='button' onClick={ this.props.cerrarFormularioCiudad } className='btn btn-primary btn-space'>Cancelar</button>
					</form>
				</div>
			</div>
		}
	}


	render() {
		const customStyles = {
		    content : {
			    height: '50vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, ciudad 
		} = this.props.formulario


		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario ciudad</h4>

					<MensajeOerror error={error} mensaje={null}/>
					
					{ this.renderFormulario(cargando) }

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
