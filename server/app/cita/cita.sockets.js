import Cita from './cita.model'

export default (io) => {
	var citaNsp = io.of('/cita');
	
	citaNsp.on('connection', function (socket) {

		console.log('Cita Conectado.')

		socket.on('listar_citas', () => {
			// Cita.buscarCitaFechaActual((err, citaDelDia) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

			// 	console.log("id_cita del paciente X con fecha actual:"+citaDelDia[0].id_cita)
			// })


			function citas() {
				Cita.find((err, citas) => {
					// console.log(citas)
					if(err) {
						console.log(err)
					
						socket.emit('listar_citas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					citaNsp.emit('listar_citas', { citas: citas })
				})
			}
		
			citas()


			socket.on('crear_cita', function(data) {
				Cita.create(data, (err, cita) => {
					if(err) {
						socket.emit('crear_cita', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('crear_cita', { mensaje: 'Se agregó exitósamente.' })
				
					citas()
				})
			})

			socket.on('eliminar_cita', (data) => {
				Cita.delete(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('eliminar_cita', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('eliminar_cita', { mensaje: 'Se Eliminó exitósamente.' })

					citas()
				})
			})


			socket.on('editar_cita', (data) => {
				Cita.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_cita', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_cita', { mensaje: 'Se actualizó exitósamente.' })
				
					citas()
				})
			})
		})

		// Esta acción saco afuera, porque si está dentro de listar_citas,
		// a la hora de ver una cita, y actualizar la página, No entra
		// a mostrar_cita, y queda esperando. 
		socket.on('mostrar_cita', (data) => {
				Cita.findById(data, (err, cita) => {
					console.log(cita)
					if(err) {
						console.log(err)
						socket.emit('mostrar_cita', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_cita', cita[0])
				})
			})



		socket.on('disconnect', function () {
			console.log('Cita Desconecto.')
		})
	})
}
