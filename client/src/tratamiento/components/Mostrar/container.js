import { connect } from 'react-redux'

import {
	mostrarTratamiento,
	eliminarTratamiento,
	limpiarMensajeErrorTratamiento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state, ownProps) {
	return {
		eliminar: state.tratamiento.eliminar,

		mostrar: state.tratamiento.mostrar,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarTratamiento: (idTratamiento) => {
			dispatch(mostrarTratamiento(idTratamiento))
		},
		eliminarTratamiento: (idTratamiento) => {
			dispatch(eliminarTratamiento(idTratamiento))
			setTimeout(function () {
					dispatch(limpiarMensajeErrorTratamiento())
				}, 5000)
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


