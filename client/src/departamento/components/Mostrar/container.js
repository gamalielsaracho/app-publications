import { connect } from 'react-redux'

import {
	cerrarModalMostrarDepartamento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.departamento.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarDepartamento: () => {
			dispatch(cerrarModalMostrarDepartamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


