import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectParametrosPreContainer from '../../../parametroPreConsulta/components/FieldSelectParametrosPre'

import FormularioParametroPreConsultaContainer from '../../../parametroPreConsulta/components/Formulario'

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

		this.renderFieldTextArea = this.renderFieldTextArea.bind(this)
		this.renderFieldSelectParametrosPre = this.renderFieldSelectParametrosPre.bind(this)
		this.renderBtnCancelar = this.renderBtnCancelar.bind(this)
	}

	componentWillMount() {
		this.props.listarParametrosPreConsulta()
	}

	enviarFormulario(formProps) {

		formProps.id_preconsulta = this.props.idPreConsulta
		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPreConsultaParametro(formProps)
		} else {

			this.props.crearPreConsultaParametro(formProps)
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

	renderFieldSelectParametrosPre(listaParametros, paramentro) {
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_parametroPreconsulta' type='text' 
								component={FieldSelectParametrosPreContainer}
								listaParametros={listaParametros} 
								label='Paramentro'/>
			</div>
		} else {
			return <p><strong>Paramentro:</strong> { paramentro.descripcion }</p>
		}
	}

	renderBtnCancelar() {
		if(this.props.editarContenido) {
			return <button type="button" onClick={ this.props.cerrarFormularioPreConsultaParametro } className="btn btn-primary btn-space">Cancelar</button>
		} else {
			return <span></span>
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
			abirtoCrear, abirtoEditar, cargando, parametroPreConsulta 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		console.log(error)

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		return <div>
			<div className='row'>
				<MensajeOerror error={error} mensaje={null}/>
				{ this.renderCargando(cargando) }
			</div>

			<div className='row'>

				<FormularioParametroPreConsultaContainer/>

				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-8'>
							{ this.renderFieldSelectParametrosPre(this.props.listaParametros, parametroPreConsulta) }
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
							<Field name='valor' type='text' component={renderField} label='Valor'/>
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
			</div>

		</div>
	}
}

export default Formulario
