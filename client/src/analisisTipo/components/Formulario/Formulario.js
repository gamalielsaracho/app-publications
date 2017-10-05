import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectTiposAnalisisContainer from '../../../tipoAnalisis/components/FieldSelectTiposAnalisis'

// import FormularioParametroPreConsultaContainer from '../../../parametroPreConsulta/components/Formulario'

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
	}

	componentWillMount() {
		this.props.listarTiposAnalisisFuncion()
	}

	enviarFormulario(formProps) {

		// urls es pasado como property al ser llamado.
		formProps.id_analisis = this.props.urls.idAnalisis
		
		console.log(formProps)

		this.props.crearAnalisisTipo(formProps)
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
			abirtoCrear 
		} = this.props.formulario
		
		let error = this.props.crear.error ? this.props.crear.error : '' 

		// console.log(error)

		if(abirtoCrear) {
			return <ReactModal isOpen={abirtoCrear}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario tipo de análisis</h4>

					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<MensajeOerror error={error} mensaje={null}/>

							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								
								<Field name='id_tipoAnalisis' type='text'
									component={FieldSelectTiposAnalisisContainer}
									listar={this.props.listarTiposAnalisis}
									label='Tipos de análisis'/>
														
								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioAnalisisTipo } className="btn btn-primary btn-space">Cancelar</button>
								
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
