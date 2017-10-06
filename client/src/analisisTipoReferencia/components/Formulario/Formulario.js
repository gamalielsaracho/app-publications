import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import  
	FieldSelectReferenciasContainer
from '../../../referencia/components/FieldSelectReferencias'

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

		this.renderFieldSelectParametrosPre = this.renderFieldSelectParametrosPre.bind(this)
		this.renderBtnCancelar = this.renderBtnCancelar.bind(this)
	}

	componentWillMount() {
		let paciente = this.props.analisisSolicitadoDatos.paciente

		this.props.listarReferenciasPorTipoAnalisisEdadYsexo(this.props.idTipoAnalisis, paciente.fechaNacimiento, paciente.sexo)
	}

	enviarFormulario(formProps) {

		// formProps.id_preconsulta = this.props.idPreConsulta
		
		// console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarAnalisisTipoReferencia(formProps)
		} else {

			this.props.crearAnalisisTipoReferencia(formProps)
		}
	}

	
	renderFieldSelectParametrosPre(listaParametros, paramentro) {
				// <Field name='id_parametroPreconsulta' type='text' 
				// 				component={FieldSelectParametrosPreContainer}
				// 				listaParametros={listaParametros} 
				// 				label='Paramentro'/>
		if(!this.props.editarContenido) {
			return <div>
				hola mundo
			</div>
		} else {
			return <p><strong>Paramentro:</strong> { paramentro.descripcion }</p>
		}
	}

	renderFormulario(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			const { handleSubmit, pristine, reset, submitting } = this.props		

			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-4 col-lg-8'>
						<h3>Select Option.</h3>
					</div>
					<div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
						<Field name='valor' type='text' component={renderField} label='Valor'/>
					</div>
				</div>
																	
				<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
				{ this.renderBtnCancelar() }
			</form>
		}
	}

	renderBtnCancelar() {
		if(this.props.editarContenido) {
			return <button type="button" onClick={ this.props.cerrarFormularioPreConsultaParametro } className="btn btn-primary btn-space">Cancelar</button>
		} else {
			return <span></span>
		}
	}

	render() {		
		const { 
			abirtoCrear, abirtoEditar, cargando, analisisTipoReferencia 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		// console.log(error)

		// let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		return <div>
			<div className='row'>
				<MensajeOerror error={error} mensaje={null}/>
			</div>

			<div className='row'>
				{ this.renderFormulario(cargando) }
			</div>

		</div>
	}
}

export default Formulario
