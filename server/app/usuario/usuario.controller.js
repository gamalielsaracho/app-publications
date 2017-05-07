import Usuario from './usuario.model.js'

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
		console.log(usuarioExistente.length != 0)
		if(usuarioExistente.length != 0) {
			return res.status(422).json({ error: 'Este correo ya está registrado.' })
		}else {
			Usuario.crear(datos, (err, usuario) => {
				if(err) {
					return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
				}

				res.json({ mensaje: 'El usuario se creó exitosamente.', usuario: usuario })
			})
		}

	})

}