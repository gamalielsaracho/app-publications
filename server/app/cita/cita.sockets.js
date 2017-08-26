import Cita from './cita.model'

export default (io) => {
	var citaNsp = io.of('/cita');
	
	citaNsp.on('connection', function (socket) {

		console.log('Cita Conectado.')

		socket.on('listar_citas', () => {
			
			function citas() {
				Cita.find((err, citas) => {
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


			socket.on('mostrar_cita', (data) => {
				Cita.findById(data, (err, cita) => {
					if(err) {
						console.log(err)
						socket.emit('mostrar_cita', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_cita', cita[0])
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



		socket.on('disconnect', function () {
			console.log('Cita Desconecto.')
		})
	})
}
