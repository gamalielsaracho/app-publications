import React, { Component } from 'react'
import { Link } from 'react-router'

import InitializeFromStateForm from '../InitializeFromStateForm'

class App extends Component {
	constructor(props) {
		super(props)
		this.renderLinks = this.renderLinks.bind(this)
	}

	// componentWillMount() {
	// 	const token = localStorage.getItem('token')

	// 	if(token) {
	// 		this.props.verificarTokenUsuario(token)
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
 //    if (this.props.cat.id != nextProps.cat.id) {
 //      this.setState({cat: nextProps.cat});
 //    }
 //    if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
 //      this.setState({catHobbies: nextProps.catHobbies, checkBoxHobbies: nextProps.checkBoxHobbies});
 //    }
 //  }

	// shouldComponentUpdate(next_props, next_state) {
	// 	console.log(next_state)
	// }

	renderLinks(autenticado, usuario) {
		console.log(usuario)
		if(autenticado) {
			return <div>
				<li><Link to='/dashboard'>Panel</Link></li>
				<li><Link to='/usuarios'>Usuarios</Link></li>
				<li><Link to='/perfil'>{ usuario.correo }</Link></li>
				<li onClick={() => { this.props.salirUsuario() }}><a>Salir</a></li>
			</div>
		}else {
			return <div>
				<li><Link to='/registrarse'>Registrarse</Link></li>
				<li><Link to='/entrar'>Entrar</Link></li>
			</div>
		}
	}

	render() {
		const { cargando, error, datosToken, autenticado } = this.props.usuarioEstado

		console.log(this.props.usuarioEstado)

		return <div>
			<nav className='#00b0ff light-blue accent-3'>
			    <div className="nav-wrapper container">
				    <div className='row'>
					    <div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
					      <a href="/" className="brand-logo">Logo</a>
					    </div>
					    <div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
						   <ul id="nav-mobile" className="right hide-on-med-and-down ">
						   	{ this.renderLinks(autenticado, datosToken) }
						   </ul>
					    </div>
				    </div>
			    </div>
		  	</nav>
		  	<InitializeFromStateForm/>
			{this.props.children}
		</div>
	}
}

export default App