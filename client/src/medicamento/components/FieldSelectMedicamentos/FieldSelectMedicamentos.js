import React, { Component } from 'react'

import FormularioMedicamentoContainer from '../Formulario'

class FieldSelectMedicamentos extends Component {
	constructor(props) {
		super(props)
		this.renderDetalleGral = this.renderDetalleGral.bind(this)
	}

	renderDetalleGral(i) {
		return <div>
			<br/>
			{
				i.drogas.map((d) => {
					return <div key={d.medicamentoDroga.id_medicamentoDroga}>
			        	<h4>{ ' '+ d.droga.descripcion +' '+ d.medicamentoDroga.descripcionProporcion +' | '}</h4>
			        </div>
				})
			}
		<br/>
		</div>
	}

	render() {
		const { input, label, listar, type, meta: { touched, error, warning } } = this.props

		let op = {
			'font-size':'20px'
		}

		if(listar.cargando) {
			return <p>Cargando medicamentos...</p>
		} else {
			// console.log(listar.medicamentos)
			
			return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<FormularioMedicamentoContainer/>
				
				<div className='form-inline'>
					<div className='form-group'>
						<select multiple {...input} name={name} className='form-control'>
							{
								listar.medicamentos.map((i) => {
									return <option style={op} key={i.medicamento.id_medicamento} value={i.medicamento.id_medicamento}>
										<p>
											{ 
											  i.nombreMedicamento.descripcion +' '+
							            	  i.medicamento.cantidadXunidad +' '+
							            	  i.presentacion.descripcion
			           			 			}
										</p>
									</option>
								})
							}
						</select>
					</div>

					<button type="button" onClick={this.props.abrirFormularioCrearMedicamento} className="btn btn-success btn-space btn-sm">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo medicamento
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		}
	}
}

export default FieldSelectMedicamentos