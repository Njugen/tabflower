import React, { Fragment, Component } from 'react';

/* Import Routes */
import RouteList from './components/routes/routeList';

/* Import Sidebars */
import MainSidebar from './components/sidebars/mainSidebar/mainSidebar';

/* Import Utilities */
import FullWidthLoadbar from './components/utils/fullWidthLoadbar';

/* Import CSS generated by create-react-app */
import './styles/react-generated/App.css';

/* Import Tabeon app specific CSS */
import './styles/tabeon/style.css';


class App extends Component{
  state = {
    currentView: {},
    mainSidebar: {}
  };

  handleNavigation = (viewProps) => {
    this.setState(
      {
          currentView: viewProps
      }
    )
  }

  handleMainSidebarClick = (sidebarProps) => {
    this.setState(
      {
        mainSidebar: sidebarProps
      }
    )
  }

  render = () => {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <MainSidebar onMainSidebarClick={(raisedProps) => this.handleMainSidebarClick(raisedProps)} />
            <div className="col-10">
               <RouteList onNavigation={(raisedProps) => this.handleNavigation(raisedProps)} />
            </div>
          </div>
        </div>
        <FullWidthLoadbar />
      </Fragment>
    );
  }

}

export default App;
