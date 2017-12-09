import { connect } from 'react-redux'

import {
	abrirFormularioCrearConsulta,
 
	mostrarConsulta
} from '../../actions'



import Listar from './Listar'

// ownProps obtiene todas las properties que son pasados a
// ListarConsultasContainer DENTRO DE FiltrosConsultasAppContainer
//  Así que NO hace falta ya que no trae los parametros de la url
// en donde el usuario está parado.

// Vamos a pasarle urls a ListarConsultasContainer al ser llamado de 
// FiltrosConsultasAppContainer (El componente Index en las rutas)

function mapStateToProps(state) {
	return {
		crear: state.consulta.crear,
		listar: state.consulta.listar,
		consultas: state.consulta.listar.consultas,

		// Para hacer render del formulario únicamente si está abierto.
		formulario: state.consulta.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearConsulta: () => {
			dispatch(abrirFormularioCrearConsulta())
		},
		
		mostrarConsulta: (idConsulta) => {
			dispatch(mostrarConsulta(idConsulta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)