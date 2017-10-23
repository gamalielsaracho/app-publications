import React, { Component } from 'react'

class FieldSelectPacientes extends Component {
	constructor(props) {
		super(props)
		this.renderMensajeNoExistente = this.renderMensajeNoExistente.bind(this) 
	}

	renderMensajeNoExistente(pacientes) {
		if(pacientes.length == 0) {
			return <h4>No existente.</h4>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, listar, valoresFiltro, type, meta: { touched, error, warning } } = this.props


		if(listar.cargando) {
			return <p>Cargando Pacientes..</p>
		} else {
			let pacientes = listar.pacientes
			let v = valoresFiltro

		// ..
			if(v !== null) {
				let data = { // Condiciones.
					nroDocumento: v.nroDocumento.trim().toLowerCase(),
					nombres: v.nombres.trim().toLowerCase(),
					apellidos: v.apellidos.trim().toLowerCase(),
				}

				let condition = (
					data.nombres.length > 0 ||
					data.apellidos.length > 0 ||
					data.nroDocumento.length > 0
				)

				if(condition){
					pacientes = pacientes.filter((i) => {
	 					return i.pa.nroDocumento.toString().match(data.nroDocumento) &&
		 					i.pa.nombres.toString().match(data.nombres) &&
		 					i.pa.apellidos.toString().match(data.apellidos)
					})
				}
			}


			return (<div>
				<div className='form-group'>
					<label htmlFor={label}>{label}</label>

					{ this.renderMensajeNoExistente(pacientes) }

					<select multiple {...input} name={name} className='form-control'>
						{
							pacientes.map((i) => {
								return <option key={i.pa.id_paciente} value={i.pa.id_paciente}>
									{ i.pa.nroDocumento+' | '+i.tipoDocumento.descripcion+' | '+i.pa.nombres+' '+i.pa.apellidos }
								</option>
							})
						}
					</select>
				</div>

			    { touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
			</div>)
		}
	}
}

export default FieldSelectPacientes