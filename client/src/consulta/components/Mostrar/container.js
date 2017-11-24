import { connect } from 'react-redux'

import {
	mostrarConsulta,
	abrirFormularioEditarConsulta,
	eliminarConsulta,

	limpiarMensajeErrorConsulta
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.consulta.eliminar,
		mostrar: state.consulta.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarConsulta: (idConsulta) => {
			dispatch(mostrarConsulta(idConsulta))
		},
		abrirFormularioEditarConsulta: (idConsulta) => {
			dispatch(abrirFormularioEditarConsulta(idConsulta))
		},
		eliminarConsulta: (idConsulta) => {
			dispatch(eliminarConsulta(idConsulta))

			setTimeout(function () {
				dispatch(limpiarMensajeErrorConsulta())
			}, 5000)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


