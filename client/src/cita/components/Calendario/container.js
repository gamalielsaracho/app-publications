import { connect } from 'react-redux'

import {
    alertaPrueba
} from '../../actions'

import Calendario from './Calendario'

function mapStateToProps(state) {
	return {
        // citasFiltradas: state.cita.citasFiltradas
        formulario: state.cita.formulario
	}
}


function mapDispatchToProps(dispatch) {
	return {
        // ver si corre esto..
        // filtrarCitas: (citas, valores) => {
        //     console.log(valores)
        //     if(valores.id_personal) {
        //         citas = citas.filter((i) => {
        //             return i.id_personal == valores.id_personal[0]
        //         })
        //     }
        //     return citas
        // }

        // alertaPrueba: () => {
        //     dispatch(alertaPrueba())
        // }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendario)
