import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
	listarPersonales,
	actualizarFormularioFiltro
} from '../../actions'

import Listar from './Listar'


function mapStateToProps(state) {
	return {
		listar: state.personal.listar,
		filtro: state.personal.filtro
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listarPersonales: () => {
			dispatch(listarPersonales())
		},
		actualizarFormularioFiltro: (valores) => {
			dispatch(actualizarFormularioFiltro(valores))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Listar)