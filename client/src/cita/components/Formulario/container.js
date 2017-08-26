import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearCita,
	editarCita,
	cerrarFormularioCita
} from '../../actions'

import Formulario from './Formulario'

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
		formulario: state.cita.formulario,
		initialValues: state.cita.formulario.cita,
		enableReinitialize: state.cita.formulario.iniciarValores,
		editarContenido: state.cita.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.cita.crear,
		editar: state.cita.editar,

		// Obtener la lista de citas creadas, para ver las fechas.
		listar: state.cita.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearCita: (datosFormulario) => {
			dispatch(crearCita(datosFormulario))
		},
		cerrarFormularioCita: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioCita())
		    // }
		},
		editarCita: (datosFormulario) => {
			dispatch(editarCita(datosFormulario))
		},

		// Lista para mostrar en el calendario.
		listaCitasEdited: () => {
			return [
				{
                    title: 'Pedro Raul',
                    start: '2017-08-21T08:00:00',
                    end: '2017-08-21T08:30:00',
                    allDay: false
                },
                {
                    title: 'Rie Motomori',
                    start: '2017-08-23',
                    // end: new Date(y, m, 1, 9, 00),
                    allDay: false
                },
                {
                    title: 'Gamaliel Saracho',
                    start: '2017-08-23T08:00:00',
                    end: '2017-08-23T08:30:00',
                    allDay: false
                }
			]
		}
	}
}

const form = reduxForm({
	form: 'FormularioRol',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
