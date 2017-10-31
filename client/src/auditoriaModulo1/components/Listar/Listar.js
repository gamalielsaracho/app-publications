import React, { Component } from 'react'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

var MarkdownIt = require('../../../../js/libs/markdown-it')
var md = new MarkdownIt()

var marked = require('marked');

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMovimientos = this.renderMovimientos.bind(this)
	}

	componentWillMount() {
		if(this.props.urls.tableName && this.props.urls.idTableFather) {
			this.props.listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre(this.props.urls.tableName, this.props.urls.idTableFather)
		} else if(this.props.urls.tableName) {
			this.props.listarAuditoria1MovimientosPorNombreTabla(this.props.urls.tableName)
		}
	}


	renderMovimientos(auditoria1Movimientos) {

		return <tbody>
			{
				auditoria1Movimientos.map((i) => {

					// console.log(marked(i.auditoria.datoAnterior));
					// i.auditoria.datoAnterior = marked(i.auditoria.datoAnterior)

					return <tr key={i.auditoria.id_auditoriaModulo1}>
			            <td><p>{ i.auditoria.idRegistro }</p></td>
			            <td dangerouslySetInnerHTML={{ __html:md.render(i.auditoria.datoAnterior) }}>
			            </td>
			            <td dangerouslySetInnerHTML={{ __html:md.render(i.auditoria.datoNuevo) }}>
			    		</td>
			            <td><p>{ i.auditoria.tabla }</p></td>
			            <td><p>{ i.auditoria.accion }</p></td>
			            <td><p>{ moment(i.auditoria.fecha).format('L') }</p></td>
			            <td><p>{ i.auditoria.hora }</p></td>
			            
			            <td>
			            	<strong>- Nro.Documento:</strong>{ ' '+i.personal.nroDocumento }<br/>
			            	<strong>- Nombre:</strong>{ ' '+i.personal.nombres+' '+i.personal.apellidos }
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { auditoria1Movimientos, cargando } = this.props.listar

		let error = this.props.listar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Auditoría</h1>
					
					<MensajeOerror error={error} mensaje={null}/>

					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th><h4>Código</h4></th>
						        	<th><h4>Dato anterior</h4></th>
						        	<th><h4>Dato nuevo</h4></th>
						        	<th><h4>Módulo</h4></th>
						        	<th><h4>Acción</h4></th>
						        	<th><h4>Fecha</h4></th>
						        	<th><h4>Hora</h4></th>
						        	<th><h4>Pesonal</h4></th>
						    	</tr>
						    </thead>

							{ this.renderMovimientos(auditoria1Movimientos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar