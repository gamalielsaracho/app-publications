import React, { Component } from 'react'

class FieldSelectPreConsultas extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { input, fechaCita, idPaciente, label, listaPreConsultas, type, meta: { touched, error, warning } } = this.props
	
		console.log(idPaciente+' idPaciente  -> FECHA CITA: '+fechaCita)
		let preConsultas = listaPreConsultas.preConsultas
	
		if(preConsultas) {

			// if(idPaciente != null && fechaCita != null) {
				preConsultas = preConsultas.filter((i) => {
					return i.preconsulta.fecha == fechaCita && 
					i.preconsulta.id_paciente == idPaciente
				})
			// }

			return <div>
				<div className='form-group'>
					<label htmlFor={label}>{label}</label>

					<button type="button" onClick={this.props.abrirFormularioCrearPreConsulta} className="btn btn-success btn-space">Nueva pre-consulta</button>

					<select multiple {...input} name={name} className='form-control'>
						{
							preConsultas.map((i) => {
								return <option key={i.preconsulta.id_preconsulta} value={i.preconsulta.id_preconsulta}>
									{ i.nivel.descripcion } 
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

}

export default FieldSelectPreConsultas