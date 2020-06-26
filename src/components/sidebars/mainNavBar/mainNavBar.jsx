import React, { Component } from "react";
import PropTypes from "prop-types";
import NavSection from "./components/navSection";
import AppContext from "./../../contexts/AppContextProvider";

class MainNavBar extends Component {
  static contextType = AppContext;

  renderNavSection = (title, links) => {
    const { forceRefresh } = this.context;

    return (
      <NavSection
        title={title}
        links={links}
        onNavClick={() => forceRefresh()}
      />
    );
  };

  render = () => {
    const { routes } = this.props;

    return (
      <div className="row">
        <div className="col-md-12" id="tabeon-main-nav-column">
          {this.renderNavSection("Tabflower", routes)}
        </div>
      </div>
    );
  };
}

MainNavBar.propTypes = {
  routes: PropTypes.array.isRequired,
  // onMainNavBarClick: PropTypes.func.isRequired,
};

export default MainNavBar;
