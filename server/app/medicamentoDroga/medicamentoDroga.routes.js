import medicamentoDrogaCtrl from './medicamentoDroga.controller'

export default (app) => {
	app.route('/api/medicamentoDrogas/:idMedicamento')
	   .get(medicamentoDrogaCtrl.listar)

	app.route('/api/medicamentoDrogas/crear')
	   .post(medicamentoDrogaCtrl.crear)

	app.route('/api/medicamentoDrogas/:idMedicamentoDroga/editar')
	   .get(medicamentoDrogaCtrl.mostrarParaEditar)

	app.route('/api/medicamentoDrogas/editar')
	   .put(medicamentoDrogaCtrl.editar)

	app.route('/api/medicamentoDrogas/:idMedicamentoDroga/eliminar')
	   .delete(medicamentoDrogaCtrl.eliminar)
}