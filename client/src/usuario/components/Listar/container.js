import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
	listarUsuarios,
	actualizarFormularioFiltro
} from '../../actions'

import Listar from './Listar'


function mapStateToProps(state) {
	return {
		listar: state.usuario.listar,
		filtro: state.usuario.filtro
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listarUsuarios: () => {
			dispatch(listarUsuarios())
		},
		actualizarFormularioFiltro: (valores) => {
			dispatch(actualizarFormularioFiltro(valores))
		},
		filtrarUsuarios: (usuarios, valores) => {
			console.log("el apellido es: "+valores.apellido)
			
			usuarios = usuarios.filter((u) => {
				return u.apellido.toLowerCase().match(valores.apellido) &&
					u.nombre.toLowerCase().match(valores.nombre) &&
					u.correo.toLowerCase().match(valores.correo)
			})

			// console.log(usuarios)

			return usuarios
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Listar)