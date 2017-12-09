import React, { Component } from 'react'

class FieldSelectCiudades extends Component {
	constructor(props) {
		super(props)
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
	}


	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearCiudad} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nueva Ciudad
			</button>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, showBtnAdd, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando ciudades...
					</div>
				</div>
			</div>
		} else {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Selecionar ciudad</option>
							{
								listar.ciudades.map((i) => {
									return <option key={i.ciudad.id_ciudad} value={i.ciudad.id_ciudad}>
										{ i.ciudad.descripcion }
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

export default FieldSelectCiudades