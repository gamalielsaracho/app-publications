import React, { Component } from 'react'

class FieldSelectPreConsultas extends Component {
	constructor(props) {
		super(props)
		this.renderBtnNuevaPreConsulta = this.renderBtnNuevaPreConsulta.bind(this) 
	}

	renderBtnNuevaPreConsulta(preConsultas, fechaCita) {
		// console.log(preConsultas)
		// Si la cantidad obtenida del array es distinto de 0.

		// fechaCita == new Date()
		if(!preConsultas.length) {
			return <div>
				<button type="button" onClick={this.props.abrirFormularioCrearPreConsulta} className="btn btn-success btn-space">
					<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva pre-consulta
				</button>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, fechaCita, idPaciente, label, listaPreConsultas, type, meta: { touched, error, warning } } = this.props
	
		// console.log(idPaciente+' idPaciente  -> FECHA CITA: '+fechaCita)
		let preConsultas = listaPreConsultas.preConsultas
	
		if(preConsultas) {

			// if(idPaciente != null && fechaCita != null) {
				preConsultas = preConsultas.filter((i) => {
					return i.preconsulta.fecha == fechaCita && 
					i.preconsulta.id_paciente == idPaciente
				})
			// }

			return <div className='row'>
				<label htmlFor={label}>{label}</label>
			
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>
					<div className='form-group'>
						<select multiple {...input} name={name} className='form-control'>
							{
								preConsultas.map((i) => {
									return <option key={i.preconsulta.id_preconsulta} value={i.preconsulta.id_preconsulta}>
										{ i.nivel.descripcion } 
									</option>
								})
							}
						</select>

						{ touched && ((error && <label className="text-danger text-center">{ error }</label>)) }
					</div>
				</div>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>
					{ this.renderBtnNuevaPreConsulta(preConsultas, fechaCita) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

}

export default FieldSelectPreConsultas