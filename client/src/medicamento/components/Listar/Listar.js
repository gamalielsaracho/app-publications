import React, { Component } from 'react'
import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioMedicamentoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentos = this.renderMedicamentos.bind(this)
		this.renderFormularioMedicamento = this.renderFormularioMedicamento.bind(this)

	}


	componentWillMount() {
		this.props.listarMedicamentos()
	}

	renderFormularioMedicamento() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioMedicamentoContainer/>
		} else {
			return <span></span>
		}
	}

	shouldComponentUpdate(nextProps) {
		if((nextProps.medicamentos !== this.props.medicamentos) || (nextProps.formulario !==  this.props.formulario)) {
			return true
		}else {
			return false
		}
	}	

	renderMedicamentos(medicamentos) {
		// console.log(medicamentos)
		
		return <tbody>
			{
				medicamentos.map((i) => {
					return <tr key={i.medicamento.id_medicamento}>
			            <td>{ i.nombreMedicamento.descripcion +' '+
			            	  i.medicamento.cantidadXunidad +' '+
			            	  i.presentacion.descripcion
			            }</td>

			            <td>{ i.farmaceutica.nombre }</td>
			            <td>{ i.medicamento.observaciones }</td>
			            <td>
			            	<Link to={`/dashboard/medicamentos/${i.medicamento.id_medicamento}/drogas`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { medicamentos, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Medicamentos</h1>
					
					{ this.renderFormularioMedicamento() }

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearMedicamento } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Farmaceutica</th>
						        	<th>Observaciones</th>

						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderMedicamentos(medicamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar