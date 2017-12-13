import React, { Component } from 'react'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import moment from 'moment'
import { calcularEdad } from '../../../globalActions'

import CabeceraContainer from '../../../app/components/Cabecera'


class MostrarVistaPrevia extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisis = this.renderAnalisis.bind(this)
		this.renderAnalisisTipos = this.renderAnalisisTipos.bind(this)
		this.renderResultadosReferencias = this.renderResultadosReferencias.bind(this)
		
		this.renderResultadosSegunTipoExamen = this.renderResultadosSegunTipoExamen.bind(this)
		this.renderBtnImprimir = this.renderBtnImprimir.bind(this)

	}

	componentWillMount() {
		this.props.mostrarAnalisisVistaPrevia(this.props.urls.idAnalisis)
	}

	renderBtnImprimir(dato) {
		return <div className='row no-print-data'>
			<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right'>
				<button className='btn btn-success' 
					onClick={() => { this.props.imprimirAnalisis(dato.analisis.id_analisis) }}>Imprimir o Exportar a PDF</button>
			</div>
		</div>
	}

	renderResultadosSegunTipoExamen(tipoExamen, i) {
		if(tipoExamen == 'químico') {

		}
	}

	renderResultadosReferencias(datos) {
		return <tbody>
			{
				datos.map((i) => {
					return <tr key={i.analisisTipoReferencia.id_analisisTipoReferencia}>
			            <td>{ i.parametro.descripcion }</td>
			            <td>{ i.unidad.descripcion }</td>
			            <td>{ i.analisisTipoReferencia.valor }</td>
			            <td>{ i.referencia.inferior }</td>
			            <td>{ i.referencia.superior }</td>
			        </tr>
				})
			}
			<br/>
		</tbody>
	}

	renderAnalisisTipos(datos) {
		return <div>
			{
				datos.map((i) => {
					return <div key={i.tipoAnalisis.id_tipoAnalisis} className='table-responsive'>
						<h3 className=''>{ i.tipoAnalisis.descripcion }</h3>
						<br/>

						<table className='table'>
							<thead>
						    	<tr>
						        	<th>Parametro</th>
						        	<th>Unidad</th>
						        	<th>Resultado</th>
						        	<th>Inferior</th>
						        	<th>Superior</th>
						    	</tr>
						    </thead>

							{ this.renderResultadosReferencias(i.referencias) }
						</table>
					</div>
				})
			}
		</div>	
	}

	renderAnalisis(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if (dato){
			// console.log(dato)

			return <div id='imprimir-vista-previa'>
				<br/>
				{ this.renderBtnImprimir(dato) }
				<br/>

				<CabeceraContainer
					styleData={''}
					fechaCreacion = { dato.analisis.fecha }/>

				<div className='row'>
					<div className='col-xs-6 col-sm-6 col-md-4 col-lg-4'>	
						<p><strong>Nombre:</strong>{ ' '+dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
						<p><strong>Nro. Documento:</strong>{ ' '+dato.paciente.nroDocumento }</p>
						<p><strong>Sexo:</strong>{ ' '+dato.paciente.sexo }</p>
						<p><strong>Fecha de nacimiento:</strong>{ ' '+moment(dato.paciente.fechaNacimiento).format('L') }</p>
						<p><strong>Edad:</strong>{ ' '+calcularEdad(dato.paciente.fechaNacimiento) }</p>
						<p><strong>Dirección:</strong>{ ' '+dato.paciente.direccion }</p>
						<br/>
					</div>			
					<div className='col-xs-6 col-sm-6 col-md-4 col-lg-4'>	
						<p><strong>Médico/a:</strong>{ ' '+dato.medico.nombres+' '+dato.medico.apellidos }</p>
						<p><strong>Especialidad:</strong>{ ' '+dato.especialidad.descripcion }</p>
						<p><strong>Nro. Registro:</strong>{ dato.medico.nroRegistro }</p>
						
						<br/>
					</div>
					<div className='col-xs-6 col-sm-6 col-md-4 col-lg-4'>	
						<p><strong>Bioquimico/a:</strong>{ ' '+dato.bioquimica.nombres+' '+dato.bioquimica.apellidos }</p>
						<p><strong>Nro. Registro:</strong>{ dato.bioquimica.nroRegistro }</p>
						
					</div>				
				</div>

				<div className=''>
					{ this.renderAnalisisTipos(dato.anlisisTipos) }
				</div>
			</div>
		}
	}

	render() {
		const { cargando, analisis, error } = this.props.vistaPrevia
		
		return <div>

			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderAnalisis(analisis, cargando) }
		</div>
	}	
}

export default MostrarVistaPrevia