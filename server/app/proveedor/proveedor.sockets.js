import Proveedor from './proveedor.model'

export default (io) => {
	var proveedorNsp = io.of('/proveedor');
	
	proveedorNsp.on('connection', function (socket) {

		console.log('Proveedor Conectado.')

		function proveedores() {
			Proveedor.find((err, proveedores) => {
				// console.log(proveedores)
				if(err) {
					console.log(err)
					
					socket.emit('listar_proveedores', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				proveedorNsp.emit('listar_proveedores', { 
					proveedores: proveedores 
				})
			})
		}
		
		proveedores()


		socket.on('crear_proveedor', function(data) {
			Proveedor.verifyIfExist(data, (err, proveedorExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_proveedor', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(proveedorExistente[0]) {
						socket.emit('crear_proveedor', { error: 'Este proveedor ya está registrado' })
						return
				} else {
					Proveedor.create(data, (err, proveedor) => {
						if(err) {
							console.log(err)
							socket.emit('crear_proveedor', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_proveedor', { mensaje: 'Se agregó exitósamente.' })
						
						proveedores()
					})
				}
			})
		})


		socket.on('eliminar_proveedor', (data) => {
			Proveedor.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_proveedor', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_proveedor', { mensaje: 'Se Eliminó exitósamente.' })

				proveedores()
			})
		})


		socket.on('editar_proveedor', (data) => {
			Proveedor.verifyIfExist(data, (err, proveedorExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_proveedor', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(proveedorExistente[0]) {
					socket.emit('editar_proveedor', { error: 'Este proveedor ya está registrado' })
					return
				}
					
					
				Proveedor.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_proveedor', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_proveedor', { mensaje: 'Se actualizó exitósamente.' })
					
					proveedores()
				})
			})
		})
		
		socket.on('mostrar_proveedor', (data) => {
			Proveedor.findById(data, (err, proveedor) => {
				// console.log(proveedor)

				if(err) {
					console.log(err)
					socket.emit('mostrar_proveedor', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_proveedor', proveedor[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Proveedor Desconecto.')
		})
	})
}
