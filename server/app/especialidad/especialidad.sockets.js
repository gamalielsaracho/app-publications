import Especialidad from './especialidad.model'

import Query from '../queries'

const table = 'especialidades'
const fieldId = 'id_especialidad'

export default (socket, io) => {
	
		function especialidades() {
			Query.find(table, (err, especialidades) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_especialidades', { error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
					return
				}

				io.sockets.emit('listar_especialidades', { especialidades: especialidades })
			})
		}
	
		especialidades()


		socket.on('crear_especialidad', function(data) {
			Especialidad.create(data, (err, especialidad) => {
				if(err) {
					socket.emit('crear_especialidad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('crear_especialidad', { mensaje: 'Se agregó exitósamente.' })
			
				especialidades()
			})
		})


		socket.on('mostrar_especialidad', (data) => {
			Query.findById(table, fieldId, data.id_especialidad, (err, especialidad) => {
				if(err) {
					socket.emit('mostrar_especialidad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('mostrar_especialidad', especialidad[0])
			})
		})


		socket.on('eliminar_especialidad', (data) => {
			Query.delete(table, fieldId, data.id_especialidad, (err) => {
				if(err) {
					socket.emit('eliminar_especialidad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('eliminar_especialidad', { mensaje: 'Se Eliminó exitósamente.' })

				especialidades()
			})
		})


		socket.on('editar_especialidad', (data) => {
			Especialidad.update(data, (err) => {
				if(err) {
					socket.emit('editar_especialidad', { error: 'Ocurrió un error, intente nuevamente' })
					return
				}

				socket.emit('editar_especialidad', { mensaje: 'Se actualizó exitósamente.' })
			
				especialidades()
			})
		})
}
