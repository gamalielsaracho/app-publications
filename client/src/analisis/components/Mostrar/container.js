import { connect } from 'react-redux'

import {
	mostrarAnalisis,
	eliminarAnalisis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.analisis.eliminar,
		mostrar: state.analisis.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarAnalisis: (idAnalisis) => {
			dispatch(mostrarAnalisis(idAnalisis))
		},
		eliminarAnalisis: (urlToRedirect, idAnalisis) => {
			dispatch(eliminarAnalisis(urlToRedirect, idAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


