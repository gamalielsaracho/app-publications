import React, { Component } from 'react'

class Cargando extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div className='row center-lg center-md center-sm center-xs'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
					<div className="preloader-wrapper big active">
					    <div className="spinner-layer spinner-blue">
					    	<div className="circle-clipper left">
					      		<div className="circle"></div>
					    	</div><div className="gap-patch">
					      		<div className="circle"></div>
					    	</div><div className="circle-clipper right">
					      		<div className="circle"></div>
					    	</div>
					    </div>

					    <div className="spinner-layer spinner-red">
						    <div className="circle-clipper left">
						    	<div className="circle"></div>
						    </div><div className="gap-patch">
						    	<div className="circle"></div>
						    </div><div className="circle-clipper right">
						    	<div className="circle"></div>
						    </div>
					    </div>
					</div>
				</div>
			</div>
	}
}

export default Cargando