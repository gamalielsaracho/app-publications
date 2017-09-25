import React, { Component } from 'react'
import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioTipoAnalisisParametroContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderTipoAnalisisParametros = this.renderTipoAnalisisParametros.bind(this)
		// this.renderFormularioTipoAnalisisParametro = this.renderFormularioTipoAnalisisParametro.bind(this)
	}


	componentWillMount() {
		this.props.listarTipoAnalisisParametros(this.props.idTipoAnalisis)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.parametrosTipoAnalisis !== this.props.parametrosTipoAnalisis
	}

	renderTipoAnalisisParametros(parametrosTipoAnalisis) {
		return <tbody>
			{
				parametrosTipoAnalisis.map((i) => {
					return <tr key={i.tipoAnalisisParametro.id_tipoAnalisisParametro}>
			            <td>{ i.tipoAnalisisParametro.id_tipoAnalisisParametro }</td>
			            <td>{ i.parametroAnalisis.descripcion }</td>
			            <td>{ i.unidad.descripcion }</td>
			            <td>{ i.tipoExamen.descripcion }</td>
			            
			            <td>
			            	<Link to={`/dashboard/tipos-analisis/${i.tipoAnalisisParametro.id_tipoAnalisis}/parametros/${i.tipoAnalisisParametro.id_parametroAnalisis}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
							<button type="button" onClick={() => { this.props.eliminarTipoAnalisisParametro(i.tipoAnalisisParametro.id_tipoAnalisisParametro) }} className="btn btn-danger btn-space">Eliminar</button>
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { parametrosTipoAnalisis, cargando, error } = this.props.listar		

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
											
					<MensajeOerror error={error} mensaje={null}/>

					<button type="button" onClick={() => { this.props.abrirFormularioCrearTipoAnalisisParametro() }} className="btn btn-success btn-space">Agregar</button>
					<br/>
					<br/>

					<FormularioTipoAnalisisParametroContainer 
						idTipoAnalisis = { this.props.idTipoAnalisis }/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Unidad de medida</th>
						        	<th>Tipo de examen</th>
						        	<th>Observaciones</th>
						    	</tr>
						    </thead>

							{ this.renderTipoAnalisisParametros(parametrosTipoAnalisis) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar