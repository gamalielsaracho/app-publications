import React, { Component } from 'react'

class FieldSelectTiposAnalisis extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando...</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>

				<select {...input} name={name} className='form-control'>
					<option value=''>Seleccionar Tipo de análisis</option>
					{
						listar.tiposAnalisis.map((tipo) => {
							return <option key={tipo.id_tipoAnalisis} value={tipo.id_tipoAnalisis}>
								{ tipo.descripcion }
							</option>
						})
					}
				</select>

			    { touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
			</div>
		}
	}
}

export default FieldSelectTiposAnalisis