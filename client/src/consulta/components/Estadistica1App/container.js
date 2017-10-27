import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import Estadistica1App from './Estadistica1App'

import {
	mostrarEstadistica1
} from '../../actions'

import {
	listarDiagnosticos
} from '../../../diagnostico/actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		mostrarValoresEstadisticos: state.consulta.mostrarValoresEstadisticos,

		valoresFiltro: {
    		// Para filtrar .
			id_diagnostico: selector(state, 'id_diagnostico') || ''
    	},

		listarDiagnosticos: state.diagnostico.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		mostrarEstadistica1: () => {
			dispatch(mostrarEstadistica1())
		},

		datosFiltradosPorDiagnostico: (valoresEstadisticos, valoresFiltro) => {
			console.log(valoresFiltro)
			
			if(valoresEstadisticos) {
				valoresEstadisticos = valoresEstadisticos.filter((i) => {
					return i.id_diagnostico == valoresFiltro.id_diagnostico
				})
				valoresEstadisticos = valoresEstadisticos[0]

				console.log('FILTRO.... :)')
				console.log(valoresEstadisticos)
			}
			return valoresEstadisticos
		},

		// Para Listar todos los diagnósticos y mostrarlo dentro del
		// select option.
		listarDiagnosticosFuncion: () => {
			dispatch(listarDiagnosticos())
		}
	}
}

const form = reduxForm({
  form: 'Estadistica1App'
})

const selector = formValueSelector('Estadistica1App')

export default connect(mapStateToProps, mapDispatchToProps)(form(Estadistica1App))


