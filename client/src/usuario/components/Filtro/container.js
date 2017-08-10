import { connect } from 'react-redux'

import {
	actualizarFormularioFiltro
} from '../../actions'

import Filtro from './Filtro'



function mapStateToProps(state) {
	return {
		filtro: state.personal.filtro
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actualizarFormularioFiltro: (valores) => {
			dispatch(actualizarFormularioFiltro(valores))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtro)
