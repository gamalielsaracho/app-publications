import React, { Component } from 'react'
import { Field, reset } from 'redux-form'


import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import ListarAuditoria1MovimientosContainer from '../Listar'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class FiltrosApp extends Component {
	constructor(props) {
		super(props)
		this.renderFieldSelectActions = this.renderFieldSelectActions.bind(this)
	}

	componentWillMount() {
		if(this.props.urls.tableName && this.props.urls.idTableFather) {
			// console.log("ENTRO!!! listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre")
			
			this.props.listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre(this.props.urls.tableName, this.props.urls.idTableFather)
		} else if(this.props.urls.tableName) {
			this.props.listarAuditoria1MovimientosPorNombreTabla(this.props.urls.tableName)
		}
	}

	renderFieldSelectActions({ input, label, type, meta: { touched, error, warning } }) {
		let actions = [
			{ id: 1, description: 'actualización' },
			{ id: 2, description: 'eliminación' }
		]

		return <div>
			<div className='form-group'>
			    <label htmlFor={label}>{label}</label>
				<select {...input} name={name} className='form-control'>
					<option value=''>Seleccionar acción</option>
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


	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		const { auditoria1Movimientos, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
			let v = this.props.valoresFiltro
			let movimientosFiltrados = auditoria1Movimientos

			let condition = (
				v.idRegistro.length > 0 || v.fecha.length > 0 ||
				v.hora.length > 0 || v.accion.length > 0 ||
				v.nroDocumento.length > 0 || v.nombres.length > 0 ||
				v.apellidos.length > 0
			)

			if(condition){
				movimientosFiltrados = this.props.datosMovimientosFiltradosPorValores(movimientosFiltrados, v)
			}

			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				<form>
					<br/>
					<div className='row'>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='idRegistro' 
								type='text'
								component={renderField} 
								label='Código'/>
						</div>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='accion' 
								type='text'
								component={this.renderFieldSelectActions} 
								label='Acción'/>
						</div>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='fecha' 
								type='date'
								component={renderField} 
								label='Fecha'/>
						</div>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='hora' 
								type='time'
								component={renderField} 
								label='Hora'/>
						</div>
					</div>

					<h4 className='text-center'>Pesonal</h4>
					<div className='row'>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='nroDocumento' 
								type='text'
								component={renderField} 
								label='Nro. Documento'/>
						</div>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='nombres' 
								type='text'
								component={renderField} 
								label='Nombres'/>
						</div>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Field name='apellidos' 
								type='text'
								component={renderField} 
								label='Apellidos'/>
						</div>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<button onClick={reset} type="button" className="btn btn-success btn-space">Limpiar Filtros</button>
						</div>
					</div>
											
					{/* idRegistro
					fecha
					hora
					accion
					id_personal */}
				</form>

				<ListarAuditoria1MovimientosContainer 
					movimientosFiltrados={ movimientosFiltrados }/>
			</div>
		}

	}
}

export default FiltrosApp