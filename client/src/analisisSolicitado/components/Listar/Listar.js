import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisSolicitados = this.renderAnalisisSolicitados.bind(this)
		this.renderEstado = this.renderEstado.bind(this)
	}

	componentWillMount() {
		if(this.props.urls.idPaciente) {
			this.props.listarAnalisisSolicitadosPorIdPaciente(this.props.urls.idPaciente)
		} else {
			this.props.listarAnalisisSolicitados()
		}
	}

	renderEstado(pendiente) {
		if(pendiente) {
			return <p>Pendiente</p>
		} else {
			return <p>Realizado</p>
		}
	}

	renderAnalisisSolicitados(analisisSolicitados) {
		let dataUrl = ''

		// Esto es para ver verificar los parametros y así poder 
		// redireccionar en una url en específico deacuerdo en donde 
		// esté parado el usuario.
		
		if(this.props.urls.idPaciente) {
			dataUrl = `/dashboard/pacientes/${this.props.urls.idPaciente}/solicitudes-laboratorio`
		} else {
			dataUrl = `/dashboard/solicitudes-laboratorio`
		}
		// console.log(analisisSolicitados)
		// if(analisisSolicitados) {
			// <button type="button" onClick={() => { this.props.mostrarParametroAnalisis(i.parametro.id_parametroAnalisis) }} className="btn btn-info btn-space">Mostrar</button>
			
			return <tbody>
				{
					analisisSolicitados.map((i) => {
						return <tr key={i.analisisSolicitado.id_analisisSolicitado}>
				            <td>{ i.analisisSolicitado.id_analisisSolicitado }</td>
				            <td>{ moment(i.analisisSolicitado.fechaArealizar).format('LL') }</td>
				            <td>
				            	{ this.renderEstado(i.analisisSolicitado.pendiente) }
				            </td>
				            <td>{ i.personal.nombres+' '+i.personal.apellidos }</td>
				            <td>{ i.especialidad.descripcion }</td>

				            <td>
				            	<Link to={`${dataUrl}/${i.analisisSolicitado.id_analisisSolicitado}`}>
									<button type="button" className="btn btn-info btn-space">Mostrar</button>
								</Link>
				            </td>
				        </tr>
					})
				}
			</tbody>

		// } else {
		// 	return <span></span>
		// }

	}

	render() {

		const { analisisSolicitados, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Solicitudes laboratorio</h1>
					
					<MensajeOerror error={error} mensaje={null}/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Fecha</th>
						        	<th>Estado</th>
						        	<th>Solicitante</th>
						        	<th>Especialidad</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderAnalisisSolicitados(analisisSolicitados) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar