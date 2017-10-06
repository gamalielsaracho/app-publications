import { connect } from 'react-redux'

import {
	mostrarAnalisisTipo
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state, ownProps) {
	return {
		mostrar: state.analisisTipo.mostrar,
		urls: ownProps.params,

		// Obtenemos el estado de la solicitud de laboratorio,
		// para quitar los datos del paciente (fechaNacimiento, sexo).
		mostrarAnalisisSolicitado: state.analisisSolicitado.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarAnalisisTipo: (idAnalisisTipo) => {
			dispatch(mostrarAnalisisTipo(idAnalisisTipo))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


