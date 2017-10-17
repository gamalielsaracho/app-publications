import medicamentoXentregadoCtrl from './medicamentoXentregado.controller'

export default (app) => {
	app.route('/api/medicamentosXentregados/:idMedicamentoEntregado')
	   .get(medicamentoXentregadoCtrl.listar)

	app.route('/api/medicamentosXentregados/:idMedicamentoXentregado/mostrar')
	   .get(medicamentoXentregadoCtrl.mostrarNested)

	app.route('/api/medicamentosXentregados/crear')
	   .post(medicamentoXentregadoCtrl.crear)

	app.route('/api/medicamentosXentregados/:idMedicamentoXentregado/editar')
	   .get(medicamentoXentregadoCtrl.mostrarParaEditar)

	app.route('/api/medicamentosXentregados/editar')
	   .put(medicamentoXentregadoCtrl.editar)

	app.route('/api/medicamentosXentregados/:idMedicamentoXentregado/eliminar')
	   .delete(medicamentoXentregadoCtrl.eliminar)
}