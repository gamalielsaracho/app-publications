import Preconsulta from './preconsulta.model'

export default (io) => {
	var preconsultaNsp = io.of('/preconsulta');
	
	preconsultaNsp.on('connection', function (socket) {

		console.log('Pre-consulta Conectado.')

		socket.on('listar_preconsultas', () => {
			
			function preconsultas() {
				Preconsulta.find((err, preconsultas) => {
					// console.log(preconsultas)
					if(err) {
						console.log(err)
					
						socket.emit('listar_preconsultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					preconsultaNsp.emit('listar_preconsultas', { preconsultas: preconsultas })
				})
			}
		
			preconsultas()


			socket.on('crear_preconsulta', function(data) {
				Preconsulta.create(data, (err, preconsulta) => {
					if(err) {
						socket.emit('crear_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('crear_preconsulta', { mensaje: 'Se agregó exitósamente.' })
				
					preconsultas()
				})
			})

			socket.on('eliminar_preconsulta', (data) => {
				Preconsulta.delete(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('eliminar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('eliminar_preconsulta', { mensaje: 'Se Eliminó exitósamente.' })

					preconsultas()
				})
			})


			socket.on('editar_preconsulta', (data) => {
				Preconsulta.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_preconsulta', { mensaje: 'Se actualizó exitósamente.' })
				
					preconsultas()
				})
			})
		})

		// Esta acción saco afuera, porque si está dentro de listar_preconsultas,
		// a la hora de ver una preconsulta, y actualizar la página, No entra
		// a mostrar_preconsulta, y queda esperando. 
		socket.on('mostrar_preconsulta', (data) => {
			Preconsulta.findById(data, (err, preconsulta) => {
				console.log(preconsulta)
				if(err) {
					console.log(err)
					socket.emit('mostrar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_preconsulta', preconsulta[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Pre-consulta Desconecto.')
		})
	})
}
