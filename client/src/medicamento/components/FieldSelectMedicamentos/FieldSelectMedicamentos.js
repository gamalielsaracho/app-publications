import React, { Component } from 'react'

import FormularioMedicamentoContainer from '../Formulario'

class FieldSelectMedicamentos extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando...</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioMedicamentoContainer/>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar medicamento</option>
							{
								listar.medicamentos.map((i) => {
									return <option key={i.medicamento.id_medicamento} value={i.medicamento.id_medicamento}>
										{ i.nombreMedicamento.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearMedicamento} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo medicamento
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectMedicamentos