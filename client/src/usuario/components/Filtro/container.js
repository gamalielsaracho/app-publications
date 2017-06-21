import { connect } from 'react-redux'

import {
	buscarUsuarios
} from '../../actions'

import Filtro from './Filtro'



function mapStateToProps(state) {
	return {
		filtro: state.usuario.filtro
	}
}

function mapDispatchToProps(dispatch) {
	return {
		buscarUsuarios: (valores) => {
			dispatch(buscarUsuarios(valores))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtro)
