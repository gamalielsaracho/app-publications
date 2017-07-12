import Rol from './rol.model'

export default (socket, io) => {
	
	console.log('LA QUE AHORA ESTÁ ES: '+socket.usuario)

	function roles() {
		Rol.listar((err, roles) => {
			if(err) {
				console.log(err)
			
				socket.emit('listar_roles', { error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
				return
			}

			// console.log(roles)

			io.sockets.emit('listar_roles', { roles: roles })
		})
	}
	
	roles()


	socket.on('crear_rol', function(data) {
		Rol.crear(data, (err, rol) => {
			if(err) {
				socket.emit('crear_rol', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('crear_rol', { mensaje: 'Se agregó exitósamente.' })
		
			roles()
		})
	})


	socket.on('mostrar_rol', (data) => {
		Rol.mostrar(data.id_rol, (err, rol) => {
			if(err) {
				socket.emit('mostrar_rol', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('mostrar_rol', rol[0])
		})
	})


	socket.on('eliminar_rol', (data) => {
		Rol.eliminar(data.id_rol, (err) => {
			if(err) {
				socket.emit('eliminar_rol', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('eliminar_rol', { mensaje: 'Se Eliminó exitósamente.' })

			roles()
		})
	})


	socket.on('editar_rol', (data) => {
		Rol.editar(data, (err) => {
			if(err) {
				socket.emit('editar_rol', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('editar_rol', { mensaje: 'Se actualizó exitósamente.' })
		
			roles()
		})
	})
}
