import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectTiposAnalisisContainer from '../../../tipoAnalisis/components/FieldSelectTiposAnalisis'

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
// 	<div className="form-group">
// 	 	<label htmlFor={label}>{label}</label>
//     	<input className="form-control" {...input} placeholder={label} type={type}/>
// 	</div>
//     { touched && ((error && <label className="text-danger">{ error }</label>)) }
//   </div>
// )

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
	}

	componentWillMount() {
		this.props.listarTiposAnalisisFuncion()
	}

	enviarFormulario(formProps) {

		formProps.id_analisisSolicitado = this.props.idAnalisisSolicitado
		
		// console.log(formProps)

		this.props.crearAnalisisSolicitadoTipo(formProps)
	}

	render() {

		const { handleSubmit, pristine, reset, submitting } = this.props		
				
		let error = this.props.crear.error

		// console.log(error)

		return <div>
			<div className='row'>
				<MensajeOerror error={error} mensaje={null}/>
			</div>
			<br/>
			<div className='row'>
				<form onSubmit={handleSubmit(this.enviarFormulario)} className='form-inline'>
					<div className='form-group'>
						<Field name='id_tipoAnalisis' type='text' 
							component={FieldSelectTiposAnalisisContainer} 
							listar={this.props.listarTiposAnalisis}
							label=''/>
					</div>
					<div className='form-group'>
						<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					</div>
				</form>
			</div>

		</div>
	}
}

export default Formulario
