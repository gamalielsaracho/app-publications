import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Field, reset } from 'redux-form'


import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import FieldSelectDiagnosticos from '../../../diagnostico/components/FieldSelectDiagnosticos'

import Estadistica1Container from '../Estadistica1'

import CabeceraEstadisticaContainer from '../../../app/components/CabeceraEstadistica'

class Estadistica1App extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.mostrarEstadistica1()
		this.props.listarDiagnosticosFuncion()
	}


	render() {
		const { handleSubmit, fieldDisabled, pristine, reset, submitting } = this.props		

		const { cargando, valoresEstadisticos, error } = this.props.mostrarValoresEstadisticos
		
		if(cargando) {
			return <Cargando/>
		} else {
			console.log('valoresEstadisticos')

			console.log(valoresEstadisticos)
			return <div>
				<form className='no-print-data'>
					<Field name='id_diagnostico' 
						type='text'
						listar = { this.props.listarDiagnosticos }
						component={FieldSelectDiagnosticos} 
						label='Diagnóstico'
						showBtnAdd={false}/>

					<button className='btn btn-success no-print-data' 
						onClick={() => {
							window.print()
						}}>Imprimir o Exportar a PDF</button>
				</form>
				<MensajeOerror error={error} mensaje={null}/>


				<br/>
				<hr/>
				<CabeceraEstadisticaContainer
					styleData={''}
					fechaCreacion = { this.props.fechaTratamiento }/>

				<h3 className='text-center'>Reporte estadístico de enfermedad detectada</h3>
				<Estadistica1Container
					valoresFiltro = { this.props.valoresFiltro }
					datos = {this.props.datosFiltradosPorDiagnostico(valoresEstadisticos, this.props.valoresFiltro) }/>
			</div>
		}

	}
}

export default Estadistica1App