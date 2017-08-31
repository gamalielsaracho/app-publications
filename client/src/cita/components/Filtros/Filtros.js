// import React, { Component } from 'react'
// import { Field, reset } from 'redux-form'

// import FieldSelectEspecialidadesContainer from '../../../especialidades/components/FieldSelectEspecialidades'
// import FieldSelectPesonales from '../../../usuario/components/FieldSelectPesonales'

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (  
//   <div>
// 	<div className="form-group">
// 	 	<label htmlFor={label}>{label}</label>
//     	<input className='form-control' {...input} placeholder={label} type={type}/>
// 	</div>
//     { touched && ((error && <label className="text-danger">{ error }</label>)) }
//   </div>
// )

// class Filtros extends Component {
// 	constructor(props) {
// 		super(props)
// 	}

// 	render() {
// 		const { handleSubmit, pristine, reset, submitting } = this.props

// 		// console.log(this.props.valoresCitaFiltro)

// 		return <div className='row'>
// 			<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
// 				<Field name='hola' type='text' component={renderField} label='Fecha'/>
// 			</div>
// 		</div>
// 	}
// }

// export default Filtros
