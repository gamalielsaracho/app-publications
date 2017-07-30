import React , { Component } from 'react'
import ReactModal from 'react-modal'

// import { Field, reduxForm, reset, initialize } from 'redux-form'
import { Field, reduxForm } from 'redux-form'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

const renderField = field => (
    <div>
      <label>{field.input.label}</label>
      <input {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

class Editar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderRol = this.renderRol.bind(this)
	}

	// componentWillMount() {
	// }

	// componentDidMount() {
	//   this.handleInitialize();
	// }

	// handleInitialize() {
	//   const initData = {
	//     "nombre": this.props.nombre,
	//   }

	//   this.props.initialize(initData);

	// }

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderRol(rol) {
		if(rol) {
			var styles = {
				btn: {
					marginLeft:"10px"
				}
			}

			const { handleSubmit } = this.props;

			return <div>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>

			      	<Field name="nombre" type="text" component={renderField} label="Nombre"/>
			      	<button action="submit">Save changes</button>
		    	</form>
			</div>
		} else {
			return <span></span>
		}
	}

	enviarFormulario(formProps) {
		alert(formProps.nombre)
		// this.props.editarRol(formProps)
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
			mostrarRolContainer: {
				"boxShadow":"0 0 10px #888",
				"padding":"1em",
				"background": "#fff"
			}
		}

		const { cargando, rol, error, abierto } = this.props.mostrarEditar

		console.log("Editar está: "+this.props.mostrarEditar.abierto)

		// console.log(this.props.editar)

		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div style={styles.mostrarRolContainer} className='container'>
					
					<div className='row center-lg center-md center-sm center-xs'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							<div>

								<MensajeOerror error={error} mensaje={null}/>
								{ this.renderCargando(cargando) }

								{ this.renderRol(rol) }
							</div>
						</div>
					</div>
				</div>

			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Editar