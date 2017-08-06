import Ciudad from './ciudad.model'

import Query from '../queries'

const table = 'ciudades'
const fieldId = 'id_ciudad'

export default (socket, io) => {
	
		function ciudades() {
			Query.find(table, (err, ciudades) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_ciudades', { error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
					return
				}

				io.sockets.emit('listar_ciudades', { ciudades: ciudades })
			})
		}
	
		ciudades()


		socket.on('crear_ciudad', function(data) {
			Ciudad.create(data, (err, ciudad) => {
				if(err) {
					socket.emit('crear_ciudad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('crear_ciudad', { mensaje: 'Se agregó exitósamente.' })
			
				ciudades()
			})
		})


		socket.on('mostrar_ciudad', (data) => {
			Query.findById(table, fieldId, data.id_ciudad, (err, ciudad) => {
				if(err) {
					socket.emit('mostrar_ciudad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('mostrar_ciudad', ciudad[0])
			})
		})


		socket.on('eliminar_ciudad', (data) => {
			Query.delete(table, fieldId, data.id_ciudad, (err) => {
				if(err) {
					socket.emit('eliminar_ciudad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('eliminar_ciudad', { mensaje: 'Se Eliminó exitósamente.' })

				ciudades()
			})
		})


		socket.on('editar_ciudad', (data) => {
			Ciudad.update(data, (err) => {
				if(err) {
					socket.emit('editar_ciudad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('editar_ciudad', { mensaje: 'Se actualizó exitósamente.' })
			
				ciudades()
			})
		})
}
