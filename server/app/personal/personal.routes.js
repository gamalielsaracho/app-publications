import usuarioCtrl from './personal.controller.js'

export default (app) => {
	app.route('/api/usuarios')
	   .get(usuarioCtrl.usuarios)

	app.route('/api/usuarios/crear')
	   .post(usuarioCtrl.registrar)

	app.route('/api/usuarios/autenticacion')
	   .post(usuarioCtrl.autenticacion)

	app.route('/api/usuarios/:usuarioId')
	   .get(usuarioCtrl.mostrar)

	app.route('/api/usuarios/verifivartoken/:tokenFromLocalStorage')
	   .get(usuarioCtrl.verificarToken)
}