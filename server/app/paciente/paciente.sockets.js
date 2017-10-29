import Paciente from './paciente.model'

import verifyRef from './././../validations/verifyRef.js'

import foreignKeyData from './././../useFul/foreignKeyData.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

import moment from 'moment'

export default (socket, io) => {
	
		function pacientes() {
			Paciente.find((err, pacientes) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_pacientes', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				// console.log(pacientes)

				io.sockets.emit('listar_pacientes', { pacientes: pacientes })
			})
		}
	
		pacientes()


		socket.on('crear_paciente', function(data) {

			// console.log(data)
			Paciente.verifyIfExist(data, (err, pacienteExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(pacienteExistente[0]) {
					socket.emit('crear_paciente', { error: 'Este paciente ya está registrado.' })
				} else {
					Paciente.create(data, (err, paciente) => {
						if(err) {
							console.log(err)
							socket.emit('crear_paciente', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_paciente', { mensaje: 'Se agregó exitósamente.' })
					
						pacientes()
					})
				}
			})
		})


		socket.on('mostrar_paciente', (data) => {
			// console.log(data)
			Paciente.findById(data, (err, paciente) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log(paciente[0])

				socket.emit('mostrar_paciente', paciente[0])
			})
		})

		socket.on('mostrar_paciente_editar', (data) => {
			Paciente.findByIdToUpdate(data, (err, paciente) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_paciente_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log(paciente[0])

				socket.emit('mostrar_paciente_editar', paciente[0])
			})
		})


		socket.on('eliminar_paciente', (data) => {
			let d = {
				table1: 'citas', 
				table2: 'preconsultas', 
				table3: 'pacientesalergias',
				fieldPrimaryKey: 'id_paciente',
				primaryKey: data.id_paciente
			}

			verifyRef(d, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log('enUso ---------->')
				console.log(enUso)
				
				if(enUso) {
					socket.emit('eliminar_paciente', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Paciente.findById(data, (err, pacienteDatosAnterior) => {
						let pAnt = pacienteDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}


						let listaCampos = [
							{
								nombreCampo: 'Nro. de documento',
								datoCampoAnterior: pAnt.pa.nroDocumento
							},
							{
								nombreCampo: 'Nombres',
								datoCampoAnterior: pAnt.pa.nombres
							},
							{ 
								nombreCampo: 'Apellidos',
								datoCampoAnterior: pAnt.pa.apellidos
							},
							{ 
								nombreCampo: 'Fecha de nacimiento',
								datoCampoAnterior: moment(pAnt.pa.fechaNacimiento).format('DD/MM/YYYY')
							},
							{ 
								nombreCampo: 'Dirección',
								datoCampoAnterior: pAnt.pa.direccion
							},
							{ 
								nombreCampo: 'Fecha de muerte',
								datoCampoAnterior: pAnt.pa.fechaMuerte
							},
							{ 
								nombreCampo: 'celular',
								datoCampoAnterior: pAnt.pa.celular
							},
							{ 
								nombreCampo: 'telefono',
								datoCampoAnterior: pAnt.pa.telefono
							},
							{ 
								nombreCampo: 'Area',
								datoCampoAnterior: pAnt.area.descripcion
							},
							{ 
								nombreCampo: 'Ciudad',
								datoCampoAnterior: pAnt.ciudad.descripcion
							},
							{ 
								nombreCampo: 'sexo',
								datoCampoAnterior: pAnt.pa.sexo
							},
							{ 
								nombreCampo: 'Tipo de Documento',
								datoCampoAnterior: pAnt.tipoDocumento.descripcion
							}
						]

						Paciente.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							pacientes()

							fieldsToEditData(listaCampos, 'eliminación', 'pacientes', data.idPersonal, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_paciente', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								// .. Ejecutar esto despues de editar el registro. 
								console.log(datos)

								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_paciente', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_paciente', { mensaje: 'Se Eliminó exitósamente.' })
						})
						// 
					})

				}
			})
		})


		socket.on('editar_paciente', (data) => {
			// console.log(data)

			Paciente.verifyIfExist(data, (err, pacienteExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(pacienteExistente[0]) {
					socket.emit('editar_paciente', { error: 'Este paciente ya está registrado.' })
				} else {
					// foreignKeyData('medicamentos', 'id_farmaceutica', data.id_farmaceutica)
					
					Paciente.findById(data, (err, pacienteDatosAnterior) => {
						let pAnt = pacienteDatosAnterior[0]

						// console.error("fecha Anterior ------> "+pAnt.pa.fechaNacimiento)

						if(err) {
							console.log(err)
							socket.emit('editar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						Paciente.update(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('editar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							pacientes()

							Paciente.findById(data, (err, pacienteDatosNuevo) => {
								let pNue = pacienteDatosNuevo[0]


								// console.error("fecha Nueva ------> "+pNue.pa.fechaNacimiento)

								if(err) {
									console.log(err)
									socket.emit('editar_paciente', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								
								let listaCampos = [
									{ 
										nombreCampo: 'Nro. de documento',
										datoCampoAnterior: pAnt.pa.nroDocumento,
										datoCampoNuevo: pNue.pa.nroDocumento
									},
									{ 
										nombreCampo: 'Nombres',
										datoCampoAnterior: pAnt.pa.nombres,
										datoCampoNuevo: pNue.pa.nombres
									},
									{ 
										nombreCampo: 'Apellidos',
										datoCampoAnterior: pAnt.pa.apellidos,
										datoCampoNuevo: pNue.pa.apellidos
									},
									{ 
										nombreCampo: 'Fecha de nacimiento',
										datoCampoAnterior: moment(pAnt.pa.fechaNacimiento).format('DD/MM/YYYY'),
										datoCampoNuevo: moment(pNue.pa.fechaNacimiento).format('DD/MM/YYYY')
									},
									{ 
										nombreCampo: 'Dirección',
										datoCampoAnterior: pAnt.pa.direccion,
										datoCampoNuevo: pNue.pa.direccion
									},
									{ 
										nombreCampo: 'Fecha de muerte',
										datoCampoAnterior: pAnt.pa.fechaMuerte,
										datoCampoNuevo: pNue.pa.fechaMuerte
									},
									{ 
										nombreCampo: 'celular',
										datoCampoAnterior: pAnt.pa.celular,
										datoCampoNuevo: pNue.pa.celular
									},
									{ 
										nombreCampo: 'telefono',
										datoCampoAnterior: pAnt.pa.telefono,
										datoCampoNuevo: pNue.pa.telefono
									},
									{ 
										nombreCampo: 'Area',
										datoCampoAnterior: pAnt.area.descripcion,
										datoCampoNuevo: pNue.area.descripcion
									},
									{ 
										nombreCampo: 'Ciudad',
										datoCampoAnterior: pAnt.ciudad.descripcion,
										datoCampoNuevo: pNue.ciudad.descripcion
									},
									{ 
										nombreCampo: 'sexo',
										datoCampoAnterior: pAnt.pa.sexo,
										datoCampoNuevo: pNue.pa.sexo
									},
									{ 
										nombreCampo: 'Tipo de Documento',
										datoCampoAnterior: pAnt.tipoDocumento.descripcion,
										datoCampoNuevo: pNue.tipoDocumento.descripcion
									}
								]

								// console.log(listaCampos)
								fieldsToEditData(listaCampos, 'actualización', 'pacientes', data.idPersonal, (err, datos) => {
									if(err) {
										console.log(err)
										socket.emit('editar_paciente', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}

									// .. Ejecutar esto despues de editar el registro. 
									console.log(datos)

									AuditoriaModulo1.create(datos, (err) => {
										if(err) {
											console.log(err)
											socket.emit('editar_paciente', { error: 'Ocurrió un error en la auditoría de este módulo.' })
											return
										}
									})
								})

								// console.log(listaCampos)
							})

							socket.emit('editar_paciente', { mensaje: 'Se actualizó exitósamente.' })
						})

					})
				}
			})			
		})
}
