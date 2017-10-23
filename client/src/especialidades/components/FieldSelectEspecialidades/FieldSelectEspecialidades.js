import React, { Component } from 'react'

import FormularioEspecialidadContainer from '../Formulario'

class FieldSelectEspecialidades extends Component {
	constructor(props) {
		super(props);
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
		// this.renderOption = this.renderOption.bind(this)
	}

	// renderOption() {

	// }

	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearEspecialidad} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Agregar
			</button>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, showBtnAdd, listar, type, 
			meta: { touched, error, warning } } = this.props


		if(listar.cargando) {
			return <p>Cargando especialidades...</p>
		} else {
			let especialidades = listar.especialidades


			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioEspecialidadContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
						<option value=''>Seleccionar especialidad</option>
						{
							especialidades.map((especialidad) => {
								return <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
									{ especialidad.descripcion }
								</option>
							})
						}
						</select>
					</div>

					{ this.renderBtnAdd(showBtnAdd) }

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectEspecialidades