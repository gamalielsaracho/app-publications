import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCiudades = this.renderCiudades.bind(this)
	}

	componentWillMount() {
		this.props.listarCiudades()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.ciudades !== this.props.ciudades) {
			return true
		}else {
			return false
		}
	}	

	renderCiudades(ciudades) {
		let style = {
			btn: {
				"marginLeft":"10px"
			}
		}

		return <tbody>
			{
				ciudades.map((ciudad) => {
					return <tr key={ciudad.id_ciudad}>
			            <td className='center'>{ ciudad.id_ciudad }</td>
			            <td className='center'>{ ciudad.descripcion }</td>
			            <td className='center'>
			            	<a onClick={() => { this.props.mostrarCiudad(ciudad.id_ciudad) }} className="#0288d1 light-blue darken-2 btn">
			            		Mostrar
			            	</a>
			            	<a onClick={() => { this.props.abrirFormularioEditarCiudad(ciudad.id_ciudad) }} style={style.btn} className="#0288d1 light-green darken-2 btn">Editar</a>
			            	<a onClick={() => { this.props.eliminarCiudad(ciudad.id_ciudad) }} style={style.btn} className="#e53935 red darken-1 btn">
			            		Eliminar
			            	</a>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { ciudades, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
				
					<FormularioContainer/>
					<MostarContainer/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearCiudad } className='#0288d1 light-blue darken-2 btn'>Agregar</button>
						</div>
					</div>
					<MensajeOerror error={error} mensaje={null}/>
					<div className='row row center-lg center-md center-sm center-xs'>
						<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<h4 className='center'>Ciudades</h4>

							<table>
								<thead>
						          <tr>
						              <th className='center'>Id_ciudad</th>
						              <th className='center'>Descripción</th>
						              <th className='center'>Opciones</th>
						          </tr>
						        </thead>

								{ this.renderCiudades(ciudades) }

							</table>

						</div>
					</div>
				</div>
		}

	}
}

export default Listar