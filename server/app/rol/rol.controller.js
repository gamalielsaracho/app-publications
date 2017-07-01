import Rol from './rol.model.js'

exports.crear = function(req, res, next) {
	let datos = {
		id_rol: null,
		nombre: req.body.nombre
	}

	Rol.crear(datos, (err, result) => {
		if(err) {
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
		}

		console.log(result.insertId)
		
		return res.json({
			mensaje: 'El rol se creó exitosamente.',
			id_rol: result.insertId
		})
	})
}

exports.roles = function(req, res, next) {

	Rol.listar((err, roles) => {
		if(err) {
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente nuevamente.' })
		}

		// console.log(roles)

		res.json(roles)
	})
}