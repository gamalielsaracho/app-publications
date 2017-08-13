import Area from './area.model'

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
			Area.create(data, (err, area) => {
				if(err) {
					socket.emit('crear_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_area', { mensaje: 'Se agregó exitósamente.' })
			
				areas()
			})
		})


		socket.on('mostrar_area', (data) => {
			Area.findById(data.id_area, (err, area) => {
				if(err) {
					socket.emit('mostrar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_area', area[0])
			})
		})


		socket.on('eliminar_area', (data) => {
			Area.delete(data.id_area, (err) => {
				if(err) {
					socket.emit('eliminar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_area', { mensaje: 'Se Eliminó exitósamente.' })

				areas()
			})
		})


		socket.on('editar_area', (data) => {
			Area.update(data, (err) => {
				if(err) {
					socket.emit('editar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_area', { mensaje: 'Se actualizó exitósamente.' })
			
				areas()
			})
		})
}
