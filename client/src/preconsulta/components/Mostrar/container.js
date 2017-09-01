import { connect } from 'react-redux'

import {
	mostrarPreConsulta
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state, ownProps) {
	return {
		mostrar: state.preConsulta.mostrar,
		idPreConsulta: ownProps.idPreConsulta
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


