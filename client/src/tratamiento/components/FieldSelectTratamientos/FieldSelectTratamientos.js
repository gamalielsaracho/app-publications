import React, { Component } from 'react'

class FieldSelectTratamientos extends Component {
	constructor(props) {
		super(props)
	}


	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando niveles...
					</div>
				</div>
			</div>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar tratamiento</option>
							{
								listar.tratamientos.map((t) => {
									return <option key={t.id_tratamiento} value={t.id_tratamiento}>
										{ t.id_tratamiento }
									</option>
								})
							}
						</select>
					</div>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectTratamientos