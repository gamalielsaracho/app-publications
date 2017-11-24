import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import Filtros from './Filtros'

import {
	cerrarFormularioFiltro
} from '../../actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
		cerrarFormularioFiltro: () => {
			dispatch(cerrarFormularioFiltro())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)







