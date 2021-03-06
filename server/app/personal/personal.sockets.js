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

	// Listar solamente los médicos.
	Personal.findMedicos((err, personales) => {
		if(err) {
			socket.emit('listar_personales_medicos', { error: 'Ocurrió un error, intente nuevamente.' })
			return
		}
				
		io.sockets.emit('listar_personales_medicos', { personales: personales })
	})


	socket.on('registrar_personal', (data) => {
		// console.log(data.correo)

		Personal.verificarDocumentoYtipo(data, (err, personalExistente) => {
			if(err) {
				console.log(err)
				socket.emit('registrar_personal', { error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
				return
			}

			if(personalExistente[0]) {
				socket.emit('registrar_personal', { error: 'Este existe un personal con este Nro de documento y tipo.' })
			} else {
				Personal.verifyEmailRegister(data.correo, (err, personalCorreoExistente) => {

					// console.log(personalCorreoExistente)

					if(personalCorreoExistente[0]) {
						socket.emit('registrar_personal', { error: 'Este correo ya está registrado.' })
					}else {
						Personal.create(data, (err, personal) => {
							if(err) {
								console.log(err)
								socket.emit('registrar_personal', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
								return
							}

							socket.emit('registrar_personal', { mensaje: 'El personal se creó exitosamente.' })
							
							personalesLista()
						})
					}

				})
				
			}

		})


	})


	socket.on('autenticar_personal', (data) => {

		Personal.verifyEmailAuth(data.correo, (err, contenido) => {

			let dato = contenido[0]
			
			// console.log(dato)

			if(err) {
				return console.log(err)
			}

			if(dato) {
				// console.log("contrasena server: "+dato.personal.contrasena)

				if(dato.personal.contrasena != data.contrasena) {
					socket.emit('autenticar_personal', { error: 'La contraseña es incorrecta.' })
					return
				}

				let datosToken = {
					id_personal: dato.personal.id_personal,
					nombres: dato.personal.nombres,
					apellidos: dato.personal.apellidos,
					correo: dato.personal.correo,
					id_rol: dato.rol.id_rol,
					rol: dato.rol.descripcion
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


	socket.on('mostrar_personal_editar', (data) => {
		Personal.findByIdToEdit(data.id_personal, (err, personal) => {
			if(err) {
				socket.emit('mostrar_personal_editar', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('mostrar_personal_editar', personal[0])
		})
	})
	

	socket.on('editar_personal', (data) => {
		
		Personal.update(data, (err, personal) => {
			if(err) {
				console.log(err)
				socket.emit('editar_personal', { error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				return
			}

			socket.emit('editar_personal', { mensaje: 'El personal se actualizó exitosamente.' })
								
			personalesLista()	
		})

	})


	socket.on('mostrar_personal', (data) => {
		Personal.findById(data.id_personal, (err, personal) => {
			if(err) {
				socket.emit('mostrar_personal', { error: 'Ocurrió un error, intente nuevamente' })
				return
			}

			socket.emit('mostrar_personal', personal[0])
		})
	})

	socket.on('verificar_token', (data) => {
		const token = data.token

		console.log(token)

		if(!token) {
			socket.emit('verificar_token', { error: 'Tú no tienes Token, Inicia sessión nuevamente.' })
			return
		}

		jwt.verify(token, privateKey, (err, personal) => {
			if(err) {
				throw error
			}

			Personal.verifyEmailAuth(personal.correo, (err, personalFromServer) => {

				socket.emit('verificar_token', personalFromServer[0])
			})
		})
	})
}