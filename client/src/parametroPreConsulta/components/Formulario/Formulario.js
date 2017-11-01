import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectUnidadesParametroPreContainer from '../../../unidadParametroPre/components/FieldSelectUnidadesParametroPre'

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
		this.props.listarUnidadesParametroPreFuncion()
	}

	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarParametroPreConsulta(formProps)
		} else {
			this.props.crearParametroPreConsulta(formProps)
		}
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>

					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						<Field name='descripcion' type='text' component={renderField} label='Descripción'/>
								
						<Field name='id_unidadParametroPre' type='text' 
							listar={this.props.listarUnidadesParametroPre}
							component={FieldSelectUnidadesParametroPreContainer} 
							label='Unidad'/>
								
						<Field name='valorNormal' type='text' component={renderField} label='Valor normal'/>
						<Field name='valorAlto' type='text' component={renderField} label='Valor alto'/>
						<Field name='valorBajo' type='text' component={renderField} label='Valor bajo'/>
														
						<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
						<button type="button" onClick={ this.props.cerrarFormularioParametroPreConsulta } className="btn btn-primary btn-space">Cancelar</button>
					</form>

				</div>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '80vh',
		  		position: 'none'
		  	}
		}

		
		const { 
			abirtoCrear, abirtoEditar, cargando, parametroPreConsulta 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear
		// ..

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario parametro pre-consulta</h4>

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
