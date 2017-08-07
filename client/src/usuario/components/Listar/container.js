import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
	listarPersonales,
	actualizarFormularioFiltro
} from '../../actions'

import Listar from './Listar'


function mapStateToProps(state) {
	return {
		listar: state.personal.listar,
		filtro: state.personal.filtro
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listarPersonales: () => {
			dispatch(listarPersonales())
		},
		actualizarFormularioFiltro: (valores) => {
			dispatch(actualizarFormularioFiltro(valores))
		},
		filtrarPersonales: (personales, valores) => {
			console.log("el apellido es: "+valores.apellido)
			
			personales = personales.filter((u) => {
				return u.apellido.toLowerCase().match(valores.apellido) &&
					u.nombre.toLowerCase().match(valores.nombre) &&
					u.correo.toLowerCase().match(valores.correo)
			})

			// console.log(personales)

			return personales
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Listar)