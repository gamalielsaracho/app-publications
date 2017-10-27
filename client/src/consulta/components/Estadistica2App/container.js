import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import Estadistica2App from './Estadistica2App'

import {
	mostrarEstadistica2
} from '../../actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		mostrarValoresEstadisticos: state.consulta.mostrarValoresEstadisticos,

		valoresFiltro: {
    		// Para filtrar .
			anho: selector(state, 'anho') || ''
    	}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		mostrarEstadistica2: () => {
			dispatch(mostrarEstadistica2())
		},

		datosFiltradosPorAnho: (valoresEstadisticos, valoresFiltro) => {
			// console.log(valoresFiltro)
			
			if(valoresEstadisticos) {
				valoresEstadisticos = valoresEstadisticos.filter((i) => {
					return i.fecha == valoresFiltro.anho
				})
				valoresEstadisticos = valoresEstadisticos[0]

				console.log('FILTRO.... :)')
				console.log(valoresEstadisticos)
			}
			return valoresEstadisticos
		}
	}
}

const form = reduxForm({
  form: 'Estadistica2App'
})

const selector = formValueSelector('Estadistica2App')

export default connect(mapStateToProps, mapDispatchToProps)(form(Estadistica2App))


