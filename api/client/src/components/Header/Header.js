import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from '../Payments/Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a 
              href="/auth/google"
              style={{color: '#000000'}}
            >
              Login With Google
            </a>
          </li>
        );
      default:
        return (
          [
            <li key="1">
              <Payments />
            </li>,
            <li key="3" style={{ margin: '0 5px 0 15px' }}>
              Total Credits: {this.props.auth.credits}
            </li>,
            <li key="2">
              <a href="/api/logout" style={{color: '#000000'}}>Logout</a>
            </li>
          ]
        );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
            <Link 
              to={this.props.auth ? '/surveys' : '/'}
              className='left brand-logo'
              style={{color: '#000000'}}
            >
              eMaily
            </Link>
            <ul className='right'>
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
