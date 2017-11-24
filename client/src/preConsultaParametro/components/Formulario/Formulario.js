import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectParametrosPreContainer from '../../../parametroPreConsulta/components/FieldSelectParametrosPre'


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
		this.renderFieldSelectParametrosPre = this.renderFieldSelectParametrosPre.bind(this)
		this.renderBtnCancelar = this.renderBtnCancelar.bind(this)
	}

	componentWillMount() {
		this.props.listarParametrosPreConsultaFuncion()
	}

	enviarFormulario(formProps) {

		formProps.id_preconsulta = this.props.idPreConsulta
		
		// console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPreConsultaParametro(formProps)
		} else {

			this.props.crearPreConsultaParametro(formProps)
		}
	}

	renderFormulario(cargando, parametroPreConsulta) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else if(parametroPreConsulta) {
			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-8 col-lg-8'>
						{ this.renderFieldSelectParametrosPre(this.props.listarParametrosPreConsulta, parametroPreConsulta) }
					</div>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<Field name='valor' type='text' component={renderField} label='Valor'/>
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-8 col-lg-8'>
						<Field name='observaciones' type='textarea' component={this.renderFieldTextArea} label='Observaciones'/>
					</div>
				</div>
																	
				<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
				{ this.renderBtnCancelar() }
			</form>
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
								listar={listaParametros} 
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


	render() {
		
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, parametroPreConsulta 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		console.log(error)

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		return <div>
			<MensajeOerror error={error} mensaje={null}/>

			<div className=''>

				{ this.renderFormulario(cargando, parametroPreConsulta) }
			</div>

		</div>
	}
}

export default Formulario
