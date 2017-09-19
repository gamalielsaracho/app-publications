import React, { Component } from 'react'


import FormularioTipoConsumoContainer from '../Formulario'

class FieldSelectTiposConsumos extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando tipos..</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioTipoConsumoContainer/>
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar tipo de consumo</option>
							{
								listar.tiposConsumos.map((tipo) => {
									return <option key={tipo.id_tipoConsumo} value={tipo.id_tipoConsumo}>
										{ tipo.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearTipoConsumo} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo tipo
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectTiposConsumos