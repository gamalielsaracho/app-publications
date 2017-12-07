import React, { Component } from 'react'

import FormularioPresentacionContainer from '../Formulario'

class FieldSelectPresentaciones extends Component {
	constructor(props) {
		super(props)
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
	}

	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={ () => { this.props.abrirFormularioCrearPresentacion() } } className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva presentación
			</button>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, listar, showBtnAdd, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando presentaciones...
					</div>
				</div>
			</div>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioPresentacionContainer/>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar presentación</option>
							{
								listar.presentaciones.map((presentacion) => {
									return <option key={presentacion.id_presentacion} value={presentacion.id_presentacion}>
										{ presentacion.descripcion }
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

export default FieldSelectPresentaciones