import React, { Component } from 'react'

import FormularioNivelContainer from '../Formulario'

class FieldSelectNiveles extends Component {
	constructor(props) {
		super(props)
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
	}

	
	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearNivel} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo nivel
			</button>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, showBtnAdd, listar, type, meta: { touched, error, warning } } = this.props

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
				
				<FormularioNivelContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar nivel</option>
							{
								listar.niveles.map((nivel) => {
									return <option key={nivel.id_nivel} value={nivel.id_nivel}>
										{ nivel.descripcion }
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

export default FieldSelectNiveles