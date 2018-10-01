import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Dev Connector
      </footer>
    );
  }
}

export default Navbar;
