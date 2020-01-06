import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavSection extends Component {
    renderNavLink = (label, path, handleClick) => {
        return (
            <NavLink onClick={(e) => handleClick(e.target.id)} to={path} className="tabeon-nav-link">
                {label}
            </NavLink>
        )
    }

    mapLinks = (links, callback) => {
        return links.map(
            (link) => {
                return this.renderNavLink(link.label, link.path, callback)
            }
        )
    }

    render = () => {
        const {
            title,
            links,
            onNavClick
        } = this.props;

        return(
            <div className="tabeon-nav-section">
                <h4 className="tabeon-nav-section-title p-2 pb-3 mb-0">{title}</h4>
                {
                    this.mapLinks(links, onNavClick)
                }
            </div>
        )
    }
}

export default NavSection;