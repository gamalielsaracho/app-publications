import React, { Component } from 'react'

class FieldSelectDosis extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando...</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar dosis</option>
							{
								listar.listaDosis.map((dosis) => {
									return <option key={dosis.id_dosis} value={dosis.id_dosis}>
										{ dosis.valor }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearDosis} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva dosis
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectDosis