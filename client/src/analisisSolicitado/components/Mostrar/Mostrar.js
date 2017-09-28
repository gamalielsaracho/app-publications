import React, { Component } from 'react'
import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// Formulario Modal para EDITAR un parametro.
import FormularioParametroAnalisisContainer from '../Formulario'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderParametroAnalisis = this.renderParametroAnalisis.bind(this)
		this.renderParametroAnalisisFormulario = this.renderParametroAnalisisFormulario.bind(this)
	}

	componentWillMount() {
		this.props.mostrarParametroAnalisis(this.props.idParametroAnalisis)
	}

	renderParametroAnalisisFormulario() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioParametroAnalisisContainer/>
		} else {
			return <span></span>
		}
	}

	renderParametroAnalisis(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if(dato) {
			// console.log(dato)
			return <div>
				<div className='row'>
					{ this.renderParametroAnalisisFormulario() }

					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h4><strong>Nombre:</strong>{ ' '+ dato.parametro.descripcion }</h4>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h4><strong>Unidad de medida:</strong>{ ' '+ dato.unidad.descripcion }</h4>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h4><strong>Tipo de examen:</strong>{ ' '+ dato.tipoExamen.descripcion }</h4>
					</div>
				</div>
				<div className='row'>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarParametroAnalisis(this.props.idParametroAnalisis) }} className="btn btn-warning btn-space">Editar</button>
				</div>
			</div>
		}
	}

	render() {

		const { cargando, parametroAnalisis, error } = this.props.mostrar
		
		return <div className=''>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderParametroAnalisis(parametroAnalisis, cargando) }
		</div>
	}
}

export default Mostrar