import Farmaceutica from './farmaceutica.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

export default (io) => {
	var farmaceuticaNsp = io.of('/farmaceutica');
	
	farmaceuticaNsp.on('connection', function (socket) {

		console.log('Farmaceutica Conectado.')

		function farmaceuticas() {
			Farmaceutica.find((err, farmaceuticas) => {
				// console.log(farmaceuticas)
				if(err) {
					console.log(err)
					
					socket.emit('listar_farmaceuticas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				farmaceuticaNsp.emit('listar_farmaceuticas', { farmaceuticas: farmaceuticas })
			})
		}
		
		farmaceuticas()


		socket.on('crear_farmaceutica', function(data) {
			Farmaceutica.verifyIfExist(data, (err, farmaceuticaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(farmaceuticaExistente[0]) {
						socket.emit('crear_farmaceutica', { error: 'Esta farmacéutica ya está registrada' })
						return
				} else {
					Farmaceutica.create(data, (err, farmaceutica) => {
						if(err) {
							console.log(err)
							socket.emit('crear_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_farmaceutica', { mensaje: 'Se agregó exitósamente.' })
						
						farmaceuticas()
					})
				}
			})
		})


		socket.on('eliminar_farmaceutica', (data) => {
			referentialIntegritySimple('medicamentos', 'id_farmaceutica', data.id_farmaceutica, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_farmaceutica', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Farmaceutica.findById(data, (err, farmaceuticaEncontrada) => {
						let farmaceutica = farmaceuticaEncontrada[0]

						// console.log(farmaceutica)
						if(err) {
							console.log(err)
							socket.emit('eliminar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let fieldsAnteriores = []

						let datos = {}
						datos.id_personal = data.id_personal
						datos.accion = 'eliminación'
						datos.tabla = 'farmaceuticas'
						datos.datoAnterior = ''

						if(farmaceutica.nombre != data.nombre) {
							fieldsAnteriores.push({
								nombreCampo: 'nombre',
								datoCampo: farmaceutica.nombre
							})
						}

						if(farmaceutica.direccion != data.direccion) {
							fieldsAnteriores.push({
								nombreCampo: 'direccion',
								datoCampo: farmaceutica.direccion
							})
						}

						if(farmaceutica.telefono != data.telefono) {
							fieldsAnteriores.push({
								nombreCampo: 'telefono',
								datoCampo: farmaceutica.telefono
							})
						}
					
					 
						fieldsAnteriores.map(function(i) { 
							var dataLineAnt = ''; 
							if(i.datoCampo != null && i.nombreCampo != null) {
								dataLineAnt = `> __${i.nombreCampo}:__ ${i.datoCampo} \n\n`
							}

							datos.datoAnterior = datos.datoAnterior + dataLineAnt  
						})


						Farmaceutica.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('eliminar_farmaceutica', { mensaje: 'Se Eliminó exitósamente.' })

							farmaceuticas()

							// .. Ejecutar esto despues de eliminar el registro. 
							console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_farmaceutica', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						// ...
					})

				}
			})
			
		})


		socket.on('editar_farmaceutica', (data) => {
			Farmaceutica.verifyIfExist(data, (err, farmaceuticaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(farmaceuticaExistente[0]) {
					socket.emit('editar_farmaceutica', { error: 'Esta farmacéutica ya está registrada' })
					return
				}
					
				Farmaceutica.findById(data, (err, farmaceuticaEncontrada) => {
					let farmaceutica = farmaceuticaEncontrada[0]

					// console.log(farmaceutica)
					if(err) {
						console.log(err)
						return
					}

					let fieldsAnteriores = []
					let fieldsNuevos = []

					let datos = {}
					datos.id_personal = data.id_personal
					datos.accion = 'actualización'
					datos.tabla = 'farmaceuticas'
					datos.datoAnterior = ''
					datos.datoNuevo = ''

					if(farmaceutica.nombre != data.nombre) {
						fieldsAnteriores.push({
							nombreCampo: 'nombre',
							datoCampo: farmaceutica.nombre
						})
						fieldsNuevos.push({
							nombreCampo: 'nombre',
							datoCampo: data.nombre
						})
					}

					if(farmaceutica.direccion != data.direccion) {
						fieldsAnteriores.push({
							nombreCampo: 'direccion',
							datoCampo: farmaceutica.direccion
						})
						fieldsNuevos.push({
							nombreCampo: 'direccion',
							datoCampo: data.direccion
						})
					}

					if(farmaceutica.telefono != data.telefono) {
						fieldsAnteriores.push({
							nombreCampo: 'telefono',
							datoCampo: farmaceutica.telefono
						})
						fieldsNuevos.push({
							nombreCampo: 'telefono',
							datoCampo: data.telefono
						})
					}
					
					 
					fieldsAnteriores.map(function(i) { 
						var dataLineAnt = ''; 
						if(i.datoCampo != null && i.nombreCampo != null) {
							dataLineAnt = `> __${i.nombreCampo}:__ ${i.datoCampo} \n\n`
						}

						datos.datoAnterior = datos.datoAnterior + dataLineAnt  
					})

					fieldsNuevos.map(function(i) { 
						var dataLineNew = ''; 
						if(i.datoCampo != null && i.nombreCampo != null) {
							dataLineNew =  `> __${i.nombreCampo}:__ ${i.datoCampo} \n\n`
						}

						datos.datoNuevo = datos.datoNuevo + dataLineNew  
					})

					// console.log('data ---------->')
					// console.log(data)
					// console.log('farmaceutica ENCONTRADA ---------->')
					// console.log(farmaceutica)

					// console.log(datos)
					Farmaceutica.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('editar_farmaceutica', { mensaje: 'Se actualizó exitósamente.' })
						farmaceuticas()

						// .. Ejecutar esto despues de editar el registro. 
						console.log(datos)
						AuditoriaModulo1.create(datos, (err) => {
							if(err) {
								console.log(err)
								socket.emit('editar_farmaceutica', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return
							}
						})

					})

				})


			})
		})
		
		socket.on('mostrar_farmaceutica', (data) => {
			Farmaceutica.findById(data, (err, farmaceutica) => {
				// console.log(farmaceutica)

				if(err) {
					console.log(err)
					socket.emit('mostrar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_farmaceutica', farmaceutica[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Farmaceutica Desconecto.')
		})
	})
}
