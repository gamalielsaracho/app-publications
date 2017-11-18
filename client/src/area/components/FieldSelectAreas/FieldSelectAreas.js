import React, { Component } from 'react'

import FormularioAreaContainer from '../Formulario'

class FieldSelectAreas extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando areas...
					</div>
				</div>
			</div>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>

				<FormularioAreaContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Selecionar area</option>
							{
								listar.areas.map((area) => {
									return <option key={area.id_area} value={area.id_area}>
										{ area.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearArea} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva area
					</button>

			   		{ touched && ((error && <label className="text-danger text-center">{ error }</label>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectAreas