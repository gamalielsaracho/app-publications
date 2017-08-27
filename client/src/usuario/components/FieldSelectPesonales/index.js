import React from 'react'

function FieldSelectPesonales({ input, filterBy, label, listaPesonales, type, meta: { touched, error, warning } }) {
	let personales = listaPesonales.personales
	
	if(personales) {
		if(filterBy != null) { // Si no es null, Filtra.
			personales = personales.filter((i) => {
					return i.rol.descripcion.toLowerCase().match(filterBy)
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
	} else {
		return <span></span>
	}
}

export default FieldSelectPesonales