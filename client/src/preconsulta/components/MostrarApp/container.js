import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../actions'


import {
	abrirFormularioCrearConsulta,
	mostrarConsultaPorIdPersonalYidPreConsulta
} from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// Obtenemos todos los parametros de la url.
		urls: ownProps.params,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname,

		// Para verificar si ya tiene una consulta segun el id_personal logeado
		// y id_preconsulta.
		mostrarPorIdPersonalYidPreConsulta: state.consulta.mostrarPorIdPersonalYidPreConsulta
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearConsulta: () => {
			dispatch(abrirFormularioCrearConsulta())
		},
		mostrarConsultaPorIdPersonalYidPreConsulta: (idPersonal, idPreConsulta) => {
			dispatch(mostrarConsultaPorIdPersonalYidPreConsulta(idPersonal, idPreConsulta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


