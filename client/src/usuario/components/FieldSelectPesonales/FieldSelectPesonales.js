import React, { Component } from 'react'

class FieldSelectPesonales extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { input, valoresFiltro, label, listar, 
			type, meta: { touched, error, warning } } = this.props
			
	
		if(listar.cargando) {
			return <p>Cargando Personales..</p>
		} else {
			// ...
			let personales = listar.personales

			console.log(personales)

			if(valoresFiltro != null) {
				personales = personales.filter((i) => {
					return i.especialidad.id_especialidad == valoresFiltro.id_especialidad
				})
			}

			return <div>
				<div className='form-group'>
					<label htmlFor={label}>{label}</label>
					<select multiple {...input} name={name} className='form-control'>
						{
							personales.map((i) => {
								return <option key={i.personal.id_personal} value={i.personal.id_personal}>
									{ i.personal.nombres } 
								</option>
							})
						}
					</select>
				</div>
			   	{ touched && ((error && <label className="text-danger text-center">{ error }</label>)) }
			</div>
		}
	}
}

export default FieldSelectPesonales