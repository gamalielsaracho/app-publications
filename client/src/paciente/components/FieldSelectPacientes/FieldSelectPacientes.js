import React, { Component } from 'react'

import FormularioPacienteContainer from '../Formulario'

class FieldSelectPacientes extends Component {
	constructor(props) {
		super(props)
		this.renderMensajeNoExistente = this.renderMensajeNoExistente.bind(this) 
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
		this.renderFormularioPaciente = this.renderFormularioPaciente.bind(this) 
	}

	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearPaciente} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo paciente
			</button>
		} else {
			return <span></span>
		}
	}


	renderMensajeNoExistente(pacientes) {
		if(pacientes.length == 0) {
			return <h4>No existente.</h4>
		} else {
			return <span></span>
		}
	}

	renderFormularioPaciente() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			// console.log('RENDER DE FormularioPaciente')
			return <FormularioPacienteContainer/>
		} else {
			// console.log('No RENDER DE FormularioPaciente')

			return <span></span>
		}
	}
	

	render() {
		const { input, label, showBtnAdd, listar, valoresFiltro, type, meta: { touched, error, warning } } = this.props


		if(listar.cargando) {
			return <div className='form-group'>
				<br/>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando Pacientes...
					</div>
				</div>
			</div>
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
					{ this.renderBtnAdd(showBtnAdd) }
					<br/>
					<label htmlFor={label}>{label}</label>

					{ this.renderMensajeNoExistente(pacientes) }
					{ this.renderFormularioPaciente() }

					<select multiple {...input} name={name} className='form-control'>
						{
							pacientes.map((i) => {
								return <option key={i.pa.id_paciente} value={i.pa.id_paciente}>
									{ i.pa.nroDocumento+' | '+i.tipoDocumento.descripcion+' | '+i.pa.nombres+' '+i.pa.apellidos+' | '+i.pa.sexo }
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