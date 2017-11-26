import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import Filtros from './Filtros'

import {
	cerrarFormularioFiltro
} from '../../actions'

	
// Select Option.
import {
	listarNiveles
} from '../../../nivel/actions'

import {
	listarEspecialidades
} from '../../../especialidades/actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		listarNiveles: state.nivel.listar,

		listarEspecialidades: state.especialidad.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		cerrarFormularioFiltro: () => {
			dispatch(cerrarFormularioFiltro())
		},


		// Select Options.
		listarNivelesFuncion: () => {
			dispatch(listarNiveles())
		},

		listarEspecialidadesFuncion: () => {
			dispatch(listarEspecialidades())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)







