import React, { Component } from 'react';

import NavSection from './components/navSection';

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
        const testSectionLinks = [
            { label: "Dashboard", path: "/dashboard", key: 1 },
            { label: "Scheduler", path: "/calendar", key: 2 }
        ]

        return (
            <div className="col-2 pl-0 pr-0" id="tabeon-main-nav-column">
                {this.renderNavSection("Another", testSectionLinks)}
            </div>
        );
    }
}

export default MainSidebar;