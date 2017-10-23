import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

class Filtros extends Component {
	constructor(props) {
		super(props)
		// Lista de Inputs.
		this.renderSelectPersonales = this.renderSelectPersonales.bind(this)
		this.renderSelectTiposDcs = this.renderSelectTiposDcs.bind(this)

		// filter.
		this.handleChange = this.handleChange.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarMedicosFuncion()
	}

	renderSelectPersonales(listar) {
		// console.log('personales')
		// console.log(personales)

		if(listar.cargando) {
			return <p>Cargando..</p>
		} else {
			return <div className="form-group">
				<select onChange={this.handleChange} ref='idPersonal' className='form-control'>
					<option value=''>Médicos/as</option>
					{
						listar.personales.map((i) => {
							return <option key={i.personal.id_personal} value={i.personal.id_personal}>
								{ i.personal.nombres }
							</option>
						})
					}
				</select>
			</div>
		}
	}

	renderSelectTiposDcs() {

	}

	handleChange(e) {
		let valoresInputActualizando = {
			cita: {
				fechaDesde: ReactDOM.findDOMNode(this.refs.fechaDesde).value,
				fechaHasta: ReactDOM.findDOMNode(this.refs.fechaHasta).value,
				// fechaActual: moment().format('YYYY-MM-DD'),
				pendiente: ReactDOM.findDOMNode(this.refs.pendiente).value
			},
			paciente: {
				nroDocumento: ReactDOM.findDOMNode(this.refs.nroDocumento).value,
				id_tipoDocumento: ReactDOM.findDOMNode(this.refs.id_tipoDocumento).value,
				nombres: ReactDOM.findDOMNode(this.refs.nombres).value,
				apellidos: ReactDOM.findDOMNode(this.refs.apellidos).value,
				sexo: 'aun no..',
				// ReactDOM.findDOMNode(this.refs.sexo).value
				edad: ReactDOM.findDOMNode(this.refs.edad).value
			},
			personal: {
				id_personal: ReactDOM.findDOMNode(this.refs.idPersonal).value
			}
		}

		// console.log(valoresInputActualizando)

		this.props.actualizarFormularioFiltro(valoresInputActualizando)
	}

	render() {
		let filtro = this.props.filtro		

		return <div>
			<div className='row'>
				<div className='col-lg-2'>
					<div className="form-group">
						<label>Fecha Desde</label>
						<input className='form-control' type='date'
							value={filtro.cita.fechaDesde} ref='fechaDesde'
							onChange={this.handleChange} />
					</div>
				</div>
				<div className='col-lg-2'>
					<div className="form-group">
						<label>Fecha Hasta</label>
						<input className='form-control' type='date' placeholder='Fecha Hasta'
							value={filtro.cita.fechaHasta} ref='fechaHasta'
							onChange={this.handleChange} />
					</div>				
				</div>
				<div className='col-lg-2'>
					<p>Ya realizadas</p>
					<div className="form-check">
						<label className="form-check-label">
						    <input type="radio" className="form-check-input" 
						    name="optionsRadios" id="optionsRadios2"
						    value={1} ref='pendiente'
							onChange={this.handleChange}/>
						    Sí
						</label>
					</div>

					<div className="form-check">
						<label className="form-check-label">
							<input type="radio" className="form-check-input"
							name="optionsRadios" id="optionsRadios3"
							value={0} ref='pendiente'
							onChange={this.handleChange}/>
							No
						</label>
					</div>
				</div>
			</div>


			<div className='row'>
				<div className='col-lg-2'>
					<label>Nro. de documento</label>
					<div className="form-group">
						<input className='form-control' type='text'
							value={filtro.paciente.nroDocumento} ref='nroDocumento'
							onChange={this.handleChange}/>
					</div>
				</div>
				<div className='col-lg-2'>
					<label>Tipo de documento</label>
					<div className="form-group">
						<input className='form-control' type='text'
							value={filtro.paciente.id_tipoDocumento} ref='id_tipoDocumento'
							onChange={this.handleChange}/>
					</div>				
				</div>
				<div className='col-lg-2'>
					<div className="form-group">
						<label>Nombre</label>
						<input className='form-control' type='text'
							value={filtro.paciente.nombres} ref='nombres'
							onChange={this.handleChange}/>
					</div>				
				</div>
				<div className='col-lg-2'>
					<div className="form-group">
						<label>Apellido</label>
						<input className='form-control' type='text'
							value={filtro.paciente.apellidos} ref='apellidos'
							onChange={this.handleChange}/>
					</div>				
				</div>
				<div className='col-lg-2'>
					<div className="form-group">
						<label>Edad</label>
						<input className='form-control' type='number'
							value={filtro.paciente.edad} ref='edad'
							onChange={this.handleChange}/>
					</div>				
				</div>
			</div>

			<div className='row'>
				<div className='col-lg-2'>
					{ this.renderSelectPersonales(this.props.listarMedicos) }
				</div>
			</div>

		</div>
	}
}

export default Filtros
