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
	listarMedicos
	// actualizarFormularioFiltro
} from '../../../usuario/actions'

import {
	listarPacientes
} from '../../../paciente/actions'

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
		listarEspecialidades: state.especialidad.listar,

		// Lista los Médicos/as para mostrar dentro del select option Multiple.
		listarMedicos: state.personal.listarMedicos,

		// Obtener La lista de pacientes para mostrarlo dentro 
    	// del form-inline.
		listarPacientes: state.paciente.listar,

    	valoresFiltro: {
    		id_especialidad: selector(state, 'id_especialidad'),
    		id_personal: selector(state, 'id_personal'),

    		// Para filtrar los Pacientes.
    		nroDocumento: selector(state, 'nroDocumento') || '',
			id_tipoDocumento: selector(state, 'id_tipoDocumento') || '',
			nombres: selector(state, 'nombres') || '',
			apellidos: selector(state, 'apellidos') || ''
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
		listaCitasEditedAndFilter: (datos, valores) => {
			let newList = []
			// title: 'Gamaliel Saracho',
   //                  start: '2017-08-23T08:00:00',
   //                  end: '2017-08-23T08:30:00',
   //                  allDay: false
			datos.map((i) => {
				let cita = {}
				cita.allDay = i.cita.allDay
				cita.end = i.cita.end
				cita.fecha = i.cita.fecha
				cita.id_cita = i.cita.id_cita
				cita.id_paciente = i.cita.id_paciente
				cita.id_personal = i.cita.id_personal
				cita.id_preconsulta = i.cita.id_preconsulta
				cita.pendiente = i.cita.pendiente
				cita.start = i.cita.start
				cita.title =  i.paciente.nombres+' '+i.paciente.apellidos

				newList.push(cita)
			})

			// Tocar luego.! cool :)

			// if(valores.id_personal != undefined) {
			// 	valores.id_personal = valores.id_personal[0] 
			// 	// console.log(valores)
			// }

			// newList = newList.filter((i) => {
			// 	return i.id_personal == valores.id_personal
			// })

			// console.log('newList |||||||||||||||||')
			// console.log(newList)
			return newList
		},
		listarCitas: () => {
			dispatch(listarCitas())
		},

		// Select Options.
		listarEspecialidadesFuncion: () => {
			dispatch(listarEspecialidades())
		},
		listarMedicosFuncion: () => {
			dispatch(listarMedicos())
		},
		// Función para llamarlo dentro de componentWillMount. 
		listarPacientesFuncion: () => {
			dispatch(listarPacientes())
		}
	}
}

const form = reduxForm({
  form: 'FormularioCita',
  validate
})

const selector = formValueSelector('FormularioCita')

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
