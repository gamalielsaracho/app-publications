import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioDiagnosticoContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderDiagnosticos = this.renderDiagnosticos.bind(this)
	}

	componentWillMount() {
		this.props.listarDiagnosticos()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.diagnosticos !== this.props.diagnosticos ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderDiagnosticos(diagnosticos) {

		return <tbody>
			{
				diagnosticos.map((diagnostico) => {
					return <tr key={diagnostico.id_diagnostico}>
			            <td>{ diagnostico.id_diagnostico }</td>
			            <td>{ diagnostico.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarDiagnostico(diagnostico.id_diagnostico) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarDiagnostico(diagnostico.id_diagnostico) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarDiagnostico(diagnostico.id_diagnostico) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { diagnosticos, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
					this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Diagnósticos</h1>
					
					<FormularioDiagnosticoContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearDiagnostico } className='btn btn-success'>Agregar</button>
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

							{ this.renderDiagnosticos(diagnosticos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar