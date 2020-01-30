import React, {Fragment} from 'react';
import View from './view';

class AboutTabFlowerView extends View {
    render = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>{this.props.label ? this.props.label : "About Tabflower"}</h2>
                </div>
            </div>
        );
    }
}

export default AboutTabFlowerView;