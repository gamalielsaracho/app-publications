import React, { Component } from 'react'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioMedicamentoDrogaContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentoDrogas = this.renderMedicamentoDrogas.bind(this)
		this.renderFormularioMedicamentoDroga = this.renderFormularioMedicamentoDroga.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// idMedicamento -> es sacado desde la url en el cual está parado.
	componentWillMount() {
		this.props.listarMedicamentoDrogas(this.props.urls.idMedicamento)
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.medicamentoDrogas !== this.props.medicamentoDrogas ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		} else {
			return false
		}
	}

	renderFormularioMedicamentoDroga() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioMedicamentoDrogaContainer
				idMedicamento = { this.props.urls.idMedicamento }/>
		} else {
			return <span></span>
		}
	}

	renderMedicamentoDrogas(medicamentoDrogas) {
		
		return <tbody>
			{
				medicamentoDrogas.map((i) => {
					return <tr key={i.medicamentoDroga.id_medicamentoDroga}>
			            <td>{ i.droga.descripcion }</td>
			            <td>{ i.medicamentoDroga.descripcionProporcion }</td>

			            <td>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarMedicamentoDroga(i.medicamentoDroga.id_medicamentoDroga) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarMedicamentoDroga(i.medicamentoDroga.id_medicamentoDroga) }} className="btn btn-danger btn-space">Eliminar</button>
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { medicamentoDrogas, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'>Drogas</h3>
											
					<MensajeOerror error={error} mensaje={null}/>
					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearMedicamentoDroga } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					{ this.renderFormularioMedicamentoDroga() }

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Observaciones</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderMedicamentoDrogas(medicamentoDrogas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar