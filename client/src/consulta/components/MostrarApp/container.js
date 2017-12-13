import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'


import {
	mostrarTratamientoIdConsulta,
	crearTratamiento
} from '../../../tratamiento/actions'


import {
	listarAnalisisSolicitados,
	abrirFormularioCrearAnalisisSolicitado
} from '../../../analisisSolicitado/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		listar: state.analisisSolicitado.listar,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname,


		// Obtenemos el tratamiento por IdConsulta.
		mostrarTratamientoIdConsulta: state.tratamiento.mostrarTratamientoIdConsulta
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisSolicitados: () => {
			dispatch(listarAnalisisSolicitados())
		},
		mostrarTratamientoIdConsultaFuncion: (idConsulta) => {
			dispatch(mostrarTratamientoIdConsulta(idConsulta))
		},
		crearTratamiento: (idConsulta) => {
			var r = confirm("Está seguro que desea crear un tratamiento?");
		    
		    if (r == true) {
				dispatch(crearTratamiento(idConsulta))
		    }
		},
		abrirFormularioCrearAnalisisSolicitado: () => {
			dispatch(abrirFormularioCrearAnalisisSolicitado())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


