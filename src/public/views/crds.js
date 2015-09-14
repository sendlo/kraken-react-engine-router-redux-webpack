'use strict';

import Layout from './layout.js';
import React from 'react';
import {Button, Input,Panel} from 'react-bootstrap';
import serialize from 'form-serialize';
import CRDSConvertor from '../crdsConvertor.js';

var STYLES = {
    input:{
        marginTop:'1em'
    },
    nextBtn: {
        marginTop: '2em',
        width: '100%'
    }
};

module.exports = React.createClass({
    getInitialState: function() {
        return {
          serialization: ''
        };
    },
    updateSerialization: function() {
        var self = this;
        var form = this.refs.crdsForm.getDOMNode();
        var $form = $(form);
        var data = serialize(form, { hash: true });

        data.response = CRDSConvertor.convert(data);
        console.log("in updateSerialization");
        console.log(JSON.stringify(data,null,'\t'));

        this.props.saveValues('crds',data);
        this.props.nextStep();
    },
    onSubmit: function(event) {
        var self = this;        
        event.preventDefault();
        var form = this.refs.crdsForm.getDOMNode();
        var $form = $(form);
        var data = serialize(form, { hash: true });
        this.setState({
          serialization: data
        },this.updateSerialization);
    },
    render: function() {
        var inputProps = {
            type:'text',
            className: 'vx_form-control',
            style: STYLES.input
        };

        return (
            
            <form ref="crdsForm" onSubmit={this.onSubmit}>
                <div id="taskContainer" >
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6">
                                        <h1>Configure Task</h1><br/>                 
                                    </div>
                                    <div className="col-md-3"></div>
                                </div>
                                <Panel header='Level configuration'>
                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                            <Input type="select" name="customerType" label="Customer type">
                                              <option value="PERSON_PARTY">PERSON_PARTY</option>
                                              <option value="BUSINESS_PARTY">BUSINESS_PARTY</option>
                                            </Input>                            
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                            <Input type="select" name="level" label="Level">
                                              <option value="CIP">CIP</option>
                                            </Input>                            
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                            <Input type="select" name="customerRole" label="Customer role">
                                              <option value="PAYPAL_PRIMARY_USER">PAYPAL_PRIMARY_USER</option>
                                              <option value="DIRECTOR">DIRECTOR</option>
                                              <option value="BENEFICIAL_OWNER">BENEFICIAL_OWNER</option>
                                            </Input>                            
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>
                                </Panel>
                                <Panel header='Criteria configuration'>                        
                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                            <Input type="select" name="criteria" label="Criteria">
                                              <option value="THIRD_PARTY_VERIFICATION">THIRD_PARTY_VERIFICATION</option>
                                              <option value="PROOF_OF_TAX_ID">PROOF_OF_TAX_ID</option>
                                            </Input>                            
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>
                                </Panel>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Button type='submit' bsStyle="primary" bsSize="large" block>Next</Button>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </form>
                      
        );
    }
});
