import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPreConsulta,
	editarPreConsulta,

	listarPreConsultas
} from '../../actions'

import {
	editarCita,
	mostrarCita,

	cerrarMostrarCitaAgregarPreConsulta
} from '../../../cita/actions'

import {
	listarNiveles
} from '../../../nivel/actions'

import AnadirPreConsulta from './AnadirPreConsulta'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
		values.descripcion.toLowerCase()
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.preConsulta.formulario,
		initialValues: state.preConsulta.formulario.preConsulta,
		enableReinitialize: state.preConsulta.formulario.iniciarValores,
		editarContenido: state.preConsulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.preConsulta.crear,
		editar: state.preConsulta.editar,

		// Para mostrar dentro del select option.
    	listaNiveles: state.nivel.listar,

    	datosToken: state.personal.usuarioEstado.datosToken,

    	// Para filtrar la lista de pre-consultas y mostrar solamente 1
    	// que sería la preconsulta que se hizo el paciente y se podría
    	// utilizar para muchas citas creadas en el Día.
    	listaPreConsultas: state.preConsulta.listar,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPreConsulta: (datosFormulario) => {
			dispatch(crearPreConsulta(datosFormulario))
		},
		// Para cerrar la ventana modal donde se muestra
		// el la lista de preconsultas del día O el boton para
		// crear una nueva pre-consulta en el día.
		cerrarMostrarCitaAgregarPreConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarMostrarCitaAgregarPreConsulta())
		    // }
		},
		editarPreConsulta: (datosFormulario) => {
			dispatch(editarPreConsulta(datosFormulario))
		},

		listarNiveles: () => {
			dispatch(listarNiveles())
		},

		listarPreConsultas: () => {
			dispatch(listarPreConsultas())
		},
		editarCita: (datosFormulario) => {
			dispatch(editarCita(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioRol',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(AnadirPreConsulta))
