import Usuario from './usuario.model.js'
import jwt from 'jsonwebtoken'
import config from '../../config'

const privateKey = config.key.privateKey
const tokenExpiry = config.key.tokenExpiry

exports.usuarios = (req, res, next) => {
	Usuario.listar((err, usuarios) => {
		if(err) {
			return next(err)
		}

		res.json(usuarios)
	})
}

exports.registrar = (req, res, next) => {

	var datos = {
		id: null,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		correo: req.body.correo,
		contrasena: req.body.contrasena
	}


	Usuario.verificarCorreo(datos.correo, (err, usuarioExistente) => {
		if(err) {
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
		}

		console.log(usuarioExistente.length != 0)
		if(usuarioExistente.length != 0) {
			return res.status(422).json({ error: 'Este correo ya está registrado.' })
		}else {
			Usuario.crear(datos, (err, usuario) => {
				if(err) {
					return res.status(422).json({ error: 'Lo sentimos, ocurrió un error. intente nuevamente.' })
				}

				res.json({ mensaje: 'El usuario se creó exitosamente.' })
			})
		}

	})

}

exports.autenticacion = (req, res, next) => {
	// var datos = {}
	const correo = req.body.correo
	const contrasena = req.body.contrasena

	Usuario.verificarCorreo(correo, (err, usuario) => {

		if(err) {
			return next(err)
		}

		if(usuario[0]) {
			if(usuario[0].contrasena != contrasena) {
				return res.status(422).json({ error: 'Lo sentimos, ocurrió un error, intente nuevamente .' })
			}

			let datosToken = {
				id: usuario[0].id,
				nombre: usuario[0].nombre,
				apellido: usuario[0].apellido,
				correo: usuario[0].correo
			}

			const token = jwt.sign(datosToken, privateKey, { expiresIn: tokenExpiry })

			return res.json({ 
				token: token,
				mensaje: 'Autenticación exitosamente.' 
			})
		
		} else {
			return res.status(422).json({ error: 'Este correo no existe.' })
		}

	})
}

exports.mostrar = (req, res, next) => {
	const usuarioId = req.params.usuarioId

	Usuario.mostrar(usuarioId, (err, usuario) => {
		if(err) {
			return res.status(422).json({ error: 'Ocurrió un error, intente nuevamente' })
		}

		return res.json(usuario[0])
	})
}
