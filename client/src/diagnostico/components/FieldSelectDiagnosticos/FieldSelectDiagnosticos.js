import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'

class FieldSelectDiagnosticos extends Component {
	render() {
		const { input, label, listaDiagnosticos, type, meta: { touched, error, warning } } = this.props

		let diagnosticos = listaDiagnosticos.diagnosticos

		if(diagnosticos) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
					
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar diagnóstico</option>
							{
								diagnosticos.map((diagnostico) => {
									return <option key={diagnostico.id_diagnostico} value={diagnostico.id_diagnostico}>
										{ diagnostico.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearDiagnostico} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo diagnóstico
					</button>

				    { touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FieldSelectDiagnosticos