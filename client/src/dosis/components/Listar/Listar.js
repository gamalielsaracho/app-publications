import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioDosisContainer from '../Formulario'
import MostarDosisContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderListaDosis = this.renderListaDosis.bind(this)
	}

	componentWillMount() {
		this.props.listarDosis()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.listaDosis !== this.props.listaDosis) {
			return true
		}else {
			return false
		}
	}	

	renderListaDosis(listaDosis) {

		return <tbody>
			{
				listaDosis.map((dosis) => {
					return <tr key={dosis.id_dosis}>
			            <td>{ dosis.id_dosis }</td>
			            <td>{ dosis.valor }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarDosis(dosis.id_dosis) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarDosis(dosis.id_dosis) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarDosis(dosis.id_dosis) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { listaDosis, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Lista de Dosis</h1>
					
					<FormularioDosisContainer/>
					<MostarDosisContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearDosis } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderListaDosis(listaDosis) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar