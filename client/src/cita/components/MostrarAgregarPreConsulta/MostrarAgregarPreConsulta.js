// import React, { Component } from 'react'
// import ReactModal from 'react-modal'

// import MensajeOerror from '../../../app/components/MensajeOerror'
// import Cargando from '../../../app/components/Cargando'


// import AnadirPreConsultaContainer from '../../../preconsulta/components/AnadirPreConsulta'

// // Formulario para crear una Pre-consulta.
// // Importamos el Formulario Aquí para mostrarlo en Modal.
// import FormularioPreConsultaContainer from '../../../preconsulta/components/Formulario'


// class MostrarAgregarPreConsulta extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.renderCargando = this.renderCargando.bind(this)
// 		this.renderCita = this.renderCita.bind(this)
// 	}

// 	renderCargando(cargando) {
// 		if(cargando) {
// 			return <Cargando/>
// 		} else {
// 			return <span></span>
// 		}
// 	}

// 	renderCita(dato) {
// 		if(dato) {
// 			return <div>
// 				<div className='row'>
// 					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
// 						<p><strong>Fecha:</strong>{ dato.cita.fecha }</p>
// 					</div>
// 					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
// 						<p><strong>Hora:</strong>{ dato.cita.hora }</p>
// 					</div>
// 				</div>

// 				<h4 className='text-center'>Profesional</h4>
// 				<div className='row'>
// 					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
// 						<p><strong>Nombre:</strong>{ dato.personal.nombres +' '+ dato.personal.apellidos }</p>
// 					</div>
// 					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
// 						<p><strong>Especialidad:</strong>{ dato.especialidad.descripcion }</p>
// 					</div>
// 				</div>

// 				<h4 className='text-center'>Paciente</h4>
// 				<div className='row'>
// 					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
// 						<p><strong>Nombre:</strong>{ dato.paciente.nombres +' '+ dato.paciente.apellidos }</p>
// 					</div>
// 					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
// 					</div>
// 				</div>
// 			</div>
// 		} else {
// 			return <span></span>
// 		}
// 	}

// 	render() {
// 		const customStyles = {
// 		    content : {
// 		  		height: '80vh',
// 		  		position: 'none'
// 		  	}
// 		}


// 		const { cargando, cita, error, abierto } = this.props.mostrarCitaAgregarPreConsulta

// 		// console.log("MostrarAgregarPreConsulta está: "+this.props.mostrarCitaAgregarPreConsulta.abierto)
		
// 		if(abierto) {
// 			return <ReactModal isOpen={abierto}
// 				       	contentLabel="Minimal Modal Example"
// 				       	style={customStyles}>

// 				<div className='container'>

// 					<div className='row'>
// 						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
// 							{ this.renderCargando(cargando) }
// 							<MensajeOerror error={error} mensaje={null}/>

// 							{ this.renderCita(cita) }

// 							{/* Formulario modal para agregar una Pre-consulta
// 								del día y le
// 								pasamos la cita como property para obtener los primary key
// 								y pasarle al formProps como unos objetos más.
// 							*/}
// 							<AnadirPreConsultaContainer datosCita={cita}/>
// 							<FormularioPreConsultaContainer datosCita={cita}/>
			

// 						</div>
// 					</div>
// 				</div>
// 			</ReactModal>
// 		} else {
// 			return <span></span>
// 		}

// 	}
// }

// export default MostrarAgregarPreConsulta