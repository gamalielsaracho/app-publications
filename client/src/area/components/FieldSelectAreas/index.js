import React from 'react'

function FieldSelectAreas({ input, label, listaAreas, type, meta: { touched, error, warning } }) {
	if(listaAreas.areas) {
		return <div>
			<div className='form-group'>
				<label htmlFor={label}>{label}</label>
				<select {...input} name={name} className='form-control'>
					<option value=''>Selecionar area</option>
					{
						listaAreas.areas.map((area) => {
							return <option key={area.id_area} value={area.id_area}>
								{ area.descripcion }
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

export default FieldSelectAreas