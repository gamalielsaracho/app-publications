import React, { Component } from 'react'

import FormularioParametroPreConsultaContainer from '../../../parametroPreConsulta/components/Formulario'

class FieldSelectParametrosPre extends Component {
	constructor(props) {
		super(props)
		this.renderFormularioParametroPreConsulta = this.renderFormularioParametroPreConsulta.bind(this)
	}

	renderFormularioParametroPreConsulta() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioParametroPreConsultaContainer/>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props


		if(listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando parametros...
					</div>
				</div>
			</div>
		} else {
			let parametros = listar.parametros

			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>

				{ this.renderFormularioParametroPreConsulta() }

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>

							<option value=''>Seleccionar Parametro</option>
							
							{
								parametros.map((i) => {
									return <option key={i.parametro.id_parametroPreconsulta} value={i.parametro.id_parametroPreconsulta}>
										{ i.parametro.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearParametroPreConsulta} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo parametro
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectParametrosPre