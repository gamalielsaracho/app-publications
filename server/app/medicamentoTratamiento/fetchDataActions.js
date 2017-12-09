import MedicamentoTratamiento from './medicamentoTratamiento.model'
import Medicamento from '../medicamento/medicamento.model'
import MedicamentoDroga from '../medicamentoDroga/medicamentoDroga.model'


export default (nsp, socket) => {

	return {
		listarByIdTratamiento: (data) => {
				// console.log(medicamentosTratamiento)
			MedicamentoTratamiento.findListByIdTratamiento(data, (err, medicamentosTratamiento) => {
				if(err) {
					console.log(err)
						
					socket.emit('listar_medicamentosXtratamientos_byIdTratamiento', { 
						error: 'Lo sentimos, acurrió un error. intente más tarde.' 
					})
					return
				}

				
				let longMedicamentosTratamiento = medicamentosTratamiento.length

				if(longMedicamentosTratamiento) {
					medicamentosTratamiento.map((i) => {
						let idMedicamento = i.indicacion.id_medicamento

						// console.log('idMedicamento ----> '+idMedicamento)

						Medicamento.findById({ id_medicamento: idMedicamento }, (err, medicamento) => {
								
							if(medicamento[0]) {
								i.detalleMedicamento = medicamento[0]
							}


							MedicamentoDroga.find(idMedicamento , (err, drogas) => {
								if(err) {
									console.log(err)
									socket.emit('listar_medicamentosXtratamientos_byIdTratamiento', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
								}
									
								if(i.detalleMedicamento) {
									i.detalleMedicamento.drogas = drogas
								} else {
									i.detalleMedicamento = {}
									i.detalleMedicamento = null
								}

								// console.log(i)

								if(i == medicamentosTratamiento[longMedicamentosTratamiento - 1]) {
									nsp.emit('listar_medicamentosXtratamientos_byIdTratamiento', { 
										medicamentosTratamiento: medicamentosTratamiento 
									})
								}
							})
						})
					})				

				} else {
					nsp.emit('listar_medicamentosXtratamientos_byIdTratamiento', { 
						medicamentosTratamiento: medicamentosTratamiento 
					})
				}

			})
		}
		
	}
}