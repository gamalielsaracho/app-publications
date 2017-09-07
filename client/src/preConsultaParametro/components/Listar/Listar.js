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

	renderBtnsOpcionesByRolYpersonal(datosToken, personalPre, i) {
		// let idPersonalLocal = jwtDecode(localStorage.getItem('token')).id_personal
		
		// let idPersonalLocal = 12
		// console.log(idPersonalLocal)
		if(personalPre != null) {
			if(removeAccents(datosToken.rol.descripcion) == 'enfermeria' && datosToken.personal.id_personal == personalPre.personal.id_personal) {
				return <div>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarPreConsultaParametro(i.preconsultaParametro.id_preconsulta, i.parametro.id_parametroPreconsulta) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarPreConsultaParametro(i.preconsultaParametro.id_preconsulta, i.parametro.id_parametroPreconsulta) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			} else {
				return <span></span>
			}
		}
	}

	renderPreConsultaParametros(parametrosPreConsulta) {
		let datosToken = null
		let personalPre = null

		let condition = (
			this.props.preConsulta != undefined && 
			this.props.usuarioEstado.datosToken.rol != null
		);

		if(condition) {
			datosToken = this.props.usuarioEstado.datosToken
			personalPre = this.props.preConsulta
			// console.log('El ROL ES DESDE EL SERVER:'+this.props.usuarioEstado.datosToken.rol.descripcion)
		}
		// console.log('#### this.props.preConsulta #####')
		// console.log(personalPre)

		// if() {
		// 	// console.log('El ROL ES DESDE EL SERVER:'+this.props.usuarioEstado.datosToken.rol.descripcion)
		// } else {
		// 	console.log('Nooooooooooo estaaa..!')
		// }

		// console.log(this.props.preConsulta)



		// console.log('QQQQQ this.props.usuarioEstado.datosToken')

		// console.log(this.props.usuarioEstado.datosToken.rol)

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
							{ this.renderBtnsOpcionesByRolYpersonal(datosToken, personalPre, i) }
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