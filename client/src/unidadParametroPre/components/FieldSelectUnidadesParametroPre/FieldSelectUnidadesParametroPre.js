import React, { Component } from 'react'

import FormularioUnidadParametroPreContainer from '../Formulario'

class FieldSelectUnidadesParametroPre extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando..</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioUnidadParametroPreContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar Unidad de medida</option>
							{
								listar.unidadesParametroPre.map((unidad) => {
									return <option key={unidad.id_unidadParametroPre} value={unidad.id_unidadParametroPre}>
										{ unidad.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearUnidadParametroPre} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva medida
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectUnidadesParametroPre