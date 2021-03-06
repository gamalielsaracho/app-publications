import Nivel from './nivel.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {
	var nivelNsp = io.of('/nivel');
	
	nivelNsp.on('connection', function (socket) {

		console.log('Nivel Conectado.')

		function niveles() {
			Nivel.find((err, niveles) => {
				// console.log(niveles)
				if(err) {
					console.log(err)
					
					socket.emit('listar_niveles', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				nivelNsp.emit('listar_niveles', { niveles: niveles })
			})
		}
		
		niveles()


		socket.on('crear_nivel', function(data) {
			Nivel.verifyIfExist(data, (err, nivelExistente) => {
				if(err) {
					console.log(err)
				}

				if(nivelExistente[0]) {
						socket.emit('crear_nivel', { error: 'Este nivel ya está registrado' })
						return
				} else {
					Nivel.create(data, (err, nivel) => {
						if(err) {
							socket.emit('crear_nivel', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_nivel', { mensaje: 'Se agregó exitósamente.' })
						
						niveles()
					})
				}
			})
		})


		socket.on('eliminar_nivel', (data) => {
			referentialIntegritySimple('consultas', 'id_nivel', data.id_nivel, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_nivel', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Nivel.findById(data, (err, nivelDatosAnterior) => {
						let aAnt = nivelDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: aAnt.descripcion
								// datoCampoNuevo: data.descripcion
							}
						]

						Nivel.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							niveles()

							fieldsToEditData(data.id_nivel, listaCampos, 'eliminación', 'niveles', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_nivel', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
							
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_nivel', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_nivel', { mensaje: 'Se Eliminó exitósamente.' })

						})

					})

				}
			})
		})


		socket.on('editar_nivel', (data) => {
			Nivel.verifyIfExist(data, (err, nivelExistente) => {
				if(err) {
					console.log(err)
				}

				if(nivelExistente[0]) {
					socket.emit('editar_nivel', { error: 'Este nivel ya está registrado' })
					return
				}
					
					
				Nivel.findById(data, (err, nivelDatosAnterior) => {
					let aAnt = nivelDatosAnterior[0]

					if(err) {
						console.log(err)
						socket.emit('editar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{
							nombreCampo: 'Nombre',
							datoCampoAnterior: aAnt.descripcion,
							datoCampoNuevo: data.descripcion
						}
					]

					Nivel.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}
						
						niveles()

						fieldsToEditData(data.id_nivel, listaCampos, 'actualización', 'niveles', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_nivel', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de editar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_nivel', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_nivel', { mensaje: 'Se actualizó exitósamente.' })
					})
				})

			})
		})
		
		socket.on('mostrar_nivel', (data) => {
			Nivel.findById(data, (err, nivel) => {
				console.log(nivel)

				if(err) {
					console.log(err)
					socket.emit('mostrar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_nivel', nivel[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Nivel Desconecto.')
		})
	})
}
