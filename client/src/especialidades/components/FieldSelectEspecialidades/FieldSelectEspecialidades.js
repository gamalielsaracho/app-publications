import React from 'react'

function FieldSelectEspecialidades({ input, label, listaEspecialidades, type, meta: { touched, error, warning } }) {
	if(listaEspecialidades.especialidades) {
		return <div>
			<div className='form-group'>
				<label htmlFor={label}>{label}</label>
				<select {...input} name={name} className='form-control'>
					<option value=''>Selecionar especialidad</option>
					{
						listaEspecialidades.especialidades.map((especialidad) => {
							return <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
								{ especialidad.descripcion }
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

export default FieldSelectEspecialidades