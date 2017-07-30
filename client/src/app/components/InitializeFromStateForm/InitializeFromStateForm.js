import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'


const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

class InitializeFromStateForm extends Component {

  componentDidMount() {
    this.props.mostrarEditarRol(25)
  }

  render() {

    const { handleSubmit } = this.props
    console.log(this.props.initialValues)

    return <form onSubmit={handleSubmit}>
      

      <div>
        <label>Nombre</label>
        <div>
          <Field
            name="nombre"
            component="input"
            type="text"
            placeholder="Nombre"
          />
        </div>
      </div>

    </form>
  }
}

export default InitializeFromStateForm
