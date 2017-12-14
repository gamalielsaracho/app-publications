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
  	var patronNumero = /^\d*$/; //Expresión regular para aceptar solo números enteros

	const errors = {}

	// id_farmaceutica
	// id_nombreMedicamento
	// id_presentacion
	// cantidadXunidad
	// observaciones

	if(!values.id_nombreMedicamento) {
		errors.id_nombreMedicamento = 'Tienes que introducir un nombre.'
	}

	if(!values.id_presentacion) {
		errors.id_presentacion = 'Tienes que introducir una presentación.'
	}


	if(!values.id_farmaceutica) {
		errors.id_farmaceutica = 'Tienes que introducir una farmacéutica.'
	}


	if(!patronNumero.test(values.cantidadXunidad)) {
       errors.cantidadXunidad = 'Solo números positivos.'
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
