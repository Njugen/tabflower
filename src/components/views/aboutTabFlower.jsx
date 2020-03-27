import React, {Fragment} from 'react';
import View from './view';
import AboutTabflowerModule from './../modules/aboutTabflower';
import Moduleon from './../utils/moduleon/moduleon';
import ModuleColumn from '../utils/moduleon/moduleColumn';
import * as validator from './../utils/inputValidators';
import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';

class AboutTabFlowerView extends View {
    handleRaisedData = (obj) => {
        try {
            const { isString } = validator;
            
            if(isString(obj)){
                if(obj === "refresh"){
                    let refreshFactor = this.state.refreshFactor;
                    refreshFactor++;

                    this.setState(
                        { refreshFactor },
                        () => {
                
                        }
                    )
                }
            } else {
                throw ValidatorError("aboutTabflower-view-101");
            }
            
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    render = () => {
     
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                        <Moduleon>
                            <ModuleColumn colspan="12">
                                <AboutTabflowerModule onRaiseToView={(data) => this.handleRaisedData(data)} id="active-tabs-module" onRaiseToModal={(data) => this.raiseToModal(data)} onRaiseToErrorOverlay={(data) => this.raiseToErrorOverlay(data)}></AboutTabflowerModule>
                                
                            </ModuleColumn> 
                        </Moduleon>
                </div>
            </div>
        );
    }
}

export default AboutTabFlowerView;