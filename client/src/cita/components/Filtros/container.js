import { connect } from 'react-redux'

import {
	// Formulario Filtro, cool.!
	actualizarFormularioFiltro
} from '../../actions'

import {
	listarMedicos
} from '../../../usuario/actions'


import Filtros from './Filtros'

function mapStateToProps(state) {
	return {

		// Lista los Médicos/as para mostrar dentro del select option Multiple.
		listarMedicos: state.personal.listarMedicos,

		filtro: state.cita.filtro		
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listarMedicosFuncion: () => {
			dispatch(listarMedicos())
		},
		actualizarFormularioFiltro: (valores) => {
			// console.log(valores)
			dispatch(actualizarFormularioFiltro(valores))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)
