import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import MaterialIcon from 'material-icons-react';
// import Radio from '@material-ui/core/Radio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class QaLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	ICMSstatus: false,
    	Consentstatus:false,
    	Itoolstatus:false,
    	Reminderstatus:false,
    	FollowUpstatus:false,

    	ICMSStyle:{display: 'none'},
    	ICMSStyle2:{display: 'none'},
    	consnetStyle:{display: 'none'},
    	itoolsStyle:{display: 'none'},
    	reminderStyle:{display: 'none'},
    	followUpStyle:{display: 'none'},
    	buildECDstyle:{display: 'none'},
    	dsStyle:{display: 'none'},

    	icon:"add_circle_outline",
    	iconColor:"#2196F3",
    	soText:"SO Order",

    	icmsValue : '',
    	icmsValue2 :'',
    	portalID : '',
    	consentValue :'2',
    	catValue:'0',
    	itoolValue:'',
    	notesValue:'',
    	buildECDValue:'',
    	startDate: moment().add(4, "days"),
    	expendInitial :'expend',
    };
    this.handleICMSValue = this.handleICMSValue.bind(this);
    this.handlePortalValue = this.handlePortalValue.bind(this);
    this.handleItoolValue = this.handleItoolValue.bind(this);
    this.handleICMSChange = this.handleICMSChange.bind(this);
    this.handleAddICMSValue = this.handleAddICMSValue.bind(this);
    this.handleICMSValue2 = this.handleICMSValue2.bind(this);
    this.handleConsentChange = this.handleConsentChange.bind(this);
    this.handleConsentValueChange = this.handleConsentValueChange.bind(this);
    this.handleItoolsChange = this.handleItoolsChange.bind(this);
    this.handleReminderChange = this.handleReminderChange.bind(this);
    this.handleFollowUpChange = this.handleFollowUpChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handlePortalValue(event){
  	axios.get('http://localhost/getOrderHistory',{
          params:{
            cpID:event.target.value,
          }
    }).then(response => {
    	console.log("abc  i cder")
    });
  	this.setState({portalID:event.target.value})
  };
  handleICMSValue(event){this.setState({icmsValue:event.target.value})};
  handleICMSValue2(event){this.setState({icmsValue2:event.target.value})};
  handleICMSChange(event){
    this.setState({ ICMSstatus: event.target.checked });
    if (this.state.ICMSstatus === false){
    	this.setState({ICMSStyle:{display: 'block'}})
    }
    else{
		this.setState({ICMSStyle:{display: 'none'},icmsValue : '',icmsValue2:'',soText:'SO Order',ICMSStyle2:{display: 'none'}});
    }
  };
  handleAddICMSValue(event){
	if (this.state.icon === "add_circle_outline"){
    	this.setState({ICMSStyle2:{display: 'block'},icon:"remove_circle_outline",iconColor:"#FF6E40",soText:"SO Orders"})	
    }
    else{
	    this.setState({ICMSStyle2:{display: 'none'},icon:"add_circle_outline",iconColor:"#2196F3",icmsValue2:'',soText:"SO Order"});
    }  	
  }
  handleConsentChange(event){
  	this.setState({ Consentstatus: event.target.checked });
   	if (this.state.Consentstatus === false){
    	this.setState({consnetStyle:{display: 'block'}})
    }
    else{
  		this.setState({consnetStyle:{display: 'none'},Itoolstatus: false,consentValue:""})
  	}  
  }
  handleConsentValueChange(event){
  	this.setState({consentValue:event.target.value})
  	if (event.target.value === "Requested"){
  		this.setState({itoolsStyle:{display: 'block'},Itoolstatus: true})
  	}
  	else{
  		this.setState({itoolsStyle:{display: 'none'},consentValue: event.target.value,Itoolstatus: false})
  	}
  }
  handleItoolValue(event){
  	this.setState({itoolValue:event.target.value})
  }
  handleItoolsChange(event){
  	this.setState({ Itoolstatus: event.target.checked });
   	if (this.state.Itoolstatus === false){
    	this.setState({itoolsStyle:{display: 'block'}})
    }
    else{
		this.setState({itoolsStyle:{display: 'none'},itoolValue : ''});
    }
  }
  handleReminderChange(event){
  	this.setState({ Reminderstatus: event.target.checked });
  	if (this.state.Reminderstatus === false){
    	this.setState({reminderStyle:{display: 'block'}})
    }
    else{
		this.setState({reminderStyle:{display: 'none'},});
    }
  }
   handleFollowUpChange(event){
  	this.setState({ FollowUpstatus: event.target.checked });
  	if (this.state.FollowUpstatus === false){
    	this.setState({followUpStyle:{display: 'block'},reminderStyle:{display: 'block'}})
    }
    else{
		this.setState({followUpStyle:{display: 'none'},reminderStyle:{display: 'none'},notesValue:'',startDate: moment().add(4, "days"),followUpValue:''});
    }
  }
  handleDateChange(date){
    this.setState({
      startDate: date
    });
  }

  handleCatChange = event => {
    this.setState({ catValue: event.target.value });
  }
  handleNotesValueChange = event => {
    this.setState({ notesValue: event.target.value });
  }
  handleFollowUpValueChange = event =>{
  	this.setState({followUpValue:event.target.value})
  	if (event.target.value !== "DS"){
    	this.setState({dsStyle:{display: 'none'},dsValue:''})
    }
    else{
		this.setState({dsStyle:{display: 'block'}})
    };
	if(event.target.value === "VPL" || event.target.value === "UCG" || event.target.value === "Downer" || event.target.value ==="Electronet"){
    	this.setState({ICMSstatus:true,ICMSStyle:{display: 'block'}})
    }
  }
  handleDSValue=event =>{
  	this.setState({dsValue:event.target.value})
  }
  expendAll=event=>{
  	if(this.state.expendInitial === 'expend'){
  		this.setState({
  			expendInitial:"close",
  			ICMSstatus: true,
    		Consentstatus:true,
	    	Itoolstatus:true,
	    	Reminderstatus:true,
	    	FollowUpstatus:true,
	    	ICMSStyle:{display: 'block'},
	    	ICMSStyle2:{display: 'block'},
	    	consnetStyle:{display: 'block'},
	    	itoolsStyle:{display: 'block'},
	    	reminderStyle:{display: 'block'},
	    	followUpStyle:{display: 'block'},
	    	soText:"SO Orders",
  		})
  	}
  	else{
  		this.setState({
  			expendInitial:"expend",
  			ICMSstatus: false,
	    	Consentstatus:false,
	    	Itoolstatus:false,
	    	Reminderstatus:false,
	    	FollowUpstatus:false,
	    	ICMSStyle:{display: 'none'},
	    	ICMSStyle2:{display: 'none'},
	    	consnetStyle:{display: 'none'},
	    	itoolsStyle:{display: 'none'},
	    	reminderStyle:{display: 'none'},
	    	followUpStyle:{display: 'none'},
	    	soText:"SO Order",

  		})
  	}
  }
  submitPMOrder =event =>{
  	console.log("fk me")
  } 
  submitFeedback=event=>{
  	console.log("fk u ")
  }

  render() {
    return (
	    <div className="container">
	    	<div className="input-group">
			  <input type="text" className="form-control" value={this.state.portalID} placeholder="Portal ID" onChange={this.handlePortalValue}/>
			  <div className="input-group-append">
			  <Button variant="raised" color="primary" onClick={this.expendAll} >
		        {this.state.expendInitial}
		        <MaterialIcon icon="dashboard" color='#FAFAFA' />
		      </Button>
		      <Button variant="raised" color="secondary" >
		        Reset
		        <MaterialIcon icon="undo" color='#FAFAFA' />
		      </Button>
			  </div>
			</div>
			<br />
			<div className="table-responsive shadow p-3 mb-5 bg-white rounded">
				<table className="table table-bordered">
				  <tbody>
				    <tr>
				      <td> RSP :<br/> 
				      	<select className="form-control" onChange={this.rspValue}>
					    <option>1</option>
					    <option>2</option>
					    <option>3</option>
					    <option>4</option>
					  	</select>
					  </td>
				      <td> PM Type : <br/> 
				      	<select className="form-control" onChange={this.pmTypeValue}>
					    <option>1</option>
					    <option>2</option>
					    <option>3</option>
					    <option>4</option>
					  	</select>
					  </td>
				      <td> Portal Status : <br/> 
				      	<select className="form-control" onChange={this.portalStatusValue}>
					    <option>1</option>
					    <option>2</option>
					    <option>3</option>
					    <option>4</option>
					  	</select>
					  </td>
				    </tr>
				  	<tr>
				      <td> 
				      	ICMS :
			      	  	<Switch
				          checked={this.state.ICMSstatus}
				          onChange={this.handleICMSChange}
				          value="ICMSstatus"
				          color="primary"
				        />
				        <div id="icmsID" style={this.state.ICMSStyle}>
							<div className="input-group">
							  <div className="input-group-prepend">
							    <span className="input-group-text" onClick={this.handleAddICMSValue}>{this.state.soText}</span>
							  </div>
							  <input value={this.state.icmsValue} onChange={this.handleICMSValue} className="form-control" placeholder="ICMS Number" />
							  <input value={this.state.icmsValue2} style={this.state.ICMSStyle2} onChange={this.handleICMSValue2} className="form-control" placeholder="ICMS Number 2" />
							</div>
				        </div> 
				      </td>
				      <td> Consent Status:
				      <Switch
				          checked={this.state.Consentstatus}
				          onChange={this.handleConsentChange}
				          value="Consentstatus"
				          color="secondary"
				        />
				        <select value={this.state.consentValue} onChange={this.handleConsentValueChange} style={this.state.consnetStyle} className="form-control" >
				        	<option value="2" disabled> -- Please Select a Consent Status -- </option>
				        	<option value="Required">Consent Required</option>
				        	<option value="Requested">Consent Requested</option>
				        </select>
				       </td>
				      <td> ITools :
				      <Switch
				          checked={this.state.Itoolstatus}
				          onChange={this.handleItoolsChange}
				          value="Itoolstatus"
				          color="primary"
				        />
				        <div style={this.state.itoolsStyle}>  						
							<div className="input-group">
							<input value={this.state.itoolValue}  onChange={this.handleItoolValue} className="form-control" placeholder="ITools Number" />
							<select className="custom-select" onChange={this.handleCatChange}>
							    <option value="0">Undefined</option>
							    <option value="1">Category 1</option>
							    <option value="2">Category 2</option>
							    <option value="3">Category 3</option>
							</select>
							</div>
				       	</div> 
				      </td>
				    </tr>
  					<tr>
  						<td> Follow Up : 
				      	<Switch
				          checked={this.state.FollowUpstatus}
				          onChange={this.handleFollowUpChange}
				          value="FollowUpstatus"
				          color="secondary"
				        />	
				        <div style= {this.state.reminderStyle}>			        
						<div className="input-group">
						  <div className="input-group-prepend">
						    <span className="input-group-text">From : </span>
						  </div>
						  <select className="custom-select" onChange={this.handleFollowUpValueChange}>
						    <option value="RSP">RSP</option>
						    <option value="DS">Delivery Specialist</option>
						    <option value="Consent">Consent Team</option>
						    <option disabled>-- Serco --</option>
						    <option value="VPL">VPL</option>
						    <option value="UCG">UCG</option>
						    <option value="Downer">Downer</option>
						    <option value="Electronet">Electronet</option>
						  </select>
						   <input type="text" style={this.state.dsStyle} onChange={this.handleDSValue} className="form-control" placeholder="DS Name" />
						</div>
						</div>
				      	</td>
					    <td> Reminder Date / Build ECD Date :
					        <span style= {this.state.reminderStyle}>
					        <hr />
							<DatePicker
							    selected={this.state.startDate}
							    onChange={this.handleDateChange}
							    monthsShown={2}
							    dateFormat="DD/MM/YYYY"
							    placeholderText="Click to select a date"
							    isClearable={true}
							/>
							</span>
					    </td>
					    <td> Notes :
					    <span style= {this.state.reminderStyle}>
					    <hr />
					    <textarea className="form-control" rows="3" value={this.state.notesValue} onChange={this.handleNotesValueChange} placeholder="Please add your notes here" ></textarea>
					    </span>
					    </td>
				    </tr>
				  </tbody>
				</table>
			</div>
      	<Button variant="raised" color="primary" onClick={this.submitPMOrder}>
		    Submit
		    <MaterialIcon icon="check" color="#FAFAFA" />
		</Button>
		<Button variant="raised" color="secondary" onClick={this.submitFeedback} style={{float: "right"}}>
		    Feedback <br/>
		    <MaterialIcon icon="create" color="#FAFAFA" />
		</Button>
	    </div>
	)
  }
}

ReactDOM.render(<QaLogger />, document.getElementById('root'));
registerServiceWorker();
