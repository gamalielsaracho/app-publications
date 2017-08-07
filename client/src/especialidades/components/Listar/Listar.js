import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderEspecialidades = this.renderEspecialidades.bind(this)
	}

	componentWillMount() {
		this.props.listarEspecialidades()
	}

	shouldComponentUpdate(nextProps) {

		return nextProps.especialidades !== this.props.especialidades

	}	

	renderEspecialidades(especialidades) {
		let style = {
			btn: {
				"marginLeft":"10px"
			}
		}

		return <tbody>
			{
				especialidades.map((especialidad) => {
					return <tr key={especialidad.id_especialidad}>
			            <td className='center'>{ especialidad.id_especialidad }</td>
			            <td className='center'>{ especialidad.descripcion }</td>
			            <td className='center'>
			            	<a onClick={() => { this.props.mostrarEspecialidad(especialidad.id_especialidad) }} className="#0288d1 light-blue darken-2 btn">
			            		Mostrar
			            	</a>
			            	<a onClick={() => { this.props.abrirFormularioEditarEspecialidad(especialidad.id_especialidad) }} style={style.btn} className="#0288d1 light-green darken-2 btn">Editar</a>
			            	<a onClick={() => { this.props.eliminarEspecialidad(especialidad.id_especialidad) }} style={style.btn} className="#e53935 red darken-1 btn">
			            		Eliminar
			            	</a>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { especialidades, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
				
					<FormularioContainer/>
					<MostarContainer/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearEspecialidad } className='#0288d1 light-blue darken-2 btn'>Agregar</button>
						</div>
					</div>
					<MensajeOerror error={error} mensaje={null}/>
					<div className='row row center-lg center-md center-sm center-xs'>
						<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<h4 className='center'>Especialidades</h4>

							<table>
								<thead>
						          <tr>
						              <th className='center'>Id especialidad</th>
						              <th className='center'>Descripción</th>
						              <th className='center'>Opciones</th>
						          </tr>
						        </thead>

								{ this.renderEspecialidades(especialidades) }

							</table>

						</div>
					</div>
				</div>
		}

	}
}

export default Listar