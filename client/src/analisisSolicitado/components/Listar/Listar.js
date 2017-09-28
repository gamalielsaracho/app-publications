import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisSolicitados = this.renderAnalisisSolicitados.bind(this)
	}

	componentWillMount() {
		this.props.listarAnalisisSolicitadosPorIdPaciente(this.props.urls.idPaciente)
	}

	renderAnalisisSolicitados(analisisSolicitados) {
		// if(analisisSolicitados) {
			// <button type="button" onClick={() => { this.props.mostrarParametroAnalisis(i.parametro.id_parametroAnalisis) }} className="btn btn-info btn-space">Mostrar</button>
			
			return <tbody>
				{
					analisisSolicitados.map((i) => {
						return <tr key={i.analisisSolicitado.id_analisisSolicitado}>
				            <td>{ i.analisisSolicitado.id_analisisSolicitado }</td>
				            <td>
								<button type="button" onClick={() => { this.props.abrirFormularioEditarAnalisisSolicitado(i.analisisSolicitado.id_analisisSolicitado) }} className="btn btn-warning btn-space">Editar</button>
								<button type="button" onClick={() => { this.props.eliminarAnalisisSolicitado(i.analisisSolicitado.id_analisisSolicitado) }} className="btn btn-danger btn-space">Eliminar</button>
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
					<h1 className='text-center'>Análisis solicitados</h1>
					
					<MensajeOerror error={error} mensaje={null}/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Tipo de examen</th>
						        	<th>Unidad de medida</th>
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