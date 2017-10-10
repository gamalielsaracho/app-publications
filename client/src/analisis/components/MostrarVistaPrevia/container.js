import { connect } from 'react-redux'

import {
	mostrarAnalisisVistaPrevia
} from '../../actions'

import MostrarVistaPrevia from './MostrarVistaPrevia'

function mapStateToProps(state, ownProps) {
	return {
		urls: ownProps.params,
		vistaPrevia: state.analisis.vistaPrevia
	}
}

function mapDispatchToProps(dispatch) {
	return {
		mostrarAnalisisVistaPrevia: (idAnalisis) => {
			dispatch(mostrarAnalisisVistaPrevia(idAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarVistaPrevia)