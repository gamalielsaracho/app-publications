import React, { Component } from 'react'
import { Link } from 'react-router' 

class Menu extends Component {
	constructor(props) {
		super(props)
		this.renderLinks = this.renderLinks.bind(this)
	}

	renderLinks(autenticado, usuario) {
		if(autenticado) {
			return <ul className="nav navbar-nav navbar-right">
				<li><Link to='/dashboard'>Panel</Link></li>
				<li><Link to='/usuarios'>Usuarios</Link></li>
				<li><Link to='/perfil'>{ usuario.correo }</Link></li>
				<li onClick={() => { this.props.salirPersonal() }}><a>Salir</a></li>
			</ul>
		}else {
			return <ul className="nav navbar-nav navbar-right">
				<li><Link to='/'>Inicio</Link></li>
				<li><a href='#nosotros'>Nosotros</a></li>
				<li><a href='#horarios'>Horarios</a></li>
				<li><a href='#cantactanos'>Contactanos</a></li>
				<li><Link to='/registrarse'>Registrarse</Link></li>
				<li><Link to='/entrar'>Entrar</Link></li>
			</ul>
		}
	}


	render() {
		const { cargando, error, datosToken, autenticado } = this.props.usuarioEstado

		console.log(this.props.usuarioEstado)


		return <nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <a className="navbar-brand" href="/">Unidad de Salud Familiar</a>
		    </div>

		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

				{ this.renderLinks(autenticado, datosToken) }

		    </div>
		  </div>
		</nav>

	}
}

export default Menu