import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

class NavSection extends Component {
    renderNavLink = (label, path, key, handleClick) => {
        return (
            <NavLink key={key} onClick={() => handleClick(key)} to={path} className="tabeon-nav-link">
                {label}
            </NavLink>
        )
    }

    mapLinks = (links, callback) => {
        return links.map(
            (link) => {
                return this.renderNavLink(link.label, link.path, link.key, callback)
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
            <Fragment>
                <div className="row d-flex justify-content-center">
                    <div className="row">
                        <div className="col-md-2">
                            <h4 className="tabeon-nav-section-title p-2 pb-3 mb-0">{title}</h4>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">    
                    <div className="row">    
                        <div className="col-md-12 tabeon-nav-link-container">
                            {
                                this.mapLinks(links, onNavClick)
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

NavSection.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
    onNavClick: PropTypes.func.isRequired
}

export default NavSection;