import Usuario from './usuario.model'

import jwt from 'jsonwebtoken'
import config from '../../config'

const privateKey = config.key.privateKey
const tokenExpiry = config.key.tokenExpiry

export default (socket, io) => {

	function usuariosLista() {
		Usuario.listar((err, usuarios) => {
			if(err) {
				socket.emit('listar_usuarios', { error: 'Ocurrió un error, intente nuevamente.' })
				return
			}

			// console.log(usuarios)
				
			io.sockets.emit('listar_usuarios', { usuarios: usuarios })
		})
	}

	usuariosLista()

	socket.on('registrar_usuario', (data) => {

		Usuario.verificarCorreo(data.correo, (err, usuarioExistente) => {
			if(err) {
				socket.emit('registrar_usuario', { error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
				return
			}

			console.log(usuarioExistente.length != 0)

			if(usuarioExistente.length != 0) {
				socket.emit('registrar_usuario', { error: 'Este correo ya está registrado.' })
			}else {
				Usuario.crear(data, (err, usuario) => {
					if(err) {
						socket.emit('registrar_usuario', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
						return
					}

					socket.emit('registrar_usuario', { mensaje: 'El usuario se creó exitosamente.' })
					
					usuariosLista()
				})
			}

		})
	})


	socket.on('autenticar_usuario', (data) => {

		console.log('Los datos que llegaron son')
		console.log(data)

		Usuario.verificarCorreo(data.correo, (err, usuario) => {

			if(err) {
				return next(err)
			}

			if(usuario[0]) {
				console.log("contrasena server: "+usuario[0].contrasena)

				if(usuario[0].contrasena != data.contrasena) {
					socket.emit('autenticar_usuario', { error: 'La contraseña es incorrecta.' })
					return
				}

				let datosToken = {
					id: usuario[0].id,
					nombre: usuario[0].nombre,
					apellido: usuario[0].apellido,
					correo: usuario[0].correo
				}

				const token = jwt.sign(datosToken, privateKey, { expiresIn: tokenExpiry })

				socket.emit('autenticar_usuario', { 
					token: token,
					mensaje: 'Autenticación exitosamente.' 
				})
			
			} else {
				socket.emit('autenticar_usuario', { error: 'Este correo no existe.' })
			}

		})
	})


	socket.on('mostrar_usuario', (data) => {
		Usuario.mostrar(data.id_usuario, (err, usuario) => {
			if(err) {
				socket.emit('mostrar_usuario', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('mostrar_usuario', usuario[0])
		})
	})

	socket.on('verificar_token', (data) => {
		const token = data.token

		if(!token) {
			socket.emit('verificar_token', { error: 'Tú no tienes Token, Inicia sessión nuevamente.' })
			return
		}

		jwt.verify(token, privateKey, (err, usuario) => {
			if(err) {
				throw error
			}

			Usuario.verificarCorreo(usuario.correo, (err, userFromServer) => {

				socket.emit('verificar_token', userFromServer[0])
				// console.log(userFromServer)
			})
		})
	})
}