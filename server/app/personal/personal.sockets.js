import Personal from './personal.model'

import jwt from 'jsonwebtoken'
import config from '../../config'

const privateKey = config.key.privateKey
const tokenExpiry = config.key.tokenExpiry

export default (socket, io) => {

	function personalesLista() {
		Personal.find((err, personales) => {
			if(err) {
				socket.emit('listar_personales', { error: 'Ocurrió un error, intente nuevamente.' })
				return
			}
				
			io.sockets.emit('listar_personales', { personales: personales })
		})
	}

	personalesLista()

	socket.on('registrar_personal', (data) => {

		Personal.verifyEmail(data.correo, (err, personalExistente) => {
			if(err) {
				socket.emit('registrar_personal', { error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
				return
			}

			console.log(personalExistente.length != 0)

			if(personalExistente.length != 0) {
				socket.emit('registrar_personal', { error: 'Este correo ya está registrado.' })
			}else {
				Personal.create(data, (err, personal) => {
					if(err) {
						socket.emit('registrar_personal', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
						return
					}

					socket.emit('registrar_personal', { mensaje: 'El personal se creó exitosamente.' })
					
					personalesLista()
				})
			}

		})
	})


	socket.on('autenticar_personal', (data) => {

		Personal.verifyEmail(data.correo, (err, personal) => {

			if(err) {
				return next(err)
			}

			if(personal[0]) {
				console.log("contrasena server: "+personal[0].contrasena)

				if(personal[0].contrasena != data.contrasena) {
					socket.emit('autenticar_personal', { error: 'La contraseña es incorrecta.' })
					return
				}

				let datosToken = {
					id: personal[0].id,
					nombre: personal[0].nombre,
					apellido: personal[0].apellido,
					correo: personal[0].correo
				}

				const token = jwt.sign(datosToken, privateKey, { expiresIn: tokenExpiry })

				socket.emit('autenticar_personal', { 
					token: token,
					mensaje: 'Autenticación exitosamente.' 
				})
			
			} else {
				socket.emit('autenticar_personal', { error: 'Este correo no existe.' })
			}

		})
	})


	socket.on('mostrar_personal', (data) => {
		Personal.findById(data.id_usuario, (err, personal) => {
			if(err) {
				socket.emit('mostrar_personal', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('mostrar_personal', personal[0])
		})
	})

	socket.on('verificar_token', (data) => {
		const token = data.token

		if(!token) {
			socket.emit('verificar_token', { error: 'Tú no tienes Token, Inicia sessión nuevamente.' })
			return
		}

		jwt.verify(token, privateKey, (err, personal) => {
			if(err) {
				throw error
			}

			Personal.verifyEmail(personal.correo, (err, personalFromServer) => {

				socket.emit('verificar_token', personalFromServer[0])
			})
		})
	})
}