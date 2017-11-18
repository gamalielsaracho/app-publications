import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import Filtros from './Filtros'

import {
	cerrarFormularioFiltro
} from '../../actions'

import {
	listarNiveles,
} from '../../../nivel/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		listarNiveles: state.nivel.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		cerrarFormularioFiltro: () => {
			dispatch(cerrarFormularioFiltro())
		},
		
		// Select Option.
		listarNivelesFuncion: () => {
			dispatch(listarNiveles())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)







