import preConsultaParametroCtrl from './preConsultaParametro.controller'

export default (app) => {
	app.route('/api/parametrospreConsulta/:idPreconsulta')
	   .get(preConsultaParametroCtrl.listar)

	app.route('/api/parametrospreConsulta/:idPreconsultaParametro')
	   .get(preConsultaParametroCtrl.mostrar)

	app.route('/api/parametrospreConsulta/crear')
	   .post(preConsultaParametroCtrl.crear)

	app.route('/api/parametrospreConsulta/:idPreconsultaParametro/editar')
	   .get(preConsultaParametroCtrl.mostrarParaEditar)

	app.route('/api/parametrospreConsulta/editar')
	   .put(preConsultaParametroCtrl.editar)

	app.route('/api/parametrospreConsulta/:idPreconsultaParametro/eliminar')
	   .delete(preConsultaParametroCtrl.eliminar)
}