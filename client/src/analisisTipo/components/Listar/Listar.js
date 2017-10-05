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
	}

	componentWillMount() {
		// this.props.urls.idAnalisis
		this.props.listarAnalisisTipos(this.props.urls.idAnalisis)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.analisisTipos !== this.props.analisisTipos
	}

	renderAnalisisTipos(analisisTipos) {
		return <tbody>
			{
				analisisTipos.map((i) => {
					return <tr key={i.analisisTipo.id_analisisTipo}>
			            <td>{ i.tipoAnalisis.descripcion }</td>
			            <td>
							<Link to={`/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${this.props.urls.idAnalisis}/analisis-tipos/${i.analisisTipo.id_analisisTipo}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>

							<button type="button" onClick={() => { this.props.eliminarAnalisisTipo(i.analisisTipo.id_analisisTipo) }} className="btn btn-danger btn-space">Eliminar</button>
						</td>
			        </tr>
				})
			}
		</tbody>
	}

	render() {
		const { analisisTipos, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
					
					<MensajeOerror error={error} mensaje={null}/>

					<br/>
					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearAnalisisTipo } className='btn btn-success'>Agregar</button>
						</div>
					</div>

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