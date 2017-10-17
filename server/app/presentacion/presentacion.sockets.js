import Presentacion from './presentacion.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (io) => {
	var presentacionNsp = io.of('/presentacion');
	
	presentacionNsp.on('connection', function (socket) {

		console.log('Presentacion Conectado.')

		function presentaciones() {
			Presentacion.find((err, presentaciones) => {
				// console.log(presentaciones)
				if(err) {
					console.log(err)
					socket.emit('listar_presentaciones', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				presentacionNsp.emit('listar_presentaciones', { 
					presentaciones: presentaciones 
				})
			})
		}
		
		presentaciones()

		socket.on('crear_presentacion', function(data) {
			Presentacion.verifyIfExist(data, (err, presentacionExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(presentacionExistente[0]) {
						socket.emit('crear_presentacion', { error: 'Esta presentación ya está registrado' })
						return
				} else {
					Presentacion.create(data, (err, presentacion) => {
						if(err) {
							socket.emit('crear_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_presentacion', { mensaje: 'Se agregó exitósamente.' })
						
						presentaciones()
					})
				}
			})
		})


		socket.on('eliminar_presentacion', (data) => {
			referentialIntegritySimple('medicamentos', 'id_presentacion', data.id_presentacion, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_presentacion', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Presentacion.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_presentacion', { mensaje: 'Se Eliminó exitósamente.' })

						presentaciones()
					})
				}
			})
		})


		socket.on('editar_presentacion', (data) => {
			Presentacion.verifyIfExist(data, (err, presentacionExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(presentacionExistente[0]) {
					socket.emit('editar_presentacion', { error: 'Esta presentación ya está registrado' })
					return
				}
					
					
				Presentacion.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_presentacion', { mensaje: 'Se actualizó exitósamente.' })
					
					presentaciones()
				})
			})
		})
		
		socket.on('mostrar_presentacion', (data) => {
			Presentacion.findById(data, (err, presentacion) => {
				// console.log(presentacion)

				if(err) {
					console.log(err)
					socket.emit('mostrar_presentacion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_presentacion', presentacion[0])
			})
		})


		socket.on('disconnect', function () {
			console.log('Presentacion Desconecto.')
		})
	})
}
