import Usuario from './usuario.model.js'

exports.usuarios = (req, res, next) => {
	Usuario.listar((err, usuarios) => {
		if(err) {
			return next(err)
		}

		res.json(usuarios)
	})
}