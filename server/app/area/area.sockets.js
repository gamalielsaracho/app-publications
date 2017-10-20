import Area from './area.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

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
			referentialIntegritySimple('pacientes', 'id_area', data.id_area, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_area', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_area', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Area.delete(data.id_area, (err) => {
						if(err) {
							socket.emit('eliminar_area', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_area', { mensaje: 'Se Eliminó exitósamente.' })

						areas()
					})
				}
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
