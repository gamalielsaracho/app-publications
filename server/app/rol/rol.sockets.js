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

}
