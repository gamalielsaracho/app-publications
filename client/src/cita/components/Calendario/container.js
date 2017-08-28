import { connect } from 'react-redux'

import {
    obtenerFecha
} from '../../actions'

import Calendario from './Calendario'

function mapStateToProps(state) {
	return {
		listar: state.cita.listar,
        s: ''
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listaCitasEdited: (citas) => {
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
        obtenerFecha: (fecha) => {
            alert('holaaaaa')
            // dispatch(obtenerFecha(fecha))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendario)
