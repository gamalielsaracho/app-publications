import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectMedicamentosContainer from '../../../medicamento/components/FieldSelectMedicamentos'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
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
		this.renderListaDrogasByIdMedicamento = this.renderListaDrogasByIdMedicamento.bind(this)
		this.renderDrogasToEdit = this.renderDrogasToEdit.bind(this)


		this.renderFieldSelectMedicamentos = this.renderFieldSelectMedicamentos.bind(this)
	}

	componentWillMount() {
		this.props.listarMedicamentosFuncion()
		this.props.listarTodaLaListaMedicamentoDrogasFuntion()
	}

	// idMedicamentoEntregado es pasado como property al ser llamado 
	//  dentro de ListarMedicamentosAgregadosContainer.
	enviarFormulario(formProps) {


		if(this.props.editarContenido) {
			this.props.editarMedicamentoAgregado(formProps)
		} else {
			formProps.id_medicamentoEntregado = this.props.idMedicamentoEntregado
			formProps.id_medicamento = formProps.id_medicamento[0]
			this.props.crearMedicamentoAgregado(formProps)
		}

		console.log(formProps)
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

	renderFieldSelectMedicamentos(medicamentoAgregado) {
		
		if(!this.props.editarContenido) {
			return <div>
				<Field name='id_medicamento' type='text' 
					component={FieldSelectMedicamentosContainer}
					listar={this.props.listarMedicamentos} 
					label='Medicamento'/>
			</div>
		} else {
			return <div>
					<h3>{ 
						medicamentoAgregado.nombreMedicamento +' '+
				        medicamentoAgregado.cantidadXunidad +' '+
				        medicamentoAgregado.descripcion
				    }</h3>

			    	{ this.renderDrogasToEdit(medicamentoAgregado.drogas) }
					<strong>{ 
						medicamentoAgregado.nombre +' | '+
				        medicamentoAgregado.direccion +' | '+
				        medicamentoAgregado.telefono
				    }</strong>
			</div>
		}
	}

	renderFormulario(cargando, medicamentoAgregado) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							{ this.renderFieldSelectMedicamentos(medicamentoAgregado) }
						</div>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							{ this.renderListaDrogasByIdMedicamento() }
						</div>
					</div>

			    	<br/>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-2 col-lg-2'>
							<Field name='lote' type='text' component={renderField} label='Número de lote'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-2 col-lg-2'>
							<Field name='cantidad' type='number' component={renderField} label='Cantidad'/>
						</div>
					</div>
																		
					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioMedicamentoAgregado } className="btn btn-primary btn-space">Cancelar</button>

				</form>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '65vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, medicamentoAgregado 
		} = this.props.formulario

		// console.log('medicamentoAgregado ----------->')
		// console.log(medicamentoAgregado)
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario Agregar medicamento</h4>

					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
					</div>

					{ this.renderFormulario(cargando, medicamentoAgregado) }

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
