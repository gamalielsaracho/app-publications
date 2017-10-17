import React, { Component } from 'react'

import FormularioNombreMedicamentoContainer from '../Formulario'

class FieldSelectNombresMedicamentos extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando Nombres Comerciales..</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioNombreMedicamentoContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar nombre</option>
							{
								listar.nombresMedicamentos.map((nombre) => {
									return <option key={nombre.id_nombreMedicamento} value={nombre.id_nombreMedicamento}>
										{ nombre.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearNombreMedicamento} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo nombre
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectNombresMedicamentos