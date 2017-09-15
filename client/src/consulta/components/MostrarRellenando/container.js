import { connect } from 'react-redux'

import {
	mostrarConsulta,
	abrirFormularioEditarConsulta,
	eliminarConsulta
} from '../../actions'

import MostrarRellenando from './MostrarRellenando'

function mapStateToProps(state) {
	return {
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarRellenando)


