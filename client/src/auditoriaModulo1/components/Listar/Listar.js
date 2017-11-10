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

	renderMovimientos(auditoria1Movimientos) {
		// console.log(auditoria1Movimientos)
		
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
			            <td><p>{ moment(i.auditoria.fecha).format('DD-MM-YYYY') }</p></td>
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

		return <div>
			<h1 className='text-center'>Auditoría</h1>
					
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

							{ this.renderMovimientos(this.props.movimientosFiltrados) }

						</table>
					</div>
		</div>

	}
}

export default Listar