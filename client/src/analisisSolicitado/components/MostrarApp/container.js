import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

import {
	mostrarmostrarAnalisisPorIdAnalisisSolicitado,
	crearAnalisis
} from '../../../analisis/actions'

function mapStateToProps(state, ownProps) {
	return {
		// idAnalisisSolicitado: ownProps.params.idAnalisisSolicitado,

		mostrarByIdAnalisisSolicitado: state.analisis.mostrarByIdAnalisisSolicitado,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		mostrarmostrarAnalisisPorIdAnalisisSolicitado: (idAnalisisSolicitado) => {
			dispatch(mostrarmostrarAnalisisPorIdAnalisisSolicitado(idAnalisisSolicitado))
		},
		crearAnalisis: (datosObtenidos) => {
			dispatch(crearAnalisis(datosObtenidos))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


