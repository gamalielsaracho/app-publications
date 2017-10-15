import React, { Component } from 'react'
import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioConsultaDiagnosticoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderConsultaDiagnosticos = this.renderConsultaDiagnosticos.bind(this)
		this.renderBtnsOpcionesByRolYpersonal = this.renderBtnsOpcionesByRolYpersonal.bind(this)
		
		this.renderFormularioConsultaDiagnostico = this.renderFormularioConsultaDiagnostico.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarConsultaDiagnosticos(this.props.urls.idConsulta)
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.consultaDiagnosticos !== this.props.consultaDiagnosticos ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		} else {
			return false
		}
	}

	renderBtnsOpcionesByRolYpersonal(i) {

		let idPersonal = this.personalLocalSt.id_personal
		let rol = removeAccents(this.personalLocalSt.rol)

		// this.props.mostrar
		// console.log('HOLA DESDE renderBtnsOpcionesByRolYpersonal.! cool.!')
		// &&  == personalPre.personal.id_personal

		if((rol == 'medico' || rol == 'administracion')) {
			return <div>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarConsultaDiagnostico(i.consultaDiagnostico.id_consultaDiagnostico) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarConsultaDiagnostico(i.consultaDiagnostico.id_consultaDiagnostico) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
		} else {
			return <span></span>
		}

	}

	renderFormularioConsultaDiagnostico() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioConsultaDiagnosticoContainer
					urls = { this.props.urls }/>
		} else {
			return <span></span>
		}
	}

	renderConsultaDiagnosticos(datos) {
		// console.log(datos)
		if(datos) {
			return <tbody>
				{
					datos.map((i) => {
						return <tr key={i.consultaDiagnostico.id_consultaDiagnostico}>
				            <td>{ i.consultaDiagnostico.id_consultaDiagnostico }</td>
				            <td>{ i.diagnostico.descripcion }</td>
				            <td>{ i.consultaDiagnostico.observaciones }</td>
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
		const { consultaDiagnosticos, cargando, error } = this.props.listar		

		// console.log(consultaDiagnosticos)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'>Diagnósticos</h3>
											
					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearConsultaDiagnostico } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					{ this.renderFormularioConsultaDiagnostico() }

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Diagnóstico</th>
						        	<th>Observaciones</th>
						    	</tr>
						    </thead>

							{ this.renderConsultaDiagnosticos(consultaDiagnosticos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar