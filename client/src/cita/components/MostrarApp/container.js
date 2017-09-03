import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

function mapStateToProps(state, ownProps) {
	return {
		idCita: ownProps.params.idCita,

		// obtenemos los datos de la cita que se está mostrando
		// para pasarle id_preconsulta al menu en la url para mostrar
		// la preconsulta.
		cita: state.cita.mostrar.cita
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


