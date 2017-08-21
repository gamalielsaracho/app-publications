import React, { Component } from 'react'
import { Link } from 'react-router'

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
		let rolUsuario = 'administracion' // localStorage.

		console.log(jwtDecode(localStorage.getItem('token')))

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
			<li><Link to='dashboard/pacientes'>Pacientes (Adm) <span className="badge">8</span></Link></li>
		</ul>
	}

	ventanillaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/usuarios'>Usuarios (Ven) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Ven) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Ven) <span className="badge">0</span></Link></li>
			<li><Link to='/ciudades'>Ciudades (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/areas'>Areas (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/alergias'>Alergias (Ven) <span className="badge">8</span></Link></li>
			<li><Link to='/pacientes'>Pacientes (Adm) <span className="badge">8</span></Link></li>
		</ul>
	}

	enfermeriaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/usuarios'>Usuarios (Enf) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Enf) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Enf) <span className="badge">0</span></Link></li>
			<li><Link to='/ciudades'>Ciudades (Enf) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Enf) <span className="badge">8</span></Link></li>
		</ul>
	}

	medicinaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/usuarios'>Usuarios (Medi) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Medi) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Medi) <span className="badge">0</span></Link></li>
			<li><Link to='/ciudades'>Ciudades (Medi) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Medi) <span className="badge">8</span></Link></li>
		</ul>
	}

	farmaciaMenu() {
		return <ul className="nav nav-sidebar">
			<li><Link to='/usuarios'>Usuarios (Farm) <span className="badge">14</span></Link></li>
			<li><Link to='/roles'>Roles (Farm) <span className="badge">1</span></Link></li>
			<li><Link to='/especialidades'>Especialidades (Farm) <span className="badge">0</span></Link></li>
			<li><Link to='/ciudades'>Ciudades (Farm) <span className="badge">8</span></Link></li>
			<li><Link to='/departamentos'>Departamentos (Farm) <span className="badge">8</span></Link></li>
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
							
			</div>
		} else {
			return <span></span>
		}
	}
}

export default Menu