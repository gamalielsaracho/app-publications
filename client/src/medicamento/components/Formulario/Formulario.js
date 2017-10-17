import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'


import
	FieldSelectFarmaceuticasContainer
from '../../../farmaceutica/components/FieldSelectFarmaceuticas'

import
	FieldSelectNombresMedicamentosContainer
from '../../../nombreMedicamento/components/FieldSelectNombresMedicamentos'

import
	FieldSelectPresentacionesContainer
from '../../../presentacion/components/FieldSelectPresentaciones'


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
	}

	// componentWillUnmount() {
	// 	console.log("se desmonto Formulario.!")
	// }

	componentWillMount() {
		this.props.listarFarmaceuticasFuncion()
		this.props.listarNombresMedicamentosFuncion()
		this.props.listarPresentacionesFuncion()
	}

	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarMedicamento(formProps)
		} else {
			this.props.crearMedicamento(formProps)
		}
	}


	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className=''>

				<form onSubmit={handleSubmit(this.enviarFormulario)}>																						
					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
							<Field name='id_farmaceutica'
								type='text' component={FieldSelectFarmaceuticasContainer}
								listar={this.props.listarFarmaceuticas}
								label='Farmacéutica'/>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
							<Field name='id_nombreMedicamento'
								type='text' component={FieldSelectNombresMedicamentosContainer}
								listar={this.props.listarNombresMedicamentos}
								label='Nombre comercial'/>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
							<Field name='id_presentacion'
								type='text' component={FieldSelectPresentacionesContainer}
								listar={this.props.listarPresentaciones}
								label='Presentación'/>
						</div>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
							<Field name='cantidadXunidad' type='text' component={renderField} label='Cantidad x unidad'/>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
							<Field name='observaciones' type='text' component={renderField} label='Observaciones'/>
						</div>
					</div>

					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioMedicamento } className="btn btn-primary btn-space">Cancelar</button>
				</form>
			</div>
		}
	}

	render() {
		const customStyles = {
		 //    content : {
			// posit: 'absolute',
			//     top: '40px',
			//     left: '0px',
			//     right: '0px',
			//     bottom: '40px',
			//     border: '1px solid #ccc',
			//     background: '#fff',
			//     overflow: 'auto',
			//     WebkitOverflowScrolling: 'touch',
			//     borderRadius: '4px',
			//     outline: 'none',
			//     padding: '20px'
		 //  	}
		 	content : {
		  		height: '50vh',
		  		position: 'none'
		  	}
		}
		
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
					
					{ this.renderFormulario(cargando) }
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
