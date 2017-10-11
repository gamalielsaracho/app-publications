import consultaSintomaCtrl from './consultaSintoma.controller'

export default (app) => {
	app.route('/api/consultasintomas/:idConsulta')
	   .get(consultaSintomaCtrl.listar)

	app.route('/api/consultasintomas/crear')
	   .post(consultaSintomaCtrl.crear)

	app.route('/api/consultasintomas/:idConsultaSintoma/editar')
	   .get(consultaSintomaCtrl.mostrar)

	app.route('/api/consultasintomas/editar')
	   .put(consultaSintomaCtrl.editar)

	app.route('/api/consultasintomas/:idConsultaSintoma/eliminar')
	   .delete(consultaSintomaCtrl.eliminar)
}