import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
	listarPersonales,
	actualizarFormularioFiltro,

	abrirFormularioCrearPersonal,
	abrirFormularioEditarPersonal
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
		abrirFormularioEditarPersonal: (idPersonal) => {
			dispatch(abrirFormularioEditarPersonal(idPersonal))
		},
		abrirFormularioCrearPersonal: () => {
			dispatch(abrirFormularioCrearPersonal())
		},
		listarPersonales: () => {
			dispatch(listarPersonales())
		},
		actualizarFormularioFiltro: (valores) => {
			dispatch(actualizarFormularioFiltro(valores))
		},
		filtrarPersonales: (personales, valores) => {
 			console.log("el apellido es: "+valores.apellidos)
 			
 			personales = personales.filter((dato) => {
 				return dato.personal.apellidos.toLowerCase().match(valores.apellidos) &&
 					dato.personal.nombres.toLowerCase().match(valores.nombres) &&
 					dato.personal.correo.toLowerCase().match(valores.correo)
 			})
 
 			// console.log(personales)
 
 			return personales
 		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Listar)