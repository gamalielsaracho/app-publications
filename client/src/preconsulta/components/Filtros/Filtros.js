import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import ListarPreConsultasContainer from '../Listar'

import FieldSelectNivelesContainer from '../../../nivel/components/FieldSelectNiveles'


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
	}

	componentWillMount() {
		this.props.listarNivelesFuncion()
	}

	render() {
			return <form>
				<br/>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
						<Field name='fecha' 
							type='date'
							component={renderField} 
							label='Fecha'/>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
						<Field name='hora' 
							type='time'
							component={renderField} 
							label='Hora'/>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
						<Field name='id_nivel' 
							type='text'
							listar={this.props.listarNiveles}
							component={FieldSelectNivelesContainer} 
							label='Nivel' 
							showBtnAdd={false}/>
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
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
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
						<h4 className='text-center'>Personal</h4>
		
						<div className='row'>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name='nroDocumento_enfermera' 
									type='number'
									component={renderField} 
									label='Nro. Documento'/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name='id_tipoDocumento_enfermera' 
									type='text'
									component={renderField} 
									label='Tipo. Doc'/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name='nombres_enfermera' 
									type='text'
									component={renderField} 
									label='Nombres'/>
							</div>
							<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
								<Field name='apellidos_enfermera' 
									type='text'
									component={renderField} 
									label='Apellidos'/>
							</div>
						</div>
					</div>
				</div>


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