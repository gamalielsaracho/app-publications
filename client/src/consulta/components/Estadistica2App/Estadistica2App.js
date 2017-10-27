import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Field, reset } from 'redux-form'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'


import Estadistica2Container from '../Estadistica2'

class Estadistica2App extends Component {
	constructor(props) {
		super(props)
		this.renderFieldSelectYears = this.renderFieldSelectYears.bind(this)
	}

	componentWillMount() {
		this.props.mostrarEstadistica2()
	}

	renderFieldSelectYears({ input, label, type, meta: { touched, error, warning } }) {
		let years = [
			{ description: 2016 },
			{ description: 2017 },
			{ description: 2018 },
			{ description: 2019 },
			{ description: 2020 },
			{ description: 2021 },
			{ description: 2022 },
			{ description: 2023 },
			{ description: 2024 },
			{ description: 2025 },
			{ description: 2026 },
			{ description: 2027 },
			{ description: 2028 },
			{ description: 2029 }
		]

		return <div>
			<div className='form-group'>
			    <label htmlFor={label}>{label}</label>
				<select {...input} name={name} className='form-control'>
					<option value=''>Seleccionar Año</option>
					{
						years.map((y) => {
							return <option key={y.description} value={y.description}>
								{ y.description }
							</option>
						})
					}
							
				</select>
			</div>
		</div>
	}

	render() {
		const { handleSubmit, fieldDisabled, pristine, reset, submitting } = this.props		

		const { cargando, valoresEstadisticos, error } = this.props.mostrarValoresEstadisticos
		
		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
						<form className='no-print-data'>
							<Field name='anho' 
								type='text'
								component={this.renderFieldSelectYears} 
								label='Años'/>

							<button className='btn btn-success no-print-data' 
								onClick={() => {
									window.print()
								}}>Imprimir o Exportar a PDF</button>
						</form>
					</div>
				</div>

				<MensajeOerror error={error} mensaje={null}/>

				<h3 className='text-center'>Reporte 2 estadístico de enfermedad detectada</h3>
				<Estadistica2Container
					valoresFiltro = { this.props.valoresFiltro }
					datos = {this.props.datosFiltradosPorAnho(valoresEstadisticos, this.props.valoresFiltro) }/>
			</div>
		}

	}
}

export default Estadistica2App