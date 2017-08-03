import React, { Component } from 'react'
import { Link } from 'react-router' 

class Menu extends Component {
	constructor(props) {
		super(props)
		this.renderLinks = this.renderLinks.bind(this)
	}

	renderLinks(autenticado, usuario) {
		if(autenticado) {
			return <div>
				<li><Link to='/dashboard'>Panel</Link></li>
				<li><Link to='/usuarios'>Usuarios</Link></li>
				<li><Link to='/perfil'>{ usuario.correo }</Link></li>
				<li onClick={() => { this.props.salirUsuario() }}><a>Salir</a></li>
			</div>
		}else {
			return <div>
				<li><Link to='/'>Inicio</Link></li>
				<li><a href='#nosotros'>Nosotros</a></li>
				<li><a href='#horarios'>Horarios</a></li>
				<li><a href='#cantactanos'>Contactanos</a></li>
				<li><Link to='/registrarse'>Registrarse</Link></li>
				<li><Link to='/entrar'>Entrar</Link></li>
			</div>
		}
	}

	componentDidMount() {
		console.log(this.refs)
		
		$('.button-collapse').sideNav({
	      menuWidth: 300, // Default is 300
	      edge: 'left', // Choose the horizontal origin
	      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	      draggable: true, // Choose whether you can drag to open on touch screens,
	      onOpen: function(el) {  }, // A function to be called when sideNav is opened
	      onClose: function(el) {  }, // A function to be called when sideNav is closed
    	});

	}

	render() {
		const { cargando, error, datosToken, autenticado } = this.props.usuarioEstado

		console.log(this.props.usuarioEstado)

		let styles = {
			logoIcon: {
				color: '#2d4c50'
			}
		}

		return <nav className="nav-extended #00b0ff light-blue accent-3">
			<div className="nav-wrapper">
				<div className='container'>
					<div className='row center-lg center-md center-sm center-xs'>
						<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
							<Link className="brand-logo" to='/'>USF</Link>
				      		<a ref='btnMovil' href="#" data-activates="mobile-demo" className="button-collapse">
				      			<span className="foteer__icon icon-menu"></span>
				      		</a>
						</div>
						<div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
							<ul id="nav-mobile" className="right hide-on-med-and-down">
						       { this.renderLinks(autenticado, datosToken) }
						    </ul>
							<ul className="side-nav" id="mobile-demo">
						    	{ this.renderLinks(autenticado, datosToken) }
						    </ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	}
}

export default Menu