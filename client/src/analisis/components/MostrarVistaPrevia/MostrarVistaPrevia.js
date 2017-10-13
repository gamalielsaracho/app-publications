import React, { Component } from 'react'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import moment from 'moment'
import { calcularEdad } from '../../../globalActions'

class MostrarVistaPrevia extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisis = this.renderAnalisis.bind(this)
		this.renderAnalisisTipos = this.renderAnalisisTipos.bind(this)
		this.renderResultadosReferencias = this.renderResultadosReferencias.bind(this)
		
		this.renderResultadosSegunTipoExamen = this.renderResultadosSegunTipoExamen.bind(this)
	}

	componentWillMount() {
		this.props.mostrarAnalisisVistaPrevia(this.props.urls.idAnalisis)
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
			            <td><h4>{ i.tipoExamen.descripcion }</h4></td>
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
						        	<th>Tipo de examen</th>
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
				<button className='btn btn-success no-print-data' onClick={() => { window.print() }}>Imprimir o Exportar a PDF</button>
				
				<div className='row'>
					<div className='col-xs-3 col-sm-3 col-md-3 col-lg-2'>
						<img className='img-responsive' src='http://localhost:8080/images/logo.jpg'/>	
					</div>
					<div className='col-xs-5 col-sm-4 col-md-4 col-lg-4'>	
						<h3 className='text-center'>Unidad de Salud Familiar</h3>
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-6 col-sm-6 col-md-4 col-lg-4'>	
						<p><strong>Nombre:</strong>{ ' '+dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
						<p><strong>Sexo:</strong>{ ' '+dato.paciente.sexo }</p>
						<p><strong>Fecha de nacimiento:</strong>{ ' '+moment(dato.paciente.fechaNacimiento).format('L') }</p>
						<p><strong>Edad:</strong>{ ' '+calcularEdad(dato.paciente.fechaNacimiento) }</p>
						<p><strong>Dirección:</strong>{ ' '+dato.paciente.direccion }</p>
						<br/>
					</div>			
					<div className='col-xs-6 col-sm-6 col-md-4 col-lg-4'>	
						<p><strong>Médico/a:</strong>{ ' '+dato.medico.nombres+' '+dato.medico.apellidos }</p>
						<p><strong>Especialidad:</strong>{ ' '+dato.especialidad.descripcion }</p>
						<br/>
					</div>
					<div className='col-xs-6 col-sm-6 col-md-4 col-lg-4'>	
						<p><strong>Bioquimico/a:</strong>{ ' '+dato.bioquimica.nombres+' '+dato.bioquimica.apellidos }</p>
						<p><strong>Fecha de estudios realizados</strong>{ ' '+moment(dato.analisis.fecha).format('L') }</p>
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