import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class ExistingTabGroupsModule extends Module {
   settings = {
       moduleTitle: "Existing Tab Groups"
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="existing-tab-groups-module">
                    <p>
                        To keep the browser's tab bar from overflowing, Tab Flower lets you group windows and tabs together. You may create new tab groups at any time, and launch their tabs in a categorized manner later.
                    </p>
                    <div className="existing-tab-groups-list">
                        <div className="list-item-block col-3 m-1 p-3">
                            <div className="list-item-block-header mb-3">
                                <h6 className="list-item-block-headline float-left pr-2">Webmie Work tabs</h6>
                                <div className="list-item-block-options float-right">
                                    <span className="fas fa-cog options-button ml-2"></span>
                                    <span className="fas fa-times options-button ml-2"></span>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div className="list-item-block-body small pb-3">
                                <p>Contain resources necessary for daily work. Excellent to launch at 8:00 pm on a weekday!</p>
                            </div>
                            <div className="list-item-block-footer">
                                <button class="btn btn-tabeon-reverse d-inline-block">Launch group</button>
                            </div>
                        </div>
                        
                        <div className="list-item-block col-3 m-1 p-3">
                            <div className="list-item-block-header mb-3">
                                <h6 className="list-item-block-headline float-left pr-2">Weeb mumbo jumbo</h6>
                                <div className="list-item-block-options float-right">
                                    <span className="fas fa-cog options-button ml-2"></span>
                                    <span className="fas fa-times options-button ml-2"></span>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div className="list-item-block-body small pb-3">
                                <p>Throw away everything else in life - it's time to become anime geek!</p>
                            </div>
                            <div className="list-item-block-footer">
                                <button class="btn btn-tabeon-reverse d-inline-block">Launch group</button>
                            </div>
                        </div>
                        <div className="list-item-block col-3 m-1 p-3">
                            <div className="list-item-block-header mb-3">
                                <h6 className="list-item-block-headline float-left pr-2">Weeb mumbo jumbo</h6>
                                <div className="list-item-block-options float-right">
                                    <span className="fas fa-cog options-button ml-2"></span>
                                    <span className="fas fa-times options-button ml-2"></span>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div className="list-item-block-body small pb-3">
                                <p>Throw away everything else in life - it's time to become anime geek!</p>
                            </div>
                            <div className="list-item-block-footer">
                                <button class="btn btn-tabeon-reverse d-inline-block">Launch group</button>
                            </div>
                        </div>
                        <div className="list-item-block col-3 m-1 p-3">
                            <div className="list-item-block-header mb-3">
                                <h6 className="list-item-block-headline float-left pr-2">Weeb mumbo jumbo</h6>
                                <div className="list-item-block-options float-right">
                                    <span className="fas fa-cog options-button ml-2"></span>
                                    <span className="fas fa-times options-button ml-2"></span>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div className="list-item-block-body small pb-3">
                                <p>Throw away everything else in life - it's time to become anime geek!</p>
                            </div>
                            <div className="list-item-block-footer">
                                <button class="btn btn-tabeon-reverse d-inline-block">Launch group</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
   }
   
   renderFooter = () => {
        return (    
            <Fragment>
                 
                <button className="btn btn-tabeon d-inline-block">Remove all groups</button>
                <button className="btn btn-tabeon d-inline-block">Create a new group</button>
              
            </Fragment>
        );
   }
    
}

export default ExistingTabGroupsModule;