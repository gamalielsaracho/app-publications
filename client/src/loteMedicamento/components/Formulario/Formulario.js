import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectMedicamentosContainer from '../../../medicamento/components/FieldSelectMedicamentos'
import FieldSelectProveedoresContainer from '../../../proveedor/components/FieldSelectProveedores'

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

	componentWillMount() {
		this.props.listarMedicamentosFuncion()
		this.props.listarProveedoresFuncion()
	}

	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarLoteMedicamento(formProps)
		} else {
			formProps.fecha = new Date()
			this.props.crearLoteMedicamento(formProps)
		}
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props

		if(cargando) {
			return <Cargando/>
		} else {
			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>							
						<Field name='id_medicamento'
							type='text' component={FieldSelectMedicamentosContainer} 
							listar={this.props.listarMedicamentos}
							label='Medicamento'/>
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-2'>							
						<Field name='numeroLote' type='text' component={renderField} label='Nro. Lote'/>
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-2'>							
						<Field name='fechaVencimiento' type='date' component={renderField} label='Fecha de vencimiento'/>
					</div>		
				</div>
						
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3'>							
						<Field name='cantidadRecibida' type='text' component={renderField} label='Cantidad recibida'/>
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>							
						<Field name='id_proveedor'
							type='text' component={FieldSelectProveedoresContainer}
							listar={this.props.listarProveedores}
							label='Proveedor'/>
					</div>		
				</div>
														
				<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
				<button type="button" onClick={ this.props.cerrarFormularioLoteMedicamento } className="btn btn-primary btn-space">Cancelar</button>
			</form>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: 'auto',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, loteMedicamento 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario lote</h4>

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
