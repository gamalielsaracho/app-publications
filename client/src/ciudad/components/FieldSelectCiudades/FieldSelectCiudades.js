import React, { Component } from 'react'

class FieldSelectCiudades extends Component {
	render() {
		const { input, label, listaCiudades, type, meta: { touched, error, warning } } = this.props

		if(listaCiudades.ciudades) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Selecionar ciudad</option>
							{
								listaCiudades.ciudades.map((ciudad) => {
									return <option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
										{ ciudad.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearCiudad} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva Ciudad
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FieldSelectCiudades