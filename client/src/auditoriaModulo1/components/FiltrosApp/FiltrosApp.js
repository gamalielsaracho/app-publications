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
		const { auditoria1Movimientos, cargando, error } = this.props.listar


		if(cargando) {
			return <Cargando/>
		} else {
			let v = this.props.valoresFiltro
			let movimientosFiltrados = auditoria1Movimientos

			if(v.idRegistro.length > 0 || v.accion.length > 0){
				movimientosFiltrados = this.props.datosMovimientosFiltradosPorValores(movimientosFiltrados, v)
			}

			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				<form>
					<Field name='idRegistro' 
						type='text'
						component={renderField} 
						label='Código'/>

						
					<Field name='accion' 
						type='text'
						component={this.renderFieldSelectActions} 
						label='Acción'/>
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