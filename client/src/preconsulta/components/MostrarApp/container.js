import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

import {
	listarConsultas,
	abrirFormularioCrearConsulta
} from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// Obtenemos todos los parametros de la url.
		urls: ownProps.params,

		// obtenemos los datos de la cita que se está mostrando
		// para pasarle a FormularioConsultaContainer con el objetivo de
		// obtener id_paciente y pasarle a el objecto formProps del 
		// formulario.
		datosCita: state.cita.mostrar,

		// Obtener las consultas para filtarla por id_preConsulta y id_personal
		// para mostrarlo dentro del menu y pasarle el id_consulta.
		listarConsultas: state.consulta.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarConsultasFuncion: () => {
			dispatch(listarConsultas())
		},
		abrirFormularioCrearConsulta: () => {
			dispatch(abrirFormularioCrearConsulta())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


