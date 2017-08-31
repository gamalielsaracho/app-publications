import Nivel from './nivel.model'

export default (io) => {
	var nivelNsp = io.of('/nivel');
	
	nivelNsp.on('connection', function (socket) {

		console.log('Nivel Conectado.')

		socket.on('listar_niveles', () => {

			function niveles() {
				Nivel.find((err, niveles) => {
					// console.log(niveles)
					if(err) {
						console.log(err)
					
						socket.emit('listar_niveles', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					nivelNsp.emit('listar_niveles', { niveles: niveles })
				})
			}
		
			niveles()


			socket.on('crear_nivel', function(data) {
				Nivel.create(data, (err, nivel) => {
					if(err) {
						socket.emit('crear_nivel', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('crear_nivel', { mensaje: 'Se agregó exitósamente.' })
				
					niveles()
				})
			})

			socket.on('eliminar_nivel', (data) => {
				Nivel.delete(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('eliminar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('eliminar_nivel', { mensaje: 'Se Eliminó exitósamente.' })

					niveles()
				})
			})


			socket.on('editar_nivel', (data) => {
				Nivel.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_nivel', { mensaje: 'Se actualizó exitósamente.' })
				
					niveles()
				})
			})
		})

		// Esta acción saco afuera, porque si está dentro de listar_citas,
		// a la hora de ver un nivel, y actualizar la página, No entra
		// a mostrar_nivel, y queda esperando. 
		socket.on('mostrar_nivel', (data) => {
				Nivel.findById(data, (err, nivel) => {
					console.log(nivel)

					if(err) {
						console.log(err)
						socket.emit('mostrar_nivel', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_nivel', nivel[0])
				})
			})



		socket.on('disconnect', function () {
			console.log('Nivel Desconecto.')
		})
	})
}
