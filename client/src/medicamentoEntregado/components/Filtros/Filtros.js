import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import
	FieldSelectAreasContainer
from '../../../area/components/FieldSelectAreas'


import
	FieldSelectCiudadesContainer
from '../../../ciudad/components/FieldSelectCiudades'


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

		this.renderInputFarmaceutico = this.renderInputFarmaceutico.bind(this)

		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldRadio = this.renderFieldRadio.bind(this)
	}


	componentWillMount() {
		// this.props.()
		// this.props.()
	}

	renderFieldRadio({ input, name, label, type, value, meta: { touched, error, warning } }) {
		return <div>
			<div className='form-group'>
				<label className="radio-inline">
			    	<input type={type} name={name} value={value} {...input}/>
					<strong>{label}</strong>
				</label>
				{ touched && ((error && <label className="text-danger">{ error }</label>)) }
			</div>
		</div>
	}


	renderInputsPaciente() {
		return <div>
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


	renderInputFarmaceutico() {
		return <div>
			<h4 className='text-center'>Personal responsable</h4>
		
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='nroDocumento_farmaceutico' 
						type='number'
						component={renderField} 
						label='Nro. Documento'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='id_tipoDocumento_farmaceutico' 
						type='text'
						component={renderField} 
						label='Tipo. Doc'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='nombres_farmaceutico' 
						type='text'
						component={renderField} 
						label='Nombres'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Field name='apellidos_farmaceutico'
						type='text'
						component={renderField} 
						label='Apellidos'/>
				</div>
			</div>

		</div>
	}


	renderFormulario() {
					{/*
						<Field name='id_nivel' 
							type='text'
							listar={this.props.listarNiveles}
							component={FieldSelectNivelesContainer}
							showBtnAdd={false}
							label='Nivel'/>
					*/}
		return <form>
			{ this.renderInputsPaciente() }

			{ this.renderInputFarmaceutico() }

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='fechaEmisionDesde_medicamentosEntregados' 
						type='date'
						component={renderField} 
						label='Fecha emisión Desde'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='fechaEmisionHasta_medicamentosEntregados' 
						type='date'
						component={renderField} 
						label='Fecha emisión Hasta'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='hora_medicamentosEntregados' 
						type='time'
						component={renderField} 
						label='Hora'/>
				</div>

				{/*
					<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
						<Field name='impreso_medicamentosEntregados' type='radio' component={this.renderFieldRadio} value={'si'} label='Impreso'/>
						<Field name='impreso_medicamentosEntregados' type='radio' component={this.renderFieldRadio} value={'no'} label='No impreso'/>
					</div>			
				*/}
			</div>

		</form>
	}


	render() {
			return <div className='no-print-data'>
				<br/>

				{ this.renderFormulario() }


				<div className='row'>
					<div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
						<button type="button" onClick={ this.props.cerrarFormularioFiltro } className='btn btn-info'>Cerrar Filtros</button>
						<button onClick={this.props.reset} type="button" className="btn btn-danger btn-space">Limpiar Filtros</button>
					</div>
				</div>												
			</div>
	}
}

export default Filtros