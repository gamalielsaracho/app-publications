import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      { touched && ((error && <span>{error}</span>)) }
    </div>
    <br/>
  </div>
)

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
	}

	// componentWillMount() {
	// 	if(this.props.enableReinitialize) {

	// 	} else {

	// 	}
	// }

	enviarFormulario(formProps) {
		console.log(this.props.editarContenido)

		if(this.props.editarContenido) {
			this.props.editarRol(formProps)
		} else {
			this.props.crearRol(formProps)
		}
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
			// overlay : {
			//     position: '',
			//     // top: 0,
			//     // left: 0,
			//     // right: 0,
			//     // bottom: 0,
			//     // backgroundColor: 'rgba(255, 255, 255, 0.75)'
			// },
		    content : {
			    top: '51%',
			    left: '50%',
			    right: 'auto',
			    bottom: 'auto',
			    marginRight: '-50%',
			    transform: 'translate(-50%, -50%)',
			    border: 'none',
			    background: 'none'
		  	}
		}


		let styles = {
			btn: {
				marginLeft:"10px"
			},
			contenedorCrear: {
				"margin": "10px"
			},
			mostrarRolContainer: {
				"boxShadow":"0 0 10px #888",
				"padding":"1em",
				"background": "#fff"
			}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props
		
		const { 
			abirtoCrear, abirtoEditar, error, cargando, rol 
		} = this.props.formulario

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div style={styles.mostrarRolContainer}>
							
					<MensajeOerror error={error} mensaje={null}/>
					{ this.renderCargando(cargando) }

					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						<Field name='nombre' type='text' component={renderField} label='Nombre'/>
											
						<button className='#0288d1 light-blue darken-2 btn' type="submit" disabled={submitting}>Guardar</button>
						<button style={styles.btn} onClick={ this.props.cerrarFormularioRol } className='#0288d1 light-blue darken-2 btn'>Cancelar</button>
					</form>

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
