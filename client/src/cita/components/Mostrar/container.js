import { connect } from 'react-redux'

import {
	// se ejecuta dentro de Mostrar, en componentWillMount
	// para ver los datos de la cita en una página aparte 
	// (para médicos, enfermeros y administradores).
	mostrarCita,

	cerrarModalMostrarCita
} from '../../actions'

import {
	abrirFormularioCrearPreConsulta
} from '../../../preconsulta/actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.cita.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarCita: (idCita) => {
			dispatch(mostrarCita(idCita))
		},
		cerrarModalMostrarCita: () => {
			dispatch(cerrarModalMostrarCita())
		},

		// Pre-consulta.
		abrirFormularioCrearPreConsulta: () => {
			dispatch(abrirFormularioCrearPreConsulta())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


