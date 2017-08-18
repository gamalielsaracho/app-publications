import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../../../departamento/components/Formulario'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="form-group">
      <label htmlFor={label}>{ label }</label>
      <input className="form-control" {...input} placeholder={label} type={type}/>
    </div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderFieldSelectDepartamento = this.renderFieldSelectDepartamento.bind(this)
	}

	componentWillMount() {
		this.props.listarDepartamentos()
	}

	enviarFormulario(formProps) {
		if(this.props.editarContenido) {
			this.props.editarCiudad(formProps)
		} else {
			this.props.crearCiudad(formProps)
		}
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderFieldSelectDepartamento({ input, label, listaDepartamentos, type, meta: { touched, error, warning } }) {
		let departamentos = listaDepartamentos.departamentos

		if(departamentos) {
			return <div className="form-group">
			    <label htmlFor={label}>{label}</label>

				<div className='form-inline'>
					<div className="form-group">
						<select {...input} name={name} className='form-control'>
							<option value=''>Selecionar Departamento</option>
							{
								departamentos.map((departamento) => {
									return <option key={departamento.id_departamento} value={departamento.id_departamento}>
										{ departamento.descripcion }
									</option>
								})
							}
								
						</select>
					</div>

					<button type='button' onClick={ this.props.abrirFormularioCrearDepartamento } className='btn btn-success btn-space btn-sm'>
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo Departamento
					</button>

			    	{ touched && ((error && <div><br/><label className="text-danger">{ error }</label></div>)) }
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
		    content : {
			    height: '50vh',
		  		position: 'none'
		  	}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props
		
		const { 
			abirtoCrear, abirtoEditar, error, cargando, ciudad 
		} = this.props.formulario

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario ciudad</h4>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							<MensajeOerror error={error} mensaje={null}/>
							{ this.renderCargando(cargando) }

							<FormularioContainer/>

							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								
								<Field name='id_departamento' type='text' component={this.renderFieldSelectDepartamento} listaDepartamentos={this.props.listaDepartamentos} label='Departamento:'/>
								<Field name='descripcion' type='text' component={renderField} label='Descripción'/>
														
								<button type="submit" className='btn btn-info btn-space' disabled={submitting}>Guardar</button>
								<button type='button' onClick={ this.props.cerrarFormularioCiudad } className='btn btn-primary btn-space'>Cancelar</button>
							</form>
						</div>
						
					</div>
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
