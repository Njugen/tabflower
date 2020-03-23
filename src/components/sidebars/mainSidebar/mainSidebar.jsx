import React, { Component } from 'react';

import NavSection from './components/navSection';
import { PropTypes } from 'prop-types';

class MainSidebar extends Component {
    state = {
        activeNavLinkKey: ""
    }

    setActiveNavLinkKey = (key) => {
        this.setState(
            {
                activeNavLinkKey: key
            },
            () => {
                this.raiseState();
            }
        )
    }

    raiseState = () => {
        /*
            Inform the App component that a link in the main sidebar has been clicked (any link) by raising
            the main sidebar's state.
        */
        const { onMainSidebarClick } = this.props;

        onMainSidebarClick(this.state);
    }

    renderNavSection = (title, links) => {
        return <NavSection title={title} links={links} onNavClick={(navLinkKey) => this.setActiveNavLinkKey(navLinkKey)} />;
    }

    componentDidMount = () => {
        
    }

    render = () => {
        const { routes } = this.props;

        return (
            <div className="row">
                <div className="col-md-12" id="tabeon-main-nav-column">
                    {this.renderNavSection("Another", routes)}
                </div>
            </div>
        );
    }
}

export default MainSidebar;