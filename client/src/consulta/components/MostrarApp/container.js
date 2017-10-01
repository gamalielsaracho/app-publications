import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

import {
	listarAnalisisSolicitados
} from '../../../analisisSolicitado/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		idConsulta: ownProps.params.idConsulta,

		listar: state.analisisSolicitado.listar,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisSolicitados: () => {
			dispatch(listarAnalisisSolicitados())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


