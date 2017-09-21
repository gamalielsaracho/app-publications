import diagnosticoConsultaCtrl from './diagnosticoConsulta.controller'

export default (app) => {
	app.route('/api/diagnosticosConsulta/:idConsulta')
	   .get(diagnosticoConsultaCtrl.listar)

	app.route('/api/diagnosticosConsulta/:idDiagnosticoConsulta')
	   .get(diagnosticoConsultaCtrl.mostrar)

	app.route('/api/diagnosticosConsulta/crear')
	   .post(diagnosticoConsultaCtrl.crear)

	app.route('/api/diagnosticosConsulta/:idDiagnosticoConsulta/editar')
	   .get(diagnosticoConsultaCtrl.mostrarParaEditar)

	app.route('/api/diagnosticosConsulta/editar')
	   .put(diagnosticoConsultaCtrl.editar)

	app.route('/api/diagnosticosConsulta/:idDiagnosticoConsulta/eliminar')
	   .delete(diagnosticoConsultaCtrl.eliminar)
}