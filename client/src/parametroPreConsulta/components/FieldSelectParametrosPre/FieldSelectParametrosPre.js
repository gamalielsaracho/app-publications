import React, { Component } from 'react'

class FieldSelectParametrosPre extends Component {
	render() {
		const { input, label, listaParametros, type, meta: { touched, error, warning } } = this.props

		let parametros = listaParametros.parametros

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

		if(parametros) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				<div className='form-inline'>
					<div className='form-group'>
						<select {...input} name={name} className='form-control'>

							<option value=''>Selecionar Parametro</option>
							
							{
								parametros.map((i) => {
									return <option key={i.id_parametroPreconsulta} value={i.id_parametroPreconsulta}>
										{ i.descripcion }
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearNivel} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo parametro
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default FieldSelectParametrosPre