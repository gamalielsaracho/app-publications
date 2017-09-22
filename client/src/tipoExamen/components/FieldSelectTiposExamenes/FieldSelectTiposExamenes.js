import React, { Component } from 'react'

import FormularioTipoExamenContainer from '../Formulario'

class FieldSelectTiposExamenes extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando tipos examenes...</p>
		} else {
			if(listar.tiposExamenes) {
				return <div className='form-group'>
					<label htmlFor={label}>{label}</label>
					
					<FormularioTipoExamenContainer/>

					<div className='form-inline'>
						<div className='form-group'>
							<select {...input} name={name} className='form-control'>
								<option value=''>Seleccionar tipo de examen</option>
								{
									listar.tiposExamenes.map((tipo) => {
										return <option key={tipo.id_tipoExamen} value={tipo.id_tipoExamen}>
											{ tipo.descripcion }
										</option>
									})
								}
							</select>
						</div>

						<button type="button" onClick={this.props.abrirFormularioCrearTipoExamen} className="btn btn-success btn-space btn-sm">
							<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo nivel
						</button>

				    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
					</div>
				</div>
			} else {
				return <span></span>
			}		
		}
	}
}

export default FieldSelectTiposExamenes