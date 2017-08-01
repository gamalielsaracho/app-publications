import React, { Component } from 'react'
import { Link } from 'react-router'


class DashBoard extends Component {
	render() {
		let styles = {
			menuContainer: {
				"padding": "1em"
			},
			btnContainer: {
				padding: '0em .5em .5em 1.5em',
				color: "#fff"
			},
			btnText: {
				color: "#fff"
			}
		}

		return <div className='container'>
			<div className='row justify-lg justify-md justify-sm justify-xs'>
				<div style={styles.menuContainer} className='#00b0ff light-blue accent-3 col-xs-12 col-sm-12 col-md-2 col-lg-2'>
					<div className='row justify-lg justify-md between-sm justify-xs'>
						<div className='col-xs-12 col-sm-4 col-md-12 col-lg-12'>
							<h5 className='center'>Hola LOP</h5>
						</div>
					
						<div className='col-xs-12 col-sm-4 col-md-12 col-lg-12'>
							<ul className='row justify-lg justify-md justify-sm justify-xs'>
								
								<div style={styles.btnContainer} className='col-xs-6 col-sm-6 col-md-12 col-lg-12'>
									<div className='row justify-lg justify-md justify-sm justify-xs'>
										<div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
											<Link style={styles.btnText} to='/roles'>Roles</Link>
										</div>
										<div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
											<i className="sm material-icons">insert_chart</i>
										</div>
									</div>
								</div>

								<div style={styles.btnContainer} className='col-xs-6 col-sm-6 col-md-12 col-lg-12'>
									<div className='row justify-lg justify-md justify-sm justify-xs'>
										<div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
											<Link style={styles.btnText} to='/usuarios'>Usuarios</Link>
										</div>
										<div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
											<i className="sm material-icons">supervisor_account</i>
										</div>
									</div>
								</div>

							</ul>
						</div>
						
					</div>
				</div>

				<div className='col-xs-12 col-sm-12 col-md-10 col-lg-10'>
					<br/>
					{ this.props.children }
				</div>
			</div>
		</div>
	}
}

export default DashBoard