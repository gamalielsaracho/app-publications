import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import Filtros from './Filtros'

import {
	cerrarFormularioFiltro
} from '../../actions'

	
// Select Option.


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// Select Options.

	}
}

function mapDispatchToProps(dispatch) {
	return {
		cerrarFormularioFiltro: () => {
			dispatch(cerrarFormularioFiltro())
		}


		// Select Options.
		// listarAreasFuncion: () => {
		// 	dispatch(listarAreas())
		// }
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)







