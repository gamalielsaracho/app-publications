import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearParametroPreConsulta,
	editarParametroPreConsulta,
	cerrarFormularioParametroPreConsulta
} from '../../actions'

import {
	listarUnidadesAnalisis
} from '../../../unidadAnalisis/actions'


import Formulario from './Formulario'

const validate = (values) => {
  	var patronNumeroComaNegativo = /^([0-9])*[.]?[0-9]*$/

  	// var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 3) {
   		errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
	}

	if(!values.valorNormal) {
		errors.valorNormal = 'Debe contener un valor.'
	} else {
		if(!/^-([0-9])*[.]?[0-9]*$/.test(values.valorNormal) && !/^([0-9])*[.]?[0-9]*$/.test(values.valorNormal)) {
        	errors.valorNormal = 'Solo números.'
	    } else if(!values.valorNormal.trim().length){
			errors.valorNormal = 'Debe contener un valor.'
	    }
	}

	

	if(!values.valorAlto) {
		errors.valorAlto = 'Debe contener un valor.'
	} else {
		if(!/^-([0-9])*[.]?[0-9]*$/.test(values.valorAlto) && !/^([0-9])*[.]?[0-9]*$/.test(values.valorAlto)) {
        	errors.valorAlto = 'Solo números.'
	    } else if(!values.valorAlto.trim().length) {
			errors.valorAlto = 'Debe contener un valor.'
	    }
	}

	if(!values.valorBajo) {
		errors.valorBajo = 'Debe contener un valor.'
	} else {
		if(!/^-([0-9])*[.]?[0-9]*$/.test(values.valorBajo) && !/^([0-9])*[.]?[0-9]*$/.test(values.valorBajo)) {
        	errors.valorBajo = 'Solo números.'
	    } else if(!values.valorBajo.trim().length) {
			errors.valorBajo = 'Debe contener un valor.'
	    }
	}
	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.parametroPreConsulta.formulario,
		initialValues: state.parametroPreConsulta.formulario.parametro,
		enableReinitialize: state.parametroPreConsulta.formulario.iniciarValores,
		editarContenido: state.parametroPreConsulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.parametroPreConsulta.crear,
		editar: state.parametroPreConsulta.editar,

		// Lista de las Unidades Para pasarle al componente
		// FieldSelect.
		listarUnidadesAnalisis: state.unidadAnalisis.listar

	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearParametroPreConsulta: (datosFormulario) => {
			dispatch(crearParametroPreConsulta(datosFormulario))
		},
		cerrarFormularioParametroPreConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioParametroPreConsulta())
		    // }
		},
		editarParametroPreConsulta: (datosFormulario) => {
			dispatch(editarParametroPreConsulta(datosFormulario))
		},

		// Acción para listar unidades de medidas
		// y llamar el componentWillMount.
		listarUnidadesAnalisisFuncion: () => {
			dispatch(listarUnidadesAnalisis())
		}
	}
}

const form = reduxForm({
	form: 'FormularioParametroPreConsulta',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
