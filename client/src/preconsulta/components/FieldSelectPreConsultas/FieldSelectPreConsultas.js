import React, { Component } from 'react'

import FormularioPreConsultaContainer from '../Formulario'

class FieldSelectPreConsultas extends Component {
	constructor(props) {
		super(props)
		this.renderBtnNuevaPreConsulta = this.renderBtnNuevaPreConsulta.bind(this) 
	}

	renderBtnNuevaPreConsulta(preConsultas) {
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
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props
	
		// console.log(idPaciente+' idPaciente  -> FECHA CITA: '+fechaCita)
	
		if(listar.cargando) {
			return <p>Cargando...</p>
		} else {
			let preConsultas = listar.preConsultas

			return <div className='row'>
				<FormularioPreConsultaContainer
					datosCita={this.props.mostrarCita.cita}/>

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
					{ this.renderBtnNuevaPreConsulta(preConsultas) }
				</div>
			</div>
		}
	}

}

export default FieldSelectPreConsultas