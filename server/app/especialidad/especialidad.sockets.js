import Especialidad from './especialidad.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (socket, io) => {
	
		function especialidades() {
			Especialidad.find((err, especialidades) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_especialidades', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.sockets.emit('listar_especialidades', { especialidades: especialidades })
			})
		}
	
		especialidades()


		socket.on('crear_especialidad', function(data) {
			Especialidad.create(data, (err, especialidad) => {
				if(err) {
					socket.emit('crear_especialidad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_especialidad', { mensaje: 'Se agregó exitósamente.' })
			
				especialidades()
			})
		})


		socket.on('mostrar_especialidad', (data) => {
			Especialidad.findById(data.id_especialidad, (err, especialidad) => {
				if(err) {
					socket.emit('mostrar_especialidad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_especialidad', especialidad[0])
			})
		})


		socket.on('eliminar_especialidad', (data) => {
			// console.log("EL ID ES: "+data.id_especialidad)

			referentialIntegritySimple('personales', 'id_especialidad', data.id_especialidad, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_especialidad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_especialidad', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Especialidad.delete(data.id_especialidad, (err) => {
						if(err) {
							socket.emit('eliminar_especialidad', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_especialidad', { mensaje: 'Se Eliminó exitósamente.' })

						especialidades()
					})
				}
			})
		})


		socket.on('editar_especialidad', (data) => {

			Especialidad.update(data, (err) => {
				if(err) {
					socket.emit('editar_especialidad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_especialidad', { mensaje: 'Se actualizó exitósamente.' })
			
				especialidades()
			})
		})
}
