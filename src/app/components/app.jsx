import React from 'react';

// Components
import Navbar from './navigation/navbar.jsx';
// import Footer from './footer.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" props={this.props} />
        <div className="app-body">
          {this.props.children}
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}




