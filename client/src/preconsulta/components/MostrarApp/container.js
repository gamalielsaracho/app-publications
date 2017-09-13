import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

import {
	listarConsultas
} from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	return {
		idPreConsulta: ownProps.params.idPreConsulta,

		// obtenemos los datos de la cita que se está mostrando
		// para pasarle id_preconsulta al menu en la url para mostrar
		// la preconsulta.
		cita: state.cita.mostrar.cita,

		// Obtener las consultas para filtarla por id_preConsulta y id_personal
		// para mostrarlo dentro del menu y pasarle el id_consulta.
		listar: state.consulta.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarConsultas: () => {
			dispatch(listarConsultas())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


