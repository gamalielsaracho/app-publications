import Droga from './droga.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {
	var drogaNsp = io.of('/droga');
	
	drogaNsp.on('connection', function (socket) {

		console.log('Droga Conectado.')

		function drogas() {
			Droga.find((err, drogas) => {
				// console.log(dosis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_drogas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				drogaNsp.emit('listar_drogas', { drogas: drogas })
			})
		}
		
		drogas()


		socket.on('crear_droga', function(data) {
			Droga.verifyIfExist(data, (err, drogaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_droga', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(drogaExistente[0]) {
						socket.emit('crear_droga', { error: 'Esta droga ya está registrada' })
						return
				} else {
					Droga.create(data, (err, droga) => {
						if(err) {
							console.log(err)
							socket.emit('crear_droga', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_droga', { mensaje: 'Se agregó exitósamente.' })
						
						drogas()
					})
				}
			})
		})


		socket.on('eliminar_droga', (data) => {
			referentialIntegritySimple('medicamentosDrogas', 'id_droga', data.id_droga, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_droga', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_droga', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Droga.findById(data, (err, drogaDatosAnterior) => {
						let droAnt = drogaDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_droga', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: droAnt.descripcion
							}
						]

						Droga.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_droga', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('eliminar_droga', { mensaje: 'Se Eliminó exitósamente.' })

							drogas()

							fieldsToEditData(data.id_droga, listaCampos, 'eliminación', 'drogas', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_droga', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
							
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_droga', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

						})

					})

				}
			})
		})


		socket.on('editar_droga', (data) => {
			Droga.verifyIfExist(data, (err, drogaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_droga', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(drogaExistente[0]) {
					socket.emit('editar_droga', { error: 'Esta droga ya está registrada' })
					return
				}
				
				Droga.findById(data, (err, drogaDatosAnterior) => {
					let droAnt = drogaDatosAnterior[0]

					if(err) {
						console.log(err)
						socket.emit('editar_droga', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{
							nombreCampo: 'Nombre',
							datoCampoAnterior: droAnt.descripcion,
							datoCampoNuevo: data.descripcion
						}
					]

					Droga.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_droga', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}
						
						drogas()

						fieldsToEditData(data.id_droga, listaCampos, 'actualización', 'drogas', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_droga', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de editar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_droga', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_droga', { mensaje: 'Se actualizó exitósamente.' })

					})

				})
					
			})
		})
		
		socket.on('mostrar_droga', (data) => {
			Droga.findById(data, (err, droga) => {
				// console.log(droga)

				if(err) {
					console.log(err)
					socket.emit('mostrar_droga', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_droga', droga[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Droga Desconecto.')
		})
	})
}
