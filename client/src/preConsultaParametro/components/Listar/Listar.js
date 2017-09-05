import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import MostarPreConsultaParametroContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPreConsultaParametros = this.renderPreConsultaParametros.bind(this)
	}

	// this.props.idPreConsulta -> es pasado como property.
	componentWillMount() {
		this.props.listarPreConsultaParametros(this.props.idPreConsulta)
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.parametrosPreConsulta !== this.props.parametrosPreConsulta) {
			return true
		}else {
			return false
		}
	}	

	renderPreConsultaParametros(parametrosPreConsulta) {
		// console.log(parametrosPreConsulta)
		return <tbody>
			{
				parametrosPreConsulta.map((i) => {
					return <tr key={i.parametro.id_parametroPreconsulta}>
			            <td>{ i.parametro.descripcion }</td>
			            <td>{ i.preconsultaParametro.valor +' '+i.parametro.unidad }</td>
			            <td>{ i.parametro.valorNormal }</td>
			            <td>{ i.parametro.valorAlto }</td>
			            <td>{ i.parametro.valorBajo }</td>
			            <td>{ i.preconsultaParametro.observaciones }</td>

			            <td>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPreConsultaParametro(i.preconsultaParametro.id_preconsulta, i.parametro.id_parametroPreconsulta) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarPreConsultaParametro(i.preconsultaParametro.id_preconsulta, i.parametro.id_parametroPreconsulta) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { parametrosPreConsulta, cargando, error } = this.props.listar

		console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
					
					{/*  
					*/}
						
					<MostarPreConsultaParametroContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Parametro</th>
						        	<th>Valor</th>
						        	<th>Normal</th>
						        	<th>Alto</th>
						        	<th>Bajo</th>
						        	<th>Observaciones</th>
						    	</tr>
						    </thead>

							{ this.renderPreConsultaParametros(parametrosPreConsulta) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar