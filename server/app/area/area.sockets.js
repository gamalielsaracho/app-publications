import Area from './area.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (socket, io) => {
	
		function areas() {
			Area.find((err, areas) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_areas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.sockets.emit('listar_areas', { areas: areas })
			})
		}
	
		areas()


		socket.on('crear_area', function(data) {
			Area.verifyIfExist(data, (err, areaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(areaExistente[0]) {
					socket.emit('crear_area', { error: 'Esta area ya está registrada.' })
				} else {
					Area.create(data, (err, area) => {
						if(err) {
							console.log(err)
							socket.emit('crear_area', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_area', { mensaje: 'Se agregó exitósamente.' })
					
						areas()
					})
				}

			})
		})


		socket.on('mostrar_area', (data) => {
			Area.findById(data, (err, area) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_area', area[0])
			})
		})


		socket.on('eliminar_area', (data) => {
			referentialIntegritySimple('pacientes', 'id_area', data.id_area, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_area', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Area.findById(data, (err, areaDatosAnterior) => {
						let aAnt = areaDatosAnterior[0]
						
						if(err) {
							console.log(err)
							socket.emit('eliminar_area', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: aAnt.descripcion
							}
						]

						Area.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_area', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							areas()

							fieldsToEditData(data.id_area, listaCampos, 'eliminación', 'areas', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_area', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
							
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_area', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_area', { mensaje: 'Se Eliminó exitósamente.' })

						})
					})
				}
			})
		})


		socket.on('editar_area', (data) => {
			Area.verifyIfExist(data, (err, areaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(areaExistente[0]) {
					socket.emit('editar_area', { error: 'Esta area ya está registrada.' })
				} else {
					Area.findById(data, (err, areaDatosAnterior) => {
						let aAnt = areaDatosAnterior[0]
						
						if(err) {
							console.log(err)
							socket.emit('editar_area', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: aAnt.descripcion,
								datoCampoNuevo: data.descripcion
							}
						]

						Area.update(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('editar_area', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}
						
							areas()

							fieldsToEditData(data.id_area, listaCampos, 'actualización', 'areas', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('editar_area', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
							
								// .. Ejecutar esto despues de editar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('editar_area', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('editar_area', { mensaje: 'Se actualizó exitósamente.' })
						})

					})					
				}
			})
		})
}
