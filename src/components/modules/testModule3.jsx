import React from "react";
import Module from './module';

class TestModule3 extends Module {
    render = () => {
        const { cols } = this.state;

        return (
            <div onDragEnter={(e) => this.handleDragOver(e)} onDrop={(e) => this.handleDrop(e)} className={"tabeon-module-container"  + ( cols && " col-" + cols )}>
                <div id={this.props.id} draggable="true" onDragStart={(e) => this.handleDragStart(e)} className={"tabeon-module"}>
                    <div className="row tabeon-module-header">
                        <div className="col-12">
                            Joni
                        </div>
                    </div>
                    <div className="row tabeon-module-body">
                        <div className="col-12">
                        
                        </div>
                    </div>
                    <div className="row tabeon-module-footer">
                        <div className="col-12">
                       
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default TestModule3;