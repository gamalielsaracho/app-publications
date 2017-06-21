import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
	listarUsuarios
} from '../../actions'

import Listar from './Listar'


function mapStateToProps(state) {
	return {
		listar: state.usuario.listar,
		usuarios: state.usuario.listar.usuarios
	}
}

// function filtrarUsuarios(usuarios) {
// 	var usuariosFiltrados = usuarios.filter((u) => {
// 		return u.apellido == 'perez'
// 	})

// 	return usuariosFiltrados
// }

function mapDispatchToProps(dispatch) {
	return {
		listarUsuarios: () => {
			dispatch(listarUsuarios())
		},
		filtrarUsuarios: (usuarios, apellido) => {
			console.log("el apellido es: "+apellido)
			usuarios = usuarios.filter((u) => {
				return u.apellido.toLowerCase().match(apellido)
			})
			
			console.log(usuarios)

			return usuarios
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Listar)