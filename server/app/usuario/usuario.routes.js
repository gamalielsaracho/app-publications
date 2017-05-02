import usuarioCtrl from './usuario.controller.js'

export default (app) => {
	app.route('/api/usuarios')
	   .get(usuarioCtrl.usuarios)
}