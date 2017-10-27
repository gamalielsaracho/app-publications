import React, { Component } from 'react'
import { Link } from 'react-router'


class Estadistica2 extends Component {
	constructor(props) {
		super(props)
	}

	updateChart(datosProps) {
		if(datosProps) {
			// let datos = datosProps[0]
			console.log('desde componentDidMount')
			console.log(datosProps)

		  let chartCanvas = this.refs.chart;

		  let myChart = new Chart(chartCanvas, {
		    type: 'bar',
		    data: {
				labels: datosProps.labels,
		    	datasets: [{
			        label: datosProps.fecha,
			        data: datosProps.data,
			        backgroundColor: [
			            'rgba(255, 99, 132, 0.2)',
			            'rgba(54, 162, 235, 0.2)',
			            'rgba(255, 206, 86, 0.2)',
			            'rgba(75, 192, 192, 0.2)',
			            'rgba(153, 102, 255, 0.2)',
			            'rgba(255, 159, 64, 0.2)'
			        ],
			        borderColor: [
			        	'rgba(255,99,132,1)',
			        	'rgba(54, 162, 235, 1)',
			        	'rgba(255, 206, 86, 1)',
			        	'rgba(75, 192, 192, 1)',
			        	'rgba(153, 102, 255, 1)',
			        	'rgba(255, 159, 64, 1)'
			        ],
			        borderWidth: 1
			    }]
	    	},
		    options: {
		    	scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
	        	}
		    }
		  });
			
		}
	}

	
	componentDidMount () {
		this.updateChart(this.props.datos)
	}

	componentDidUpdate (prevProps, prevState) {
		console.log('prevProps valoresFiltro')
		console.log(prevProps.valoresFiltro)

		console.log('this.props.valoresFiltro')
		console.log(this.props.valoresFiltro)

		if(prevProps.valoresFiltro.anho !== this.props.valoresFiltro.anho) {
			this.updateChart(this.props.datos)
		}
	}

	// componentWillUnmount() {
	// 	console.log("componentWillUnmount.")
	// }
	
	render() {
		return <div className='row'>
			<div className='col-xs-12 col-sm-10 col-md-10 col-lg-10'>
				<canvas ref={'chart'} height={'400'} width={'600'}></canvas>
			</div>
		</div>
	}
}

export default Estadistica2