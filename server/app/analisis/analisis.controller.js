import Analisis from './analisis.model'

import AnalisisTipo from '../analisisTipo/analisisTipo.model'
import AnalisisTipoReferencia from '../analisisTipoReferencia/analisisTipoReferencia.model'


exports.vistaGral = function(req, res, next) {
	let data = {}

	data.id_analisis = req.params.idAnalisis

	Analisis.preview(data, (err, analisis) => {
		// console.log(analisis)
		analisis = analisis[0]
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		analisis.anlisisTipos = []

		AnalisisTipo.find(data.id_analisis, (err, anlisisTipos) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
			}

			let longAnlisisTipos = anlisisTipos.length

			anlisisTipos.map((i) => {
				// i.referencias = []

				AnalisisTipoReferencia.find(i.analisisTipo.id_analisisTipo, (err, referencias) => {

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
					}


					i.referencias = referencias
					analisis.anlisisTipos.push(i)

					if(i == anlisisTipos[longAnlisisTipos-1]) {
						return res.json(analisis)
					}
				})

			})

		})
	})
}
