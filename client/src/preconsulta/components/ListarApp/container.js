import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import ListarApp from './ListarApp'

import {
} from '../../actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		urls: ownProps.params,
		
		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

const form = reduxForm({
  form: 'ListarPreConsultasApp'
})

const selector = formValueSelector('ListarPreConsultasApp')

export default connect(mapStateToProps, mapDispatchToProps)(form(ListarApp))






