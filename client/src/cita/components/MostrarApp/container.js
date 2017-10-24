import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

import {
	abrirModalListarPreConsultasFechaDia
} from '../../../preconsulta/actions'

function mapStateToProps(state, ownProps) {
	return {
		// Obtenemos todos los parametros de la url.
		urls: ownProps.params,

		// obtenemos los datos de la cita que se está mostrando
		// para pasarle id_preconsulta al menu en la url para mostrar
		// la preconsulta.
		mostrar: state.cita.mostrar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirModalListarPreConsultasFechaDia: () => {
			dispatch(abrirModalListarPreConsultasFechaDia())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


