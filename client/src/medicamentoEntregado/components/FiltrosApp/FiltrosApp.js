import React, { Component } from 'react'
import { Field, reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import ListarMedicamentosEntregadosContainer from '../Listar'

import FiltrosMedicamentosEntregadosContainer from '../Filtros'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control input-md" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class FiltrosApp extends Component {
	constructor(props) {
		super(props)
		this.renderFormularioFiltros = this.renderFormularioFiltros.bind(this)
		
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarMedicamentosEntregados()
	}


	renderFormularioFiltros() {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		const { abierto } = this.props.formularioFiltro

		if(abierto) {
			return <FiltrosMedicamentosEntregadosContainer 
						reset={reset}/>
		} else {
			return <div>
				<br/>
				<div className='row'>
					<div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
						<button onClick={ this.props.abrirFormularioFiltro } className='btn btn-info'>Filtrar datos</button>
					</div>
				</div>
			</div> 
		}
	}


	render() {

		const { medicamentosEntregados, cargando } = this.props.listar


		console.log(medicamentosEntregados)

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {

			let v = this.props.valoresFiltro
			let medicamentosEntregadosFiltrados = medicamentosEntregados

			let condition = (
				v.nroDocumento_paciente.length > 0 ||
				v.id_tipoDocumento_paciente.length > 0 ||
				v.nombres_paciente.length > 0 ||
				v.apellidos_paciente.length > 0 ||
				v.nroDocumento_farmaceutico.length > 0 ||
				v.id_tipoDocumento_farmaceutico.length > 0 ||
				v.nombres_farmaceutico.length > 0 ||
				v.apellidos_farmaceutico.length > 0 ||
				v.fechaEmisionDesde_medicamentosEntregados.length > 0 ||
				v.fechaEmisionHasta_medicamentosEntregados.length > 0 ||
				v.hora_medicamentosEntregados.length > 0 ||
				
				v.impreso_medicamentosEntregados == 'si' ||
				v.impreso_medicamentosEntregados == 'no'
			)

			if(v.impreso_medicamentosEntregados == 'si') {
				v.impreso_medicamentosEntregados = 1
			} else {
				v.impreso_medicamentosEntregados = 0
			}


			if(v.fechaEmisionHasta_medicamentosEntregados.length && !v.fechaEmisionDesde_medicamentosEntregados.length) {
				v.fechaEmisionDesde_medicamentosEntregados = v.fechaEmisionHasta_medicamentosEntregados
			}

			
			if(condition){
				medicamentosEntregadosFiltrados = this.props.medicamentosEntregadosFiltradosEnGeneral(medicamentosEntregadosFiltrados, v)
			}


			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderFormularioFiltros() }
 
				<ListarMedicamentosEntregadosContainer 
					medicamentosEntregadosFiltrados={ medicamentosEntregadosFiltrados }/>
			</div>
		}

	}
}

export default FiltrosApp