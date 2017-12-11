import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

// VER DIRECCIÓN.
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

		this.renderFieldSelectSexs = this.renderFieldSelectSexs.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)
	}


	componentWillMount() {
		this.props.listarAreasFuncion()
		this.props.listarCiudadesFuncion()
	}


	renderFieldSelectSexs({ input, label, type, meta: { touched, error, warning } }) {
		let actions = [
			{ id: 1, description: 'masculino' },
			{ id: 2, description: 'femenino' }
		]

		return <div>
			<div className='form-group'>
			    <label htmlFor={label}>{label}</label>
				<select {...input} name={name} className='form-control'>
					<option value=''>Seleccionar sexo</option>
					{
						actions.map((a) => {
							return <option key={a.id} value={a.description}>
								{ a.description }
							</option>
						})
					}
							
				</select>
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
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-2'>
					<Field name='nroDocumento_paciente' 
						type='number'
						component={renderField} 
						label='Nro. Documento'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-2'>
					<Field name='id_tipoDocumento_paciente' 
						type='text'
						component={renderField} 
						label='Tipo. Doc'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-2'>
					<Field name='nombres_paciente' 
						type='text'
						component={renderField} 
						label='Nombres'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-2'>
					<Field name='apellidos_paciente' 
						type='text'
						component={renderField} 
						label='Apellidos'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='sexo' 
						type='text'
						component={this.renderFieldSelectSexs} 
						label='Sexo'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='fechaNacimiento_paciente' 
						type='date'
						component={renderField} 
						label='Fecha nacimiento'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-3'>
					<Field name='direccion_paciente' 
						type='text'
						component={renderField} 
						label='Dirección'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='fechaMuerte_paciente' 
						type='text'
						component={renderField} 
						label='Fecha muerte'/>
				</div>
				
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='id_area' 
						type='text'
						listar={this.props.listarAreas}
						component={FieldSelectAreasContainer}
						showBtnAdd={false}
						label='Area'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='id_ciudad' 
						type='text'
						listar={this.props.listarCiudades}
						component={FieldSelectCiudadesContainer}
						showBtnAdd={false}
						label='Ciudad'/>
					
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='fechaIngresoDesde_paciente' 
						type='date'
						component={renderField} 
						label='Fecha ingreso Desde'/>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<Field name='fechaIngresoHasta_paciente' 
						type='date'
						component={renderField} 
						label='Fecha ingreso Hasta'/>
				</div>

			</div>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-3'>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-3'>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-3'>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-3'>
				</div>
			</div>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
				</div>
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