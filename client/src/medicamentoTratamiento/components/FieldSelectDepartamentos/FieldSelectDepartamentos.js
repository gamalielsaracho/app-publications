// FieldSelectDepartamentos.js
import React, { Component } from 'react'

import FormularioDepartamentoContainer from '../Formulario'

class FieldSelectDepartamentos extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando...</p>
		} else {
			let departamentos = listar.departamentos

			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioDepartamentoContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar departamento</option>
							{
								departamentos.map((i) => {
									return <option key={i.id_departamento} value={i.id_departamento}>
										{ i.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearDepartamento} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo departamento
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectDepartamentos