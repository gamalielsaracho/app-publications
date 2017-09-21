import React, { Component } from 'react'
import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderConsultaDiagnosticos = this.renderConsultaDiagnosticos.bind(this)
		this.renderBtnsOpcionesByRolYpersonal = this.renderBtnsOpcionesByRolYpersonal.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}


	// this.props.idConsulta -> es pasado desde la url.
	// cuando es llamado dentro de ListarConsultaDiagnosticosPage.
	componentWillMount() {
		this.props.listarConsultaDiagnosticos(this.props.idConsulta)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.diagnosticosConsulta !== this.props.diagnosticosConsulta
	}

	renderBtnsOpcionesByRolYpersonal(i) {

		let idPersonal = this.personalLocalSt.id_personal
		let rol = removeAccents(this.personalLocalSt.rol)

		// this.props.mostrar
		// console.log('HOLA DESDE renderBtnsOpcionesByRolYpersonal.! cool.!')
		// &&  == personalPre.personal.id_personal

		if((rol == 'medico' || rol == 'administración')) {
			return <div>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarPreConsultaParametro(i.diagnosticoConsulta.id_diagnosticoConsulta) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarConsultaDiagnostico(i.diagnosticoConsulta.id_diagnosticoConsulta) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			} else {
				return <span></span>
		}

	}

	renderConsultaDiagnosticos(diagnosticosConsulta) {
		// console.log(diagnosticosConsulta)
		if(diagnosticosConsulta) {
			return <tbody>
				{
					diagnosticosConsulta.map((i) => {
						return <tr key={i.diagnosticoConsulta.id_diagnosticoConsulta}>
				            <td>{ i.diagnosticoConsulta.id_diagnosticoConsulta }</td>
				            <td>{ i.diagnostico.descripcion }</td>
				            <td>{ i.diagnosticoConsulta.observaciones }</td>
				            <td>
								{ this.renderBtnsOpcionesByRolYpersonal(i) }
							</td>
				        </tr>		
					})
				}
			</tbody>
		} else {
			return <span></span>
		}		
	}

	render() {
		const { diagnosticosConsulta, cargando, error } = this.props.listar		

		// console.log(diagnosticosConsulta)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'>Diagnóstico</h3>
											
					<MensajeOerror error={error} mensaje={null}/>

					<br/>
					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Diagnóstico</th>
						        	<th>Observaciones</th>
						    	</tr>
						    </thead>

							{ this.renderConsultaDiagnosticos(diagnosticosConsulta) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar