import React, { Component } from 'react'

class FieldSelectParametrosPre extends Component {
	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		// let parametrosPreConsulta = this.props.listarPreConsultaParametros.parametrosPreConsulta
		// console.log('this.props.listarPreConsultaParametros')
		// console.log(parametrosPreConsulta)
		
		// if(parametrosPreConsulta != undefined) {
		// 	parametrosPreConsulta.map((i) => {
		// 		parametros = parametros.filter((j) => {
		// 			return j.id_parametroPreconsulta != i.parametro.id_parametroPreconsulta
		// 		})
		// 	})
		// }

		if(listar.cargando) {
			return <p>Cargando..</p>
		} else {
			let parametros = listar.parametros

			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>

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