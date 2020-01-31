import React, {Fragment} from 'react';
import View from './view';

class AboutTabFlowerView extends View {
    render = () => {
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <h4>{this.props.label ? this.props.label : "About Tabflower"}</h4>
                    <p>
                        Tabflower is a webextension for managing browser windows and tabs. It is intended for people who have
                        problems keeping their browser and all its tabs - and therefore resource consumption - in check. Tabflower is also
                        intended for people who - for whatever reason - needs to schedule or group their activities on the web, as it offers
                        the tools to do so. 
                    </p>
                    <p>
                        Tabflower is created by me, Thai Nguyen, and is under constant development. If you have found bugs, or have somekind of 
                        feedback (e.g. suggestions for new features), please contact me at <a href="mailto:privat_thai_nguyen@hotmail.com">privat_thai_nguyen@hotmail.com</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default AboutTabFlowerView;