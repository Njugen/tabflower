import React, { Component } from 'react';

import NavSection from './components/navSection';

class MainSidebar extends Component {
    state = {
        activeNavLinkId: ""
    }

    setActiveNavLinkId = (id) => {
        this.setState(
            {
                activeNavLinkId: id
            },
            () => {
                this.raiseState();
            }
        )
    }

    raiseState = () => {
        const { onMainSidebarClick } = this.props;

        onMainSidebarClick(this.state);
    }

    renderNavSection = (title, links) => {
        return <NavSection title={title} links={links} onNavClick={(navLinkId) => this.setActiveNavLinkId(navLinkId)} />;
    }

    componentDidMount = () => {
        
    }

    render = () => {
        const testSectionLinks = [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Calendar", path: "/calendar" },
            { label: "Leafeon", path: "/calendar" }
        ]

        return (
            <div className="col-2 pl-0 pr-0" id="tabeon-main-nav-column">
                {this.renderNavSection("Another", testSectionLinks)}
            </div>
        );
    }
}

export default MainSidebar;