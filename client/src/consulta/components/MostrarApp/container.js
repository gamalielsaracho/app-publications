import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

import {
	listarAnalisisSolicitados
} from '../../../analisisSolicitado/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		listar: state.analisisSolicitado.listar,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname
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


