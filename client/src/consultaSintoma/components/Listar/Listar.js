import React, { Component } from 'react'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioSintomaConsultaContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderSintomasConsulta = this.renderSintomasConsulta.bind(this)
		this.renderBtnsOpcionesByRolYpersonal = this.renderBtnsOpcionesByRolYpersonal.bind(this)
		this.renderFormularioSintomaConsulta = this.renderFormularioSintomaConsulta.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// idConsulta -> es sacado desde la url en el cual está parado.
	componentWillMount() {
		this.props.listarConsultaSintomas(this.props.urls.idConsulta)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.sintomasConsulta !== this.props.sintomasConsulta
	}

	renderFormularioSintomaConsulta() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			<FormularioSintomaConsultaContainer
				idConsulta = { this.props.urls.idConsulta }/>
		} else {
			return <span></span>
		}
	}

	renderBtnsOpcionesByRolYpersonal(i) {
		const { cargando, consulta, error } = this.props.mostrarConsulta

		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal

		if(cargando) {
			return <p>Cargando Opciones...</p>
		} else if (consulta){
			if(rol == 'administracion' || (rol == 'medico' && idPersonal  == consulta.personal.id_personal)) {
				return <div>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarConsultaSintoma(i.consultaSintoma.id_consultaSintoma) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarConsultaSintoma(i.consultaSintoma.id_consultaSintoma) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			} else {
				return <span></span>
			}
		}
	}

	renderSintomasConsulta(sintomasConsulta) {
		
		return <tbody>
			{
				sintomasConsulta.map((i) => {
					return <tr key={i.consultaSintoma.id_consultaSintoma}>
			            <td>{ i.sintoma.descripcion }</td>
			            <td>{ i.consultaSintoma.observaciones }</td>

			            <td>
							{ this.renderBtnsOpcionesByRolYpersonal(i) }
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { sintomasConsulta, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
											
					<MensajeOerror error={error} mensaje={null}/>

					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Observaciones</th>
						    	</tr>
						    </thead>

							{ this.renderSintomasConsulta(sintomasConsulta) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar