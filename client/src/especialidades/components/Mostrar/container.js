import { connect } from 'react-redux'

import {
	cerrarModalMostrarEspecialidad
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.especialidad.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarEspecialidad: () => {
			dispatch(cerrarModalMostrarEspecialidad())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


