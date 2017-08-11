import Departamento from './departamento.model'

export default (socket, io) => {
	
		function departamentos() {
			Departamento.find((err, departamentos) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_departamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.sockets.emit('listar_departamentos', { departamentos: departamentos })
			})
		}
	
		departamentos()


		socket.on('crear_departamento', function(data) {
			Departamento.create(data, (err, departamento) => {
				if(err) {
					socket.emit('crear_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_departamento', { mensaje: 'Se agregó exitósamente.' })
			
				departamentos()
			})
		})


		socket.on('mostrar_departamento', (data) => {
			Departamento.findById(data.id_departamento, (err, departamento) => {
				if(err) {
					socket.emit('mostrar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_departamento', departamento[0])
			})
		})


		socket.on('eliminar_departamento', (data) => {
			Departamento.delete(data.id_departamento, (err) => {
				if(err) {
					socket.emit('eliminar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_departamento', { mensaje: 'Se Eliminó exitósamente.' })

				departamentos()
			})
		})


		socket.on('editar_departamento', (data) => {
			Departamento.update(data, (err) => {
				if(err) {
					socket.emit('editar_departamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_departamento', { mensaje: 'Se actualizó exitósamente.' })
			
				departamentos()
			})
		})
}
