import React, { Component } from 'react'

class FieldSelectFarmaceuticas extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando farmacéuticas...</p>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar farmacéutica</option>
							{
								listar.farmaceuticas.map((farmaceutica) => {
									return <option key={farmaceutica.id_farmaceutica} value={farmaceutica.id_farmaceutica}>
										{ farmaceutica.nombre }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearFarmaceutica} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva farmacéutica
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectFarmaceuticas