import React, { Component } from 'react'

import FormularioParametroAnalisisContainer from '../Formulario'

class FieldSelectParametrosAnalisis extends Component {
	constructor(props) {
		super(props)
		this.renderParametroAnalisisFormulario = this.renderParametroAnalisisFormulario.bind(this)
	}

	renderParametroAnalisisFormulario() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioParametroAnalisisContainer/>
		} else {
			return <span></span>
		}
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.parametrosAnalisis !== this.props.parametrosAnalisis ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}

	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando parametros analisis</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>

				{ this.props.renderParametroAnalisisFormulario() }				

				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar parametro</option>
							{
								listar.parametrosAnalisis.map((parametro) => {
									return <option key={parametro.id_parametroAnalisis} value={parametro.id_parametroAnalisis}>
										{ parametro.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearParametroAnalisis} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo nivel
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectParametrosAnalisis