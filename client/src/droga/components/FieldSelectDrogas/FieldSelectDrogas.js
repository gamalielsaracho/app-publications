import React, { Component } from 'react'

import FormularioDrogaContainer from '../Formulario'

class FieldSelectDrogas extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando...</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>

				<FormularioDrogaContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar droga</option>
							{
								listar.drogas.map((droga) => {
									return <option key={droga.id_droga} value={droga.id_droga}>
										{ droga.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearDroga} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva droga
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectDrogas