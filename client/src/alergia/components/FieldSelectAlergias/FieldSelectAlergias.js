import React, { Component } from 'react'

import FormularioContainer from '../../../alergia/components/Formulario'

class FieldSelectAlergias extends Component {

	render() {
		const { input, label, listaAlergias, type, meta: { touched, error, warning } } = this.props

		if(listaAlergias.alergias) {
			console.log(listaAlergias.alergias)

			return <div className='form-group'>

				{/*
					Se llama FormularioContainer Modal, para mostrar 
					y agregar una nueva alergia si no existe.
				*/}

				<FormularioContainer/>

				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Selecionar alergia</option>
							{
								listaAlergias.alergias.map((alergia) => {
									return <option key={alergia.id_alergia} value={alergia.id_alergia}>
										{ alergia.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearAlergia} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva Alergia
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FieldSelectAlergias