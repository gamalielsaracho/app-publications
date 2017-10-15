import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearMedicamentoDroga,
	editarMedicamentoDroga,
	cerrarFormularioMedicamentoDroga
} from '../../actions'

import {
	listarDrogas
} from '../../../droga/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.id_parametroPreconsulta) {
		errors.id_parametroPreconsulta = 'Parametro obligatorio.'
	}

	if(!values.valor) {
		errors.valor = 'Obligatorio.'
	} else if (values.valor.toString().trim() == '') {
   		errors.valor = 'Obligatorio.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.medicamentoDroga.formulario,
		initialValues: state.medicamentoDroga.formulario.medicamentoDroga,
		enableReinitialize: state.medicamentoDroga.formulario.iniciarValores,
		editarContenido: state.medicamentoDroga.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.medicamentoDroga.crear,
		editar: state.medicamentoDroga.editar,

		// Obtenemos la lista de drogas para mostrar todas
		// dentro del select option.
		listarDrogas: state.droga.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMedicamentoDroga: (datosFormulario) => {
			dispatch(crearMedicamentoDroga(datosFormulario))
		},
		editarMedicamentoDroga: (datosFormulario) => {
			dispatch(editarMedicamentoDroga(datosFormulario))
		},
		cerrarFormularioMedicamentoDroga: () => {
			dispatch(cerrarFormularioMedicamentoDroga())
		},

		// Función que es llamado dentro de componentWillMount.
		// para listar todas las drogas.
		listarDrogasFuncion: () => {
			dispatch(listarDrogas())
		}
	}
}

const form = reduxForm({
	form: 'FormularioMedicamentoDroga',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
