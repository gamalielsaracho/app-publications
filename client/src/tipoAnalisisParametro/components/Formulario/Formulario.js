import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectParametrosAnalisisContainer from '../../../parametroAnalisis/components/FieldSelectParametrosAnalisis'

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
		this.props.listarParametrosAnalisisFuncion()
	}

	enviarFormulario(formProps) {
		
		// idTipoAnalisis es pasado como property al ser llamado
		// dentro de ListarTipoAnalisisParametrosContainer.
		formProps.id_tipoAnalisis = this.props.idTipoAnalisis
		
		this.props.crearTipoAnalisisParametro(formProps)
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

		// console.log(error)

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								<Field name='id_parametroAnalisis'type='text'
									component={FieldSelectParametrosAnalisisContainer} 
									listar={ this.props.listarParametrosAnalisis }
									label='Parametro'/>
																				
								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioTipoAnalisisParametro } className="btn btn-primary btn-space">Cancelar</button>
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
