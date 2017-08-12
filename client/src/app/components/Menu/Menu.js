import React, { Component } from 'react'
import { Link } from 'react-router' 

class Menu extends Component {
	constructor(props) {
		super(props)
		this.renderLinks = this.renderLinks.bind(this)
	}

	renderLinks(autenticado, personal) {
		if(autenticado) {
			return <ul className="nav navbar-nav navbar-right">
				<li><Link to='/dashboard' className='menu__text-link'>Panel</Link></li>
				<li><Link to='/perfil' className='menu__text-link'>{ personal.correo }</Link></li>
				<li onClick={() => { this.props.salirPersonal() }}><a className='menu__text-link'>Salir</a></li>
			</ul>
		}else {
			return <ul className="nav navbar-nav navbar-right">
				<li><Link to='/' className='menu__text-link'>Inicio</Link></li>
				<li><a href='#nosotros' className='menu__text-link'>Nosotros</a></li>
				<li><a href='#horarios' className='menu__text-link'>Horarios</a></li>
				<li><a href='#cantactanos' className='menu__text-link'>Contactanos</a></li>
				<li><Link to='/registrarse' className='menu__text-link'>Registrarse</Link></li>
				<li><Link to='/entrar' className='menu__text-link'>Entrar</Link></li>
			</ul>
		}
	}


	render() {
		const { error, datosToken, autenticado } = this.props.usuarioEstado

		console.log(this.props.usuarioEstado)

		return <div className='back-nav'>
			<nav className="navbar back-nav container">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span className="foteer__icon icon-list"></span>
			      </button>

			      <a className="navbar-brand menu__text-link" href="/">Unidad de Salud Familiar</a>
			    </div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

					{ this.renderLinks(autenticado, datosToken.personal) }

			    </div>
			  </div>
			</nav>
		</div>
	}
}

export default Menu