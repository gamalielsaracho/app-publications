import Departamento from './departamento.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (socket, io) => {
	
		function departamentos() {
			Departamento.find((err, departamentos) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_departamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.sockets.emit('listar_departamentos', { departamentos: departamentos })
			})
		}
	
		departamentos()


		socket.on('crear_departamento', function(data) {
			// console.log(data)
			Departamento.verifyIfExist(data, (err, departamentoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(departamentoExistente[0]) {
					socket.emit('crear_departamento', { error: 'Este departamento ya está registrado.' })
					return
				} else {
					Departamento.create(data, (err, departamento) => {
						if(err) {
							socket.emit('crear_departamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_departamento', { mensaje: 'Se agregó exitósamente.' })
					
						departamentos()
					})
				}
			})
		})


		socket.on('mostrar_departamento', (data) => {
			Departamento.findById(data, (err, departamento) => {
				if(err) {
					socket.emit('mostrar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_departamento', departamento[0])
			})
		})


		socket.on('eliminar_departamento', (data) => {
			referentialIntegritySimple('ciudades', 'id_departamento', data.id_departamento, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_departamento', { error: 'Este dato está siendo usado por otros registros.' })
				} else {

					Departamento.findById(data, (err, departamentoEncontrada) => {
						let departamento = departamentoEncontrada[0]

						// console.log(departamento)
						if(err) {
							console.log(err)
							socket.emit('eliminar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{ 
								nombreCampo: 'Nombre',
								datoCampoAnterior: departamento.descripcion
							}
						]

						Departamento.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							departamentos()

							fieldsToEditData(data.id_departamento, listaCampos, 'eliminación', 'departamentos', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_departamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
								
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_departamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_departamento', { mensaje: 'Se Eliminó exitósamente.' })
						})

					})
				}
			})
		})


		socket.on('editar_departamento', (data) => {
			console.log(data)

			Departamento.verifyIfExist(data, (err, departamentoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(departamentoExistente[0]) {
					socket.emit('editar_departamento', { error: 'Este departamento ya está registrado.' })
					return
				} 

				Departamento.findById(data, (err, departamentoEncontrada) => {
					let departamento = departamentoEncontrada[0]

					// console.log(departamento)
					if(err) {
						console.log(err)
						socket.emit('editar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{ 
							nombreCampo: 'Nombre',
							datoCampoAnterior: departamento.descripcion,
							datoCampoNuevo: data.descripcion
						}
					]


					Departamento.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}
					
						departamentos()

						fieldsToEditData(data.id_departamento, listaCampos, 'actualización', 'departamentos', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_departamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de editar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_departamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_departamento', { mensaje: 'Se actualizó exitósamente.' })
					})
				})

			})
		})
}
