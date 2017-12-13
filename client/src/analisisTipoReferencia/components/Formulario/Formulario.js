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
		// analisisSolicitadoDatos es pasado como property al ser llamado dentro
		// de MostarAnalisisTipoContainer.
		let paciente = this.props.analisisSolicitadoDatos.paciente

		this.props.listarReferenciasPorTipoAnalisisEdadYsexo(this.props.idTipoAnalisis, paciente.fechaNacimiento, paciente.sexo)
	}

	enviarFormulario(formProps) {

		formProps.id_tipoAnalisis = this.props.idTipoAnalisis
		formProps.id_analisisTipo = this.props.urls.idAnalisisTipo
		formProps.id_analisis = this.props.urls.idAnalisis

		// urls es parasado como property al ser llamado 
		// dentro de MostarAnalisisTipoContainer. 

		// console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarAnalisisTipoReferencia(formProps)
		} else {

			this.props.crearAnalisisTipoReferencia(formProps)
		}
	}

	
	renderFieldSelectParametrosPre(listarReferencias, dato) {
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_referencia' type='text' 
					component={FieldSelectReferenciasContainer}
					listar={listarReferencias} 
					label='Paramentros'/>
			</div>
		} else {
			if(dato) {
				// console.log(dato)
				return <p><strong>Paramentro:</strong>{ dato.descripcion }</p>
			} else {
				return <span></span>
			}
		}
	}

	renderFormulario(cargando, analisisTipoReferencia) {
		if(cargando) {
			return <Cargando/>
		} else {
			const { handleSubmit, pristine, reset, submitting } = this.props		

			return <div className='container'>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='row'>
						<div className='col-xs-12 col-sm-5 col-md-5 col-lg-7'>
							{ this.renderFieldSelectParametrosPre(this.props.listarReferenciasFiltradas, analisisTipoReferencia) }
						</div>
						<div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
							<Field name='valor' type='number' component={renderField} label='Resultado'/>
						</div>
					</div>
																		
					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					{ this.renderBtnCancelar() }
				</form>
			</div>
		}
	}

	renderBtnCancelar() {
		if(this.props.editarContenido) {
			return <button type="button" onClick={ this.props.cerrarFormularioAnalisisTipoReferencia } className="btn btn-primary btn-space">Cancelar</button>
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
			<MensajeOerror error={error} mensaje={null}/>

			<div className='row'>
				{ this.renderFormulario(cargando, analisisTipoReferencia) }
			</div>

		</div>
	}
}

export default Formulario
