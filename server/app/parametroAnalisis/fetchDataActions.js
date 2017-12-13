import ParametroAnalisis from './parametroAnalisis.model'

export default (nsp, socket) => {

	return {
		listarParametrosAnalisis: () => {
			ParametroAnalisis.find((err, parametrosAnalisis) => {
				// console.log(parametrosAnalisis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_parametrosAnalisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				nsp.emit('listar_parametrosAnalisis', {
					parametrosAnalisis: parametrosAnalisis
				})
			})
		},

		listarParametrosAnalisisByIdTipoAnalisis: (idTipoAnalisis) => {
			ParametroAnalisis.findListByIdTipoAnalisis(idTipoAnalisis, (err, parametrosAnalisis) => {
				// console.log(parametrosAnalisis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_parametrosAnalisis_byIdTipoAnalisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				nsp.emit('listar_parametrosAnalisis_byIdTipoAnalisis', {
					parametrosAnalisis: parametrosAnalisis
				})
			})
		},

		mostrarParametroAnalisis: (data) => {
			ParametroAnalisis.findById(data, (err, parametroAnalisis) => {
				// console.log(parametroAnalisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				nsp.emit('mostrar_parametroAnalisis', parametroAnalisis[0])
			})
		},

		mostrarParametroAnalisisEditar: (data) => {
			ParametroAnalisis.findByIdToEdit(data, (err, parametroAnalisis) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_parametroAnalisis_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_parametroAnalisis_editar', parametroAnalisis[0])
			})
		}
		
	}
}