import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderConsultas = this.renderConsultas.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		switch(removeAccents(this.personalLocalSt.rol)) {
			case 'administracion':
				this.props.listarConsultas()
				break

			case 'medico':
				this.props.listarConsultasMedico(this.personalLocalSt.id_personal)
				break
		}
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.consultas !== this.props.consultas) {
			return true
		}else {
			return false
		}
	}	

	renderConsultas(consultas) {

		return <tbody>
			{
				consultas.map((i) => {
					return <tr key={i.consulta.id_consulta}>
			            <td>{ i.consulta.id_consulta }</td>
			            <td>{ i.paciente.nombres+' '+i.paciente.apellidos }</td>
			            <td>{ i.consulta.fecha }</td>
			            <td>{ i.consulta.fechaProximaConsulta }</td>
			            <td>
			            	<Link to={`/dashboard/consultas/${i.consulta.id_consulta}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { consultas, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Consultas</h1>
					
					<MensajeOerror error={error} mensaje={null}/>

					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Paciente</th>
						        	<th>Fecha</th>
						        	<th>Próxima consulta</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderConsultas(consultas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar