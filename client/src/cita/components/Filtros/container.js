// import { connect } from 'react-redux'
// import { Field, reduxForm, formValueSelector } from 'redux-form'

// import {

// } from '../../actions'

// import {
// 	listarEspecialidades
// } from '../../../especialidades/actions'

// import {
// 	listarPersonales
// } from '../../../usuario/actions'

// import Filtros from './Filtros'

// function mapStateToProps(state) {
// 	return {

// 		// Lista de especialidades para mostrar dentro del select option.
// 		listaEspecialidades: state.especialidad.listar,

// 		// Lista los Médicos/as para mostrar dentro del select option Multiple.
// 		listaPesonales: state.personal.listar,

//     	valoresCitaFiltro: {
//     		hola: selector(state, 'hola')
//     	}
// 	}
// }


// function mapDispatchToProps(dispatch) {
// 	return {
// 		listarEspecialidades: () => {
// 			dispatch(listarEspecialidades())
// 		},
// 		listarPersonales: () => {
// 			dispatch(listarPersonales())
// 		}
// 	}
// }

// const form = reduxForm({
//   form: 'FormularioFiltrosCita'
// })

// export const selector = formValueSelector('FormularioFiltrosCita')
// // console.log(selector(state.cita.valoresCitaFiltro, 'hola'))

// export default connect(mapStateToProps, mapDispatchToProps)(form(Filtros))
