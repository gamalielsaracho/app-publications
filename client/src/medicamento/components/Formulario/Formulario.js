import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'


import
	FieldSelectFarmaceuticasContainer
from '../../../farmaceutica/components/FieldSelectFarmaceuticas'


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

	// componentWillUnmount() {
	// 	console.log("se desmonto Formulario.!")
	// }

	componentWillMount() {
		this.props.listarFarmaceuticasFuncion()
	}

	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarMedicamento(formProps)
		} else {
			this.props.crearMedicamento(formProps)
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
			posit: 'absolute',
			    top: '40px',
			    left: '0px',
			    right: '0px',
			    bottom: '40px',
			    border: '1px solid #ccc',
			    background: '#fff',
			    overflow: 'auto',
			    WebkitOverflowScrolling: 'touch',
			    borderRadius: '4px',
			    outline: 'none',
			    padding: '20px'
		  	}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props		
		
		const { 
			abirtoCrear, abirtoEditar, cargando, medicamento 
		} = this.props.formulario


		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario medicamento</h4>

					<MensajeOerror error={error} mensaje={null}/>
					<div className=''>
						{ this.renderCargando(cargando) }


						<form onSubmit={handleSubmit(this.enviarFormulario)}>																						
							<div className='row'>
								<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
									<Field name='id_farmaceutica'
										type='text' component={FieldSelectFarmaceuticasContainer}
										listar={this.props.listarFarmaceuticas}
										label='Farmacéutica'/>
								</div>
								<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
									<Field name='nombre' type='text' component={renderField} label='Nombre'/>
								</div>
								<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
									<Field name='observaciones' type='text' component={renderField} label='Descripción Gral.'/>
								</div>
							</div>

							<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
							<button type="button" onClick={ this.props.cerrarFormularioMedicamento } className="btn btn-primary btn-space">Cancelar</button>
						</form>
					</div>
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
