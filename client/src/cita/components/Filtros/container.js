import { connect } from 'react-redux'

import {
	// Formulario Filtro, cool.!
	actualizarFormularioFiltro
} from '../../actions'

import {
	listarPersonales
} from '../../../usuario/actions'


import Filtros from './Filtros'

function mapStateToProps(state) {
	return {


		// Estados para el sistema de filtro.
		// Lista los Médicos/as para mostrar dentro del select option Multiple.
		listaPersonales: state.personal.listar.personales,

		filtro: state.cita.filtro		
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listarPersonales: () => {
			dispatch(listarPersonales())
		},
		actualizarFormularioFiltro: (valores) => {
			// console.log(valores)
			dispatch(actualizarFormularioFiltro(valores))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)
