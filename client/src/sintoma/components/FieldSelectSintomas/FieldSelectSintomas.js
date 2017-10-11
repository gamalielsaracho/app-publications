import React, { Component } from 'react'

import FormularioSintomaContainer from '../Formulario'

class FieldSelectSintomas extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando síntomas</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
					
				<FormularioSintomaContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar síntoma</option>
							{
								listar.sintomas.map((sintoma) => {
									return <option key={sintoma.id_sintoma} value={sintoma.id_sintoma}>
										{ sintoma.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearSintoma} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo síntoma
					</button>

				    { touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectSintomas