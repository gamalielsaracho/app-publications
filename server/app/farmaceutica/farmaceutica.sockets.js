import Farmaceutica from './farmaceutica.model'

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
			Farmaceutica.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_farmaceutica', { mensaje: 'Se Eliminó exitósamente.' })

				farmaceuticas()
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
					
					
				Farmaceutica.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_farmaceutica', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_farmaceutica', { mensaje: 'Se actualizó exitósamente.' })
					
					farmaceuticas()
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
