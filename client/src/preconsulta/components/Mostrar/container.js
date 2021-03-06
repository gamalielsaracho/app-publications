import { connect } from 'react-redux'

import {
	mostrarPreConsulta
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.preConsulta.eliminar,
		mostrar: state.preConsulta.mostrar
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


