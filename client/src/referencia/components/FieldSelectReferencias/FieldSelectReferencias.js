import React, { Component } from 'react'


// import  from '../Formulario'

class FieldSelectReferencias extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		if(listar.cargando) {
			return <p>Cargando parametros..</p>
		} else {
			// console.log('LAS REFERENCIAS FILTRADAS...- >')
			// console.log(listar.referencias)
			
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>
							<option value=''>Seleccionar parametro</option>
							{
								listar.referencias.map((i) => {
									return <option key={i.ref.id_referencia} value={i.ref.id_referencia}>
										{ i.parametro.descripcion }
									</option>
								})
							}
						</select>
					</div>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
					// <button type="button" onClick={this.props.abrirFormularioCrearTipoConsumo} className="btn btn-success btn-space btn-sm">
					// 	<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo tipo
					// </button>
	}
}

export default FieldSelectReferencias