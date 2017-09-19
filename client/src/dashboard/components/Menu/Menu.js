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
			<li><Link to='/usuarios'>Usuarios (Adm) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Adm) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Adm) <span className="badge">0</span></Link></li>
			<li><Link to='/ciudades'>Ciudades (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/areas'>Areas (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/alergias'>Alergias (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/citas'>Citas (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/niveles'>Niveles (Adm) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/parametros-preconsulta'>Parametros pre-consulta (Adm) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/unidades-parametro-preconsulta'>Unidades pre-consulta (Adm) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/diagnosticos'>Diagnosticos (Adm) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/consultas'>Consultas (Adm) <span className="badge">8</span></Link></li>			
		</ul>
	}

	ventanillaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/ciudades'>Ciudades (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/areas'>Areas (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/alergias'>Alergias (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/citas'>Citas (Ven) <span className="badge">8</span></Link></li>
		</ul>
	}

	enfermeriaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/alergias'>Alergias (Enf) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Enf) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/citas'>Citas (Enf) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/parametros-preconsulta'>Parametros pre-consulta (Enf) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/unidades-parametro-preconsulta'>Unidades pre-consulta (Enf) <span className="badge">8</span></Link></li>			
		</ul>
	}

	medicinaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/alergias'>Alergias (Med) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/pacientes'>Pacientes (Med) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/citas'>Citas (Med) <span className="badge">8</span></Link></li>
			<li><Link to='/dashboard/diagnosticos'>Diagnosticos (Med) <span className="badge">8</span></Link></li>			
			<li><Link to='/dashboard/consultas'>Consultas (Med) <span className="badge">8</span></Link></li>			
		</ul>
	}

	farmaciaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/dashboard/nombres-medicamentos'>Nombres-medicamentos (Farm)</Link></li>
			<li><Link to='/dashboard/presentaciones'>presentaciones (Farm)</Link></li>
			<li><Link to='/dashboard/tipos-consumos'>Tipos consumos (Farm)</Link></li>
			<li><Link to='/dashboard/dosis'>Dosis (Farm)</Link></li>					
			<li><Link to='/dashboard/unidades-medicamentos'>Unidades de medida (Farm)</Link></li>			
			<li><Link to='/dashboard/farmaceuticas'>Farmacéuticas (Farm)</Link></li>			
			<li><Link to='/dashboard/proveedores'>Proveedores (Farm)</Link></li>			
			{ /* Agregar solamente. si piden. */}
			{ /* <li><Link to='/dashboard/acciones'>Acciones (Farm)</Link></li> */}		
			<li><Link to='/dashboard/medicamentos'>Medicamentos (Farm)</Link></li>			
		</ul>
	}	

	laboratorioMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/usuarios'>Usuarios (Lap) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Lap) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Lap) <span className="badge">0</span></Link></li>
			<li><Link to='/ciudades'>Ciudades (Lap) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Lap) <span className="badge">8</span></Link></li>
		</ul>
	}


	render() {
		const { error, datosToken, autenticado } = this.props.usuarioEstado

		let personal = datosToken.personal
		let rol = datosToken.rol

		console.log(rol)

		if(personal) {
			return <div className='col-sm-3 col-md-2 back-green'>
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

			</div>
		} else {
			return <span></span>
		}
	}
}

export default Menu