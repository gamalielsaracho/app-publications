import React, { Component } from 'react'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

// import  from '../'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisTipoReferencias = this.renderAnalisisTipoReferencias.bind(this)
		this.renderBtnsOpcionesByRolYpersonal = this.renderBtnsOpcionesByRolYpersonal.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}


	// this.props.analisisTipo -> es pasado como property al ser llamado dentro de
	// MostarAnalisisTipoContainer.
	componentWillMount() {
		this.props.listarAnalisisTipoReferencias(this.props.analisisTipoDatos.analisisTipo.id_analisisTipo)
	}


	shouldComponentUpdate(nextProps) {
		return nextProps.analisisTipoReferencias !== this.props.analisisTipoReferencias
	}

	renderBtnsOpcionesByRolYpersonal(i) {
		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal

		if((rol == 'administracion') || (rol == 'laboratorio' && idPersonal == i.analisis.id_personal)) {
			return <div>
				<button type="button" onClick={() => { this.props.abrirFormularioEditarAnalisisTipoReferencia(i.analisisTipoReferencia.id_analisisTipoAnalisisReferencia) }} className="btn btn-warning btn-sm btn-space">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarAnalisisTipoReferencia(i.analisisTipoReferencia.id_analisisTipoAnalisisReferencia) }} className="btn btn-danger btn-sm btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}
	}

	renderAnalisisTipoReferencias(analisisTipoReferencias) {
		// console.log(analisisTipoReferencias)
		
		return <tbody>
			{
				analisisTipoReferencias.map((i) => {
					return <tr key={i.analisisTipoReferencia.id_analisisTipoAnalisisReferencia}>
			            <td>{ i.parametro.descripcion }</td>
			            <td>{ i.analisisTipoReferencia.valor }</td>
			            <td>{ i.unidad.descripcion }</td>
			            <td>{ i.referencia.inferior }</td>
			            <td>{ i.referencia.superior }</td>
			            <td>
							{ this.renderBtnsOpcionesByRolYpersonal(i) }
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { analisisTipoReferencias, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
						
					<MensajeOerror error={error} mensaje={null}/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Parametro</th>
						        	<th>Resultado</th>
						        	<th>Unidad</th>
						        	<th>Inferior</th>
						        	<th>Superior</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderAnalisisTipoReferencias(analisisTipoReferencias) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar