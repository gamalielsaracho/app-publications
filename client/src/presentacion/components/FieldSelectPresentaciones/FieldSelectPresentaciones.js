import React, { Component } from 'react'

class FieldSelectPresentaciones extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando presentaciones...</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
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

					<button type="button" onClick={ () => { this.props.abrirFormularioCrearPresentacion() } } className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva presentación
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectPresentaciones