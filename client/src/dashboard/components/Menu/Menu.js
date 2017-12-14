import React, { Component } from 'react'
import { Link } from 'react-router'
import removeAccents from 'remove-accents'

import jwtDecode from 'jwt-decode'

class Menu extends Component {
	constructor(props) {
		super(props)
		this.isRole = this.isRole.bind(this)

		this.adminMenu = this.adminMenu.bind(this)
		this.ventanillaMenu = this.ventanillaMenu.bind(this)
		this.enfermeriaMenu = this.enfermeriaMenu.bind(this)
		this.medicinaMenu = this.medicinaMenu.bind(this)
		this.farmaciaMenu = this.farmaciaMenu.bind(this)
		this.laboratorioMenu = this.laboratorioMenu.bind(this)
	}

	isRole(roleToCheck, toRender) {
		// let rolUsuario = 'administracion' // localStorage.
		// let rolUsuario = 'ventanilla'
		let rolUsuario = removeAccents(jwtDecode(localStorage.getItem('token')).rol)

		console.log(rolUsuario)

		if(rolUsuario == roleToCheck) {
			return toRender
		}

		return false
	}

	adminMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/modulos-auditados'>Auditoría (Adm)</Link></li>

			
			<li><Link to='/dashboard/personales'>Usuarios (Adm) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Adm) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Adm) <span className="badge">0</span></Link></li>
			<li><Link to='/dashboard/ciudades'>Ciudades (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/departamentos'>Departamentos (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/areas'>Areas (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/alergias'>Alergias (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/niveles'>Niveles (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas (Adm) </Link></li>
			
			<li><Link to='/dashboard/parametros-preconsulta'>Parametros pre-consulta (Adm) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/diagnosticos'>Diagnosticos (Adm) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/sintomas'>Síntomas (Adm) <span className="badge">8</span></Link></li>			
			
			<li><Link to='/dashboard/pre-consultas'>Pre-consultas (Adm) <span className="badge">8</span></Link></li>			

			<li><Link to='/dashboard/consultas'>Consultas (Adm) <span className="badge">8</span></Link></li>			


			{ /* FARMACIA. */}
			<h3>Farmacia</h3>
			<li><Link to='/dashboard/farmaceuticas'>Farmacéuticas (Adm)</Link></li>			
			<li><Link to='/dashboard/medicamentos'>Medicamentos (Adm)</Link></li>			
			<li><Link to='/dashboard/drogas'>Drogas (Adm)</Link></li>					
			
			<li><Link to='/dashboard/medicamentos-entregados'>Medicamentos entregados (Adm)</Link></li>					

			<li><Link to='/dashboard/nombres-medicamentos'>Nombres medicamentos (Adm)</Link></li>

			<li><Link to='/dashboard/presentaciones'>Presentaciones (Adm)</Link></li>
			{ /* 
			<li><Link to='/dashboard/tipos-consumos'>Tipos consumos (Adm)</Link></li> */}
						
			{ /* <li><Link to='/dashboard/unidades-medicamentos'>Unidades de medida (Adm)</Link></li>			
			<li><Link to='/dashboard/proveedores'>Proveedores (Adm)</Link></li> */}			
			
			{ /* Agregar solamente. si piden. */}
			{ /* <li><Link to='/dashboard/acciones'>Acciones (Adm)</Link></li> */}		
			{ /* <li><Link to='/dashboard/lotes-medicamentos'>Lotes (Adm)</Link></li> */}			


			<h3>Laboratorio</h3>
			<li><Link to='/dashboard/tipos-examenes'>Tipos examenes (Adm) </Link></li>
			<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas (Adm) </Link></li>
			<li><Link to='/dashboard/tipos-analisis'>Tipos análisis (Adm) </Link></li>
			
			<li><Link to='/dashboard/solicitudes-laboratorio'>Solicitudes (Adm) </Link></li>
		</ul>
	}

	ventanillaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/ciudades'>Ciudades (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/departamentos'>Departamentos (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/areas'>Areas (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Ven) <span className="badge">8</span></Link></li>
		</ul>
	}

	enfermeriaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/pacientes'>Pacientes (Enf) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/parametros-preconsulta'>Parametros pre-consulta (Enf) <span className="badge">8</span></Link></li>			
		</ul>
	}

	medicinaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/alergias'>Alergias (Med) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Med) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/diagnosticos'>Diagnosticos (Med) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/sintomas'>Síntomas (Med) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/pre-consultas'>Pre-consultas (Adm) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/consultas'>Consultas (Med) <span className="badge">8</span></Link></li>			
		</ul>
	}

	farmaciaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/farmaceuticas'>Farmacéuticas (Farm)</Link></li>			
			<li><Link to='/dashboard/medicamentos'>Medicamentos (Farm)</Link></li>			
			<li><Link to='/dashboard/drogas'>Drogas (Farm)</Link></li>

			<li><Link to='/dashboard/medicamentos-entregados'>Medicamentos entregados (Farm)</Link></li>					
			
			<li><Link to='/dashboard/nombres-medicamentos'>Nombres medicamentos (Farm)</Link></li>
			
			<li><Link to='/dashboard/presentaciones'>Presentaciones (Farm)</Link></li>
			
			{ /* 
			<li><Link to='/dashboard/tipos-consumos'>Tipos consumos (Farm)</Link></li>
			<li><Link to='/dashboard/dosis'>Dosis (Farm)</Link></li>					
			<li><Link to='/dashboard/unidades-medicamentos'>Unidades de medida (Farm)</Link></li>			
			<li><Link to='/dashboard/farmaceuticas'>Farmacéuticas (Farm)</Link></li>			
			<li><Link to='/dashboard/proveedores'>Proveedores (Farm)</Link></li>			
			{ /* Agregar solamente. si piden. */}
			{ /* <li><Link to='/dashboard/acciones'>Acciones (Farm)</Link></li> */}		
			
			{ /* <li><Link to='/dashboard/medicamentos'>Medicamentos (Farm)</Link></li>			
			<li><Link to='/dashboard/lotes-medicamentos'>Lotes (Farm)</Link></li> */}			

		</ul>
	}	

	laboratorioMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/tipos-examenes'>Tipos examenes (Lap)</Link></li>
			<li><Link to='/dashboard/unidades-medidas'>Unidades Medidas (Lap)</Link></li>
			<li><Link to='/dashboard/tipos-analisis'>Tipos análisis (Lap)</Link></li>
			
			<li><Link to='/dashboard/solicitudes-laboratorio'>Solicitudes (Lap)</Link></li>
		</ul>
	}


	render() {
		const { error, datosToken, autenticado } = this.props.usuarioEstado

		let personal = datosToken.personal
		let rol = datosToken.rol

		console.log(rol)

		if(personal) {
			return <div className='col-sm-3 col-md-2 back-green no-print-data'>
				<div className='row center-xs center-sm center-md center-lg'>
					<div className='col-xs-4 col-sm-6 col-md-6 col-lg-6'>
						<br/>
						<img className='img-circle img-responsive' src='http://localhost:8080/images/gama.jpg'/>
					</div>
				</div>
				<h4 className='text-center'>{ personal.nombres }</h4>
						
				{ this.isRole('administracion', this.adminMenu()) }
				{ this.isRole('ventanilla', this.ventanillaMenu()) }
				{ this.isRole('enfermeria', this.enfermeriaMenu()) }
				{ this.isRole('medico', this.medicinaMenu()) }
				{ this.isRole('farmacia', this.farmaciaMenu()) }
				{ this.isRole('laboratorio', this.laboratorioMenu()) }

			</div>
		} else {
			return <span></span>
		}
	}
}

export default Menu