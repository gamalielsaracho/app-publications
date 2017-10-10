import analisisCtrl from './analisis.controller'

export default (app) => {
	app.route('/api/analisis/:idAnalisis/vista-gral')
	   .get(analisisCtrl.vistaGral)
}