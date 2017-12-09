import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'


import 
	FieldSelectEspecialidadesContainer 
from '../../../especialidades/components/FieldSelectEspecialidades'


import 
	FieldSelectNivelesContainer 
from '../../../nivel/components/FieldSelectNiveles'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control input-md" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class Filtros extends Component {
	constructor(props) {
		super(props)
		this.renderInputsPaciente = this.renderInputsPaciente.bind(this)
		this.renderInputsMedico = this.renderInputsMedico.bind(this)

		this.renderInputHora = this.renderInputHora.bind(this)

		this.renderInputFechaDesde = this.renderInputFechaDesde.bind(this)
		this.renderInputFechaHasta = this.renderInputFechaHasta.bind(this)
		
		this.renderInputFechaProximaConsulta = this.renderInputFechaProximaConsulta.bind(this)
		
		this.renderSelectNiveles = this.renderSelectNiveles.bind(this)
		this.renderSelectEspecialidades = this.renderSelectEspecialidades.bind(this)


		this.renderFormularioHistorial = this.renderFormularioHistorial.bind(this)
		this.renderFormularioGeneral = this.renderFormularioGeneral.bind(this)
		this.renderFormularioPreConsulta = this.renderFormularioPreConsulta.bind(this)

		this.renderFormularioByParams = this.renderFormularioByParams.bind(this)

	}


	componentWillMount() {
		this.props.listarNivelesFuncion()
		this.props.listarEspecialidadesFuncion()
	}


	renderInputHora() {
		return <Field name='hora' 
			type='time'
			component={renderField} 
			label='Hora'/>
	}


	renderInputFechaProximaConsulta() {
		return <Field name='fechaProximaConsulta' 
			type='date'
			component={renderField} 
			label='Próxima consulta'/>
	}

	renderInputFechaDesde() {
		return <Field name='fechaDesde' 
			type='date'
			component={renderField} 
			label='Fecha desde'/>
	}

	renderInputFechaHasta() {
		return <Field name='fechaHasta' 
			type='date'
			component={renderField} 
			label='Fecha hasta'/>
	}

	renderSelectNiveles() {
		return <Field name='id_nivel' 
			type='text'
			listar={this.props.listarNiveles}
			component={FieldSelectNivelesContainer}
			showBtnAdd={false}
			label='Nivel'/>
	}

	renderSelectEspecialidades() {
		return <Field name='id_especialidad' 
			type='text'
			listar={this.props.listarEspecialidades}
			component={FieldSelectEspecialidadesContainer} 
			label='Especialidad'
			showBtnAdd={false}/>
	}

	renderInputsPaciente() {
		return <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
			<h4 className='text-center'>Paciente</h4>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='nroDocumento_paciente' 
						type='number'
						component={renderField} 
						label='Nro. Documento'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='id_tipoDocumento_paciente' 
						type='text'
						component={renderField} 
						label='Tipo. Doc'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='nombres_paciente' 
						type='text'
						component={renderField} 
						label='Nombres'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='apellidos_paciente' 
						type='text'
						component={renderField} 
						label='Apellidos'/>
				</div>
			</div>
		</div>
	}

	renderInputsMedico() {
		return <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
			<h4 className='text-center'>Médico/ca</h4>
		
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='nroDocumento_medico' 
						type='number'
						component={renderField} 
						label='Nro. Documento'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='id_tipoDocumento_medico' 
						type='text'
						component={renderField} 
						label='Tipo. Doc'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='nombres_medico' 
						type='text'
						component={renderField} 
						label='Nombres'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='apellidos_medico' 
						type='text'
						component={renderField} 
						label='Apellidos'/>
				</div>
			</div>

		</div>
	}


	renderFormularioHistorial() {
		return <form>
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderSelectNiveles() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputHora() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaProximaConsulta() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderSelectEspecialidades() }
				</div>
			</div>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaDesde() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaHasta() }
				</div>
			</div>

			<div className='row'>

				{ this.renderInputsMedico() }
			</div>
		</form>
	}


	renderFormularioGeneral() {
		return <form>
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderSelectNiveles() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputHora() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaProximaConsulta() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderSelectEspecialidades() }
				</div>
			</div>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaDesde() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaHasta() }
				</div>
			</div>

			<div className='row'>
				{ this.renderInputsPaciente() }
				{ this.renderInputsMedico() }
			</div>
		</form>
	}


	renderFormularioPreConsulta() {
		return <form>
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderSelectNiveles() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputHora() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderInputFechaProximaConsulta() }
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					{ this.renderSelectEspecialidades() }
				</div>
			</div>

			<div className='row'>
				{ this.renderInputsMedico() }
			</div>
		</form>
	}

	renderFormularioByParams() {
		if(this.props.urls.idPaciente) {
			return this.renderFormularioHistorial()
		} else {
			if(this.props.urls.idPreConsulta) {
				return this.renderFormularioPreConsulta()
			} else {
				return this.renderFormularioGeneral()
			}
		}
	}

	render() {
			return <form className='no-print-data'>
				<br/>

				{ this.renderFormularioByParams() }


				<div className='row'>
					<div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
						<button type="button" onClick={ this.props.cerrarFormularioFiltro } className='btn btn-info'>Cerrar Filtros</button>
						<button onClick={this.props.reset} type="button" className="btn btn-danger btn-space">Limpiar Filtros</button>
					</div>
				</div>												
			</form>
	}
}

export default Filtros