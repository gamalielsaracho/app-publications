import React, { Component } from 'react'
import { Link } from 'react-router'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioAnalisisTipoContainer from '../Formulario'


class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisTipos = this.renderAnalisisTipos.bind(this)

		this.renderBtnAdd = this.renderBtnAdd.bind(this)

		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		// this.props.urls.idAnalisis
		this.props.listarAnalisisTipos(this.props.urls.idAnalisis)
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.analisisTipos !== this.props.analisisTipos ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		} else {
			return false
		}
	}


	getEstadoHabilitado() {
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(localStorage.getItem('analisisImpreso') == 1) {
			desabilitado = true
		} else {
			desabilitado = false
		}

		// 3 administración.
		if(idRol == 3) {
			desabilitado = false
		}

		return desabilitado
	}

	renderBtnAdd() {
		let idRol = this.personalLocalSt.id_rol

		// 6 laboratorio.
		// 3 administración.
		if((idRol == 6) || (idRol == 3)) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button disabled={this.getEstadoHabilitado()} onClick={ this.props.abrirFormularioCrearAnalisisTipo } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}



	renderBtnsOpciones(i) {
		let idRol = this.personalLocalSt.id_rol

		// 6 laboratorio.
		// 3 administración.
		if((idRol == 6) || (idRol == 3)) {
			return <div>
				<Link to={`/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${this.props.urls.idAnalisis}/analisis-tipos/${i.analisisTipo.id_analisisTipo}`}>
					<button type="button" className="btn btn-info btn-space">Mostrar</button>
				</Link>
				<button disabled={this.getEstadoHabilitado()} type="button" 
					onClick={() => { this.props.eliminarAnalisisTipo(i.analisisTipo.id_analisisTipo) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}
	}


	renderAnalisisTipos(analisisTipos) {
		return <tbody>
			{
				analisisTipos.map((i) => {
					return <tr key={i.analisisTipo.id_analisisTipo}>
			            <td>{ i.tipoAnalisis.descripcion }</td>
			            <td>
							{ this.renderBtnsOpciones(i) }
						</td>
			        </tr>
				})
			}
		</tbody>
	}

	render() {
		const { analisisTipos, cargando } = this.props.listar		

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
					
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderBtnAdd() }
					<br/>

					<FormularioAnalisisTipoContainer urls={this.props.urls}/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderAnalisisTipos(analisisTipos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar