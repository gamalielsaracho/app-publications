import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
	listarCitas,
	crearCita,
	editarCita,
	cerrarFormularioCita
} from '../../actions'

import {
	listarEspecialidades
} from '../../../especialidades/actions'

import { 
	listarPersonales
	// actualizarFormularioFiltro
} from '../../../usuario/actions'

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
		listar: state.cita.listar,

		// Lista de especialidades para mostrar dentro del select option.
		listaEspecialidades: state.especialidad.listar,

		// Lista los Médicos/as para mostrar dentro del select option Multiple.
		listaPesonales: state.personal.listar,

    	valoresFiltro: {
    		id_especialidad: selector(state, 'id_especialidad'),
    		id_personal: selector(state, 'id_personal')
    	}
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
		},

		listarEspecialidades: () => {
			dispatch(listarEspecialidades())
		},
		listarPersonales: () => {
			dispatch(listarPersonales())
		},
		listarCitas: () => {
			dispatch(listarCitas())
		}
	}
}

const form = reduxForm({
  form: 'FormularioCita',
  validate
})

const selector = formValueSelector('FormularioCita')

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
