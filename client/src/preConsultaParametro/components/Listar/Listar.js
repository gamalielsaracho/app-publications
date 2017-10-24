import React, { Component } from 'react'
import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import MostarPreConsultaParametroContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPreConsultaParametros = this.renderPreConsultaParametros.bind(this)
		this.renderBtnsOpcionesByRolYpersonal = this.renderBtnsOpcionesByRolYpersonal.bind(this)
		
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}


	// this.props.idPreConsulta -> es pasado como property.
	componentWillMount() {
		this.props.listarPreConsultaParametros(this.props.idPreConsulta)
	}

	shouldComponentUpdate(nextProps) {
		// console.log("Anterio: -> ")
		// console.log(this.props.parametrosPreConsulta)

		// console.log("Siguiente: -> ")
		// console.log(nextProps.parametrosPreConsulta)

		return nextProps.parametrosPreConsulta !== this.props.parametrosPreConsulta

	}

	renderBtnsOpcionesByRolYpersonal(i) {
		let rol = this.personalLocalSt.id_rol

		// 2 enfermería.
		// 3 administración.
		if((rol == 2) || (rol == 3)) {
			return <div>
				<button type="button" onClick={() => { this.props.abrirFormularioEditarPreConsultaParametro(i.preconsultaParametro.id_preconsultaParametro) }} className="btn btn-warning btn-space">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarPreConsultaParametro(i.preconsultaParametro.id_preconsultaParametro) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}
	}

	renderPreConsultaParametros(parametrosPreConsulta) {
		
		return <tbody>
			{
				parametrosPreConsulta.map((i) => {
					return <tr key={i.preconsultaParametro.id_preconsultaParametro}>
			            <td>{ i.parametro.descripcion }</td>
			            <td>{ i.preconsultaParametro.valor +' '+i.unidad.descripcion }</td>
			            <td>{ i.parametro.valorNormal }</td>
			            <td>{ i.parametro.valorAlto }</td>
			            <td>{ i.parametro.valorBajo }</td>
			            <td>{ i.preconsultaParametro.observaciones }</td>

			            <td>
							{ this.renderBtnsOpcionesByRolYpersonal(i) }
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { parametrosPreConsulta, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

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