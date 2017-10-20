import { connect } from 'react-redux'

import {
	mostrarPreConsulta
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.preConsulta.eliminar,
		mostrar: state.preConsulta.mostrar,

		// Para obtener el rol del personal.
		usuarioEstado: state.personal.usuarioEstado,

		// EL Id de la enfermera que creó la pre-consulta.
		preConsulta: state.preConsulta.mostrar.preConsulta
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarPreConsulta: (idPreConsulta) => {
			dispatch(mostrarPreConsulta(idPreConsulta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


