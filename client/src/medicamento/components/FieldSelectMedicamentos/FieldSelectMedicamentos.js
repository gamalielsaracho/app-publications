import React, { Component } from 'react'

import FormularioMedicamentoContainer from '../Formulario'

class FieldSelectMedicamentos extends Component {
	constructor(props) {
		super(props)
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
	}


	renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearMedicamento} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo medicamento
			</button>
		} else {
			return <span></span>
		}
	}

	render() {
		const { input, label, listar, valoresFiltro, showBtnAdd, type, meta: { touched, error, warning } } = this.props

		let op = {
			'font-size':'20px'
		}

		console.log(listar)

		if(listar.cargando) {
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando medicamentos...
					</div>
				</div>
			</div>
		} else {
			// console.log(listar.medicamentos)
			let medicamentos = listar.medicamentos
			let v = valoresFiltro

			// ..
			if(v !== null) {
				let data = { 
					id_presentacion: v.id_presentacion,
					// nombres: v.nombres.trim().toLowerCase(),
					// apellidos: v.apellidos.trim().toLowerCase(),
				}

				// Condiciones.
				let condition = (
					data.id_presentacion.length > 0 
					// data.apellidos.length > 0 ||
					// data.nroDocumento.length > 0
				)

				if(condition){
					medicamentos = medicamentos.filter((i) => {
	 					return i.medicamento.id_presentacion.toString().match(data.id_presentacion)					
	 				})
				}
			}

			console.log('LOS MEDICAMENTOS SON -------->')
			console.log(medicamentos)
			
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioMedicamentoContainer/>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select multiple {...input} name={name} className='form-control'>
							{
								medicamentos.map((i) => {
									return <option style={op} key={i.medicamento.id_medicamento} value={i.medicamento.id_medicamento}>
										<p>
											{ 
											  i.nombreMedicamento.descripcion +' | '+
							            	  i.presentacion.descripcion
			           			 			}
										</p>
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

export default FieldSelectMedicamentos