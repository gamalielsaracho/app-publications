import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearMedicamento,
	editarMedicamento,
	cerrarFormularioMedicamento
} from '../../actions'

// Selects Options.
import {
	listarNombresMedicamentos
} from '../../../nombreMedicamento/actions'

import {
	listarDosis
} from '../../../dosis/actions'

import {
	listarTiposConsumos
} from '../../../tipoConsumo/actions'

import {
	listarFarmaceuticas
} from '../../../farmaceutica/actions'

import {
	listarUnidadesMedicamentos
} from '../../../unidadMedidaMedicamento/actions'

import {
	listarPresentaciones
} from '../../../presentacion/actions'



import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 5) {
   			errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
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
		listarNombresMedicamentos: state.nombreMedicamento.listar,
		listarDosis: state.dosis.listar,
		listarTiposConsumos: state.tipoConsumo.listar,
		listarFarmaceuticas: state.farmaceutica.listar,
		listarUnidadesMedicamentos: state.unidadMedicamento.listar,
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

		// selects Options.
		listarNombresMedicamentosFuncion: () => {
			dispatch(listarNombresMedicamentos())
		},
		listarDosisFuncion: () => {
			dispatch(listarDosis())
		},
		listarTiposConsumosFuncion: () => {
			dispatch(listarTiposConsumos())
		},
		listarFarmaceuticasFuncion: () => {
			dispatch(listarFarmaceuticas())
		},
		listarUnidadesMedicamentosFuncion: () => {
			dispatch(listarUnidadesMedicamentos())
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
