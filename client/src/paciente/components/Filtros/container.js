import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import Filtros from './Filtros'

import {
	cerrarFormularioFiltro
} from '../../actions'

	
// Select Option.
import {
	listarAreas
} from '../../../area/actions'


import {
	listarCiudades
} from '../../../ciudad/actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// Select Options.
		listarAreas: state.area.listar,

		listarCiudades: state.ciudad.listar

	}
}

function mapDispatchToProps(dispatch) {
	return {
		cerrarFormularioFiltro: () => {
			dispatch(cerrarFormularioFiltro())
		},


		// Select Options.
		listarAreasFuncion: () => {
			dispatch(listarAreas())
		},
		listarCiudadesFuncion: () => {
			dispatch(listarCiudades())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)







