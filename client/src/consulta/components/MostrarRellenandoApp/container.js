import { connect } from 'react-redux'

import MostrarRellenandoApp from './MostrarRellenandoApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		idConsulta: ownProps.params.idConsulta,

		// obtenemos los datos de la cita que se está mostrando
		// para pasarle a FormularioConsultaContainer con el objetivo de
		// obtener id_paciente y pasarle a el objecto formProps del 
		// formulario. (VER)
		datosCita: state.cita.mostrar.cita
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarRellenandoApp)


