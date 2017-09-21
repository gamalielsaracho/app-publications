import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearLoteMedicamento,
	editarLoteMedicamento,
	cerrarFormularioLoteMedicamento
} from '../../actions'

import {
	listarMedicamentos
} from '../../../medicamento/actions'

import {
	listarProveedores
} from '../../../proveedor/actions'

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
		formulario: state.loteMedicamento.formulario,
		initialValues: state.loteMedicamento.formulario.loteMedicamento,
		enableReinitialize: state.loteMedicamento.formulario.iniciarValores,
		editarContenido: state.loteMedicamento.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.loteMedicamento.crear,
		editar: state.loteMedicamento.editar,

		// Datos para select option Input.
		listarMedicamentos: state.medicamento.listar,
		listarProveedores: state.proveedor.listar

	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearLoteMedicamento: (datosFormulario) => {
			dispatch(crearLoteMedicamento(datosFormulario))
		},
		cerrarFormularioLoteMedicamento: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioLoteMedicamento())
		    // }
		},
		editarLoteMedicamento: (datosFormulario) => {
			dispatch(editarLoteMedicamento(datosFormulario))
		},

		// Datos para select option Input.
		listarMedicamentosFuncion: () => {
			dispatch(listarMedicamentos())
		},
		listarProveedoresFuncion: () => {
			dispatch(listarProveedores())
		}
	}
}

const form = reduxForm({
	form: 'FormularioLoteMedicamento',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
