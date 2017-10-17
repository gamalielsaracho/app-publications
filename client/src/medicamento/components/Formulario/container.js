import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearMedicamento,
	editarMedicamento,
	cerrarFormularioMedicamento
} from '../../actions'

// Selects Options (ACTIONS).

import {
	listarFarmaceuticas
} from '../../../farmaceutica/actions'

import {
	listarNombresMedicamentos
} from '../../../nombreMedicamento/actions'

import {
	listarPresentaciones
} from '../../../presentacion/actions'

import Formulario from './Formulario'

// id_nombreMedicamento
// id_presentacion
// id_tipoConsumo
// id_farmaceutica
// id_dosis
// id_unidadMedidaMedicamento
// cantidadFarmaceutica
// stockMinimo

const validate = (values) => {
	const errors = {}

	if(!values.id_nombreMedicamento) {
		errors.id_nombreMedicamento = 'Tienes que introducir un nombre.'
	}

	if(!values.id_presentacion) {
		errors.id_presentacion = 'Tienes que introducir una presentación.'
	}

	if(!values.id_tipoConsumo) {
		errors.id_tipoConsumo = 'Tienes que introducir un tipo.'
	}

	if(!values.id_farmaceutica) {
		errors.id_farmaceutica = 'Tienes que introducir una farmacéutica.'
	}

	if(!values.id_dosis) {
		errors.id_dosis = 'Tienes que introducir una dosis.'
	}

	if(!values.id_unidadMedidaMedicamento) {
		errors.id_unidadMedidaMedicamento = 'Tienes que introducir una medida.'
	}


	if(!values.stockMinimo) {
		errors.stockMinimo = 'Stock Mínimo obligatorio.'
	}else if (values.stockMinimo.trim().length < 1) {
   			errors.stockMinimo = 'Stock Mínimo obligatorio..'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.medicamento.formulario,
		initialValues: state.medicamento.formulario.medicamento,
		enableReinitialize: state.medicamento.formulario.iniciarValores,
		editarContenido: state.medicamento.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.medicamento.crear,
		editar: state.medicamento.editar,

		// Selects options.
		listarFarmaceuticas: state.farmaceutica.listar,
		listarNombresMedicamentos: state.nombreMedicamento.listar,
		listarPresentaciones: state.presentacion.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMedicamento: (datosFormulario) => {
			dispatch(crearMedicamento(datosFormulario))
		},
		cerrarFormularioMedicamento: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioMedicamento())
		    // }
		},
		editarMedicamento: (datosFormulario) => {
			dispatch(editarMedicamento(datosFormulario))
		},


		// selects Options functions.
		
		listarFarmaceuticasFuncion: () => {
			dispatch(listarFarmaceuticas())
		},
		listarNombresMedicamentosFuncion: () => {
			dispatch(listarNombresMedicamentos())
		},
		listarPresentacionesFuncion: () => {
			dispatch(listarPresentaciones())
		}
	}
}

const form = reduxForm({
	form: 'FormularioMedicamento',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
