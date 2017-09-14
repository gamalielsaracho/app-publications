import React, { Component } from 'react'

class FieldSelectNiveles extends Component {
	render() {
		const { input, label, listaNiveles, type, meta: { touched, error, warning } } = this.props

		if(listaNiveles.niveles) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar nivel</option>
							{
								listaNiveles.niveles.map((nivel) => {
									return <option key={nivel.id_nivel} value={nivel.id_nivel}>
										{ nivel.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearNivel} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo nivel
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FieldSelectNiveles