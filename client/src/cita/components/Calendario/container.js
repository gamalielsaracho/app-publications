import { connect } from 'react-redux'

import {

} from '../../actions'

import Calendario from './Calendario'

function mapStateToProps(state) {
	return {
        citasFiltradas: state.cita.citasFiltradas
	}
}


function mapDispatchToProps(dispatch) {
	return {
        filtrarCitas: (citas, valores) => {
            console.log(valores)
            if(valores.id_personal) {
                citas = citas.filter((i) => {
                    return i.id_personal == valores.id_personal[0]
                })
            }
            return citas
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendario)
