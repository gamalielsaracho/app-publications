import React, { Component } from 'react'
import { Field, reduxForm, reset } from 'redux-form'

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

class Crear extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
	}

	componentWillMount() {
		this.props.cerrarFormularioRol()
	}

	enviarFormulario(formProps) {
		this.props.crearRol(formProps)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	render() {
		let styles = {
			btn: {
				marginLeft:"10px"
			},
			contenedorCrear: {
				"margin": "10px"
			}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props
		
		const { cargando, mensaje, error } = this.props.crear

		if(this.props.mostrar) {
			return <div style={styles.contenedorCrear}>

				{ this.renderCargando(cargando) }
				<MensajeOerror error={error} mensaje={mensaje}/>

				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<Field name='nombre' type='text' component={renderField} label='Nombre'/>
					
					<button className='#0288d1 light-blue darken-2 btn' type="submit" disabled={submitting}>Guardar</button>
					<button style={styles.btn} onClick={ this.props.cerrarFormularioRol } className='#0288d1 light-blue darken-2 btn'>Cancelar</button>
				</form>
			</div>
		} else {
			return <div style={styles.contenedorCrear}>
				<button onClick={ this.props.abrirFormularioRol } className='#0288d1 light-blue darken-2 btn'>Agregar</button>
			</div>
		}
	}
}

export default Crear
