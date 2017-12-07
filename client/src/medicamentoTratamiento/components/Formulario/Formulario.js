import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectMedicamentosContainer from '../../../medicamento/components/FieldSelectMedicamentos'

import 
	FieldSelectPresentacionesContainer 
from '../../../presentacion/components/FieldSelectPresentaciones'


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
		this.renderFormulario = this.renderFormulario.bind(this)
		this.renderFieldSelectMedicamentos = this.renderFieldSelectMedicamentos.bind(this)
		this.renderListaDrogasByIdMedicamento = this.renderListaDrogasByIdMedicamento.bind(this)
		this.renderDrogasToEdit = this.renderDrogasToEdit.bind(this)

		this.renderFiltersToEdit = this.renderFiltersToEdit.bind(this)
		this.renderInputMedicamentoNoExistenteToEdit = this.renderInputMedicamentoNoExistenteToEdit.bind(this)

	}

	componentWillMount() {
		this.props.listarMedicamentosFuncion()
		this.props.listarTodaLaListaMedicamentoDrogasFuntion()
		this.props.listarPresentacionesFuncion()
	}

	enviarFormulario(formProps) {

		if(!formProps.medicamentoNoExistente) {
			if(formProps.id_medicamento[0]) {
				formProps.id_medicamento = formProps.id_medicamento[0]
			} 
		}

		// idTratamiento es pasado como property al ser llamado dentro de 
		// ListarMedicamentosTratamientoContainer.
		if(this.props.editarContenido) {
			this.props.editarMedicamentoTratamiento(formProps)
		} else {
			formProps.id_tratamiento = this.props.idTratamiento
			this.props.crearMedicamentoTratamiento(formProps)
		}

		console.log('datosFormulario ----> |||||||')
		console.log(formProps)
	}


	renderFieldTextArea({ input, label, type, meta: { touched, error, warning } }) {
		return <div>
			<div className="form-group">
			 	<label htmlFor={label}>{label}</label>
		    	<textarea className="form-control" {...input} placeholder={label} type={type}>
		    	</textarea>
			</div>
		    { touched && ((error && <label className="text-danger">{ error }</label>)) }
		</div>
	}

	renderFiltersToEdit() {
		if(!this.props.editarContenido) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
					<Field name='id_presentacion' type='text' 
						component={FieldSelectPresentacionesContainer} 
						listar={this.props.listarPresentaciones}
						label='Presentación'
						showBtnAdd={false}/>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	renderInputMedicamentoNoExistenteToEdit(medicamentoTratamiento) {
		if(!this.props.editarContenido || medicamentoTratamiento.medicamentoNoExistente) {
			return <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
				<Field name='medicamentoNoExistente' type='text' component={renderField} label='Medicamento no existente'/>
			</div>
		} else {
			return <span></span>
		}
	}

	renderFieldSelectMedicamentos(medicamentoTratamiento) {
		
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_medicamento' type='text' 
					component={FieldSelectMedicamentosContainer}
					listar={this.props.listarMedicamentos}
					valoresFiltro={this.props.valoresFiltro}
					showBtnAdd={false}
					label='Medicamento'/>
			</div>
		} else {
			// console.log('medicamentoTratamiento')
			// console.log(medicamentoTratamiento)

			if(medicamentoTratamiento.medicamentoNoExistente) {
				return <div>
						<h3>{ 
							medicamentoTratamiento.medicamentoNoExistente
					    }</h3>
				</div>
			} else {
				return <div>
						<h3>{ 
							medicamentoTratamiento.nombreMedicamento +' '+
					        medicamentoTratamiento.presentacion
					    }</h3>

				    	{ this.renderDrogasToEdit(medicamentoTratamiento.drogas) }
						
				</div>
			}
		}
	}


	renderListaDrogasByIdMedicamento() {
		const { medicamentoDrogas, cargando, error } = this.props.listarMedicamentoDrogas
		
		let valores = {
			id_medicamento: this.props.id_medicamento
		}

		let drogas
		if(!cargando) {
			drogas = this.props.filtrarDrogasByIdMedicamento(medicamentoDrogas, valores)
		}

		// console.log('LISTA FILTRADA DE DROGAS ----->')
		// console.log(drogas)

		if(!this.props.editarContenido) {
			if(valores.id_medicamento) {
				return <div>
					{
						drogas.map((i) => {
							return <div key={i.medicamentoDroga.id_medicamentoDroga}>
					        	<h4>- { i.droga.descripcion +' '+i.medicamentoDroga.descripcionProporcion }</h4>
					        </div>		
						})
					}
				</div>
			} else {
				return <span></span>
			}
		} else {
			return <span></span>
		}
	}


	renderDrogasToEdit(drogas) {
		if(drogas) {
			return <div>
				{
					drogas.map((i) => {
						return <div key={i.medicamentoDroga.id_medicamentoDroga}>
					    	<h4>- { i.droga.descripcion +' '+i.medicamentoDroga.descripcionProporcion }</h4>
					    </div>		
					})
				}
			</div>
		} else {
			return <span></span>
		}
	}


	renderFormulario(cargando, medicamentoTratamiento) {
		const { handleSubmit, pristine, reset, submitting } = this.props

		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					
					{ this.renderFiltersToEdit() }

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							{ this.renderFieldSelectMedicamentos(medicamentoTratamiento) }
						</div>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							{ this.renderListaDrogasByIdMedicamento() }
						</div>
					</div>


			    	<br/>
					<div className='row'>
						{ this.renderInputMedicamentoNoExistenteToEdit(medicamentoTratamiento) }
						<div className='col-xs-12 col-sm-6 col-md-2 col-lg-2'>
							<Field name='cantidadConsumo' type='text' component={renderField} label='Proporción'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-2 col-lg-2'>
							<Field name='cantidadTiempo' type='text' component={renderField} label='Cantidad tiempo'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-2 col-lg-2'>
							<Field name='duracionConsumo' type='text' component={renderField} label='Duración consumo'/>
						</div>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<Field name='observaciones' type='textarea' 
								component={this.renderFieldTextArea} 
								label='Observaciones'/>
						</div>
					</div>

					<button type="submit" className='btn btn-info btn-space' disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioMedicamentoTratamiento } className='btn btn-primary btn-space'>Cancelar</button>
				</form>
			</div>
		}
	}


	render() {
		const customStyles = {
		    content : {
		  		height: '80vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, medicamentoTratamiento 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		// console.log(error)
		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario indicaciones</h4>

					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderFormulario(cargando, medicamentoTratamiento) }
				</div>

			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
