import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPaciente,
	editarPaciente,
	cerrarFormularioPaciente
} from '../../actions'

import {
	listarCiudades
} from '../../../ciudad/actions'

import {
	listarAreas,
} from '../../../area/actions'

import Formulario from './Formulario'

// nroDocumento
// nombres
// sexo
// direccion
// celular
// id_area
// id_tipoDocumento
// apellidos
// fechaNacimiento
// telefono
// id_ciudad

const validate = (values) => {
	const errors = {}

	// if (!values.nroDocumento) {
 //    	errors.nroDocumento = 'Nro de documento obligatorio.'
	// } else {
	// 	if (values.nroDocumento.length < 7) {
	// 		errors.nroDocumento = 'Por lo menos 7 caracteres.'
	// 	}
	// }
		

	// if (!values.id_tipoDocumento) {
	// 	errors.id_tipoDocumento = 'Tipo de documento obligatorio.'
	// }

	if (!values.nombres) {
	    errors.nombres = 'Nombre completo es obligatorio.'
	} else if (values.nombres.length <= 3) {
		errors.nombres = 'Por lo menos 3 caracteres.'
	}
 
	if (!values.apellidos) {
	    errors.apellidos = 'Apellido completo obligatorio.'
	} else if (values.apellidos.length < 3) {
	    errors.apellidos = 'Por lo menos 3 caracteres'
	}	

	// if (!values.celular) {
	//     errors.celular = 'Nro de celular obligatorio.'
	// } else if (values.celular.length <= 7) {
	//     errors.celular = 'Como minimo 7 caracteres.'
	// }

	if (!values.direccion) {
	    errors.direccion = 'Dirección obligatorio.'
	} else if (values.direccion.length < 5) {
	    errors.direccion = 'Como minimo 5 caracteres.'
	}

	// if (!values.fechaNacimiento) {
	// 	errors.fechaNacimiento = 'Fecha de nacimiento obligatorio.'
	// }

	if(!values.id_area) {
		errors.id_area = 'El campo area obligatorio.'
	}

	if(!values.id_ciudad) {
		errors.id_ciudad = 'El campo ciudad obligatorio.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.paciente.formulario,
		initialValues: state.paciente.formulario.paciente,
		enableReinitialize: state.paciente.formulario.iniciarValores,
		editarContenido: state.paciente.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.paciente.crear,
		editar: state.paciente.editar,

		// Para listar en select, dentro del formulario. 
    	listarAreas: state.area.listar,
		listarCiudades: state.ciudad.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPaciente: (datosFormulario) => {
			dispatch(crearPaciente(datosFormulario))
		},
		cerrarFormularioPaciente: () => {
			var r = confirm("Está seguro que desea cancelar?");
		    if (r == true) {
				dispatch(cerrarFormularioPaciente())
		    }
		},
		editarPaciente: (datosFormulario) => {
			dispatch(editarPaciente(datosFormulario))
		},

		// Select options.
		listarAreasFuncion: () => {
			dispatch(listarAreas())
		},
		listarCiudadesFuncion: () => {
			dispatch(listarCiudades())
		}
	}
}

const form = reduxForm({
	form: 'FormularioPaciente',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
