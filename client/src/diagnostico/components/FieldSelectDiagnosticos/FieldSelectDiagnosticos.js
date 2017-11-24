import React, { Component } from 'react'

import FormularioDiagnosticoContainer from '../Formulario'

import Cargando from '../../../app/components/Cargando'

class FieldSelectDiagnosticos extends Component {
	constructor(props) {
		super(props)
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
	}

	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearDiagnostico} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo diagnóstico
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
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando diagnósticos...
					</div>
				</div>
			</div>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
						
				<FormularioDiagnosticoContainer/>

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar diagnóstico</option>
							{
								listar.diagnosticos.map((diagnostico) => {
									return <option key={diagnostico.id_diagnostico} value={diagnostico.id_diagnostico}>
										{ diagnostico.descripcion }
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

export default FieldSelectDiagnosticos