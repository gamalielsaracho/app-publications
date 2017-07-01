import rolCtrl from './rol.controller.js'

export default (app) => {
	app.route('/api/roles/crear')
	   .post(rolCtrl.crear)

	app.route('/api/roles')
	   .get(rolCtrl.roles)

}