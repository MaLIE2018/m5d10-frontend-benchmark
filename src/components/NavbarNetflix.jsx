import SearchBar from "../components/SearchBar";

import netflix_logo from "../assets/img/netflix_logo.png";
import avatar from "../assets/img/avatar.png";
import { AlarmOutline } from "react-ionicons";
// import { render } from "@testing-library/react";
import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  ButtonGroup,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
class NavbarNetflix extends React.Component {
  constructor(props) {
    super(props);
    this.toggleContainer = React.createRef();
    this.state = {
      showDropDown: false,
    };
  }

  handleMouseOver = () => {
    this.setState((state) => {
      return { showDropDown: !this.state.showDropDown };
    });
  };

  onHoverOutsideHandler(e) {
    if (this.showDropDown && !this.toggleContainer.current.contains(e.target)) {
      this.setState({ showDropDown: false });
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.onHoverOutsideHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onHoverOutsideHandler);
  }
  render() {
    const registerPath = this.props.location.pathname;
    return (
      <Navbar expand='lg' variant='dark' style={{ backgroundColor: "#141414" }}>
        <Navbar.Brand as={Link} to='/TVShows'>
          <img
            src={netflix_logo}
            height='50px'
            width='120px'
            alt='netflix-logo'
          />
        </Navbar.Brand>
        {registerPath === "/Register" ? null : (
          <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto d-none d-sm-none d-md-none d-lg-flex'>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/TVShows'
                  className={
                    this.props.location.path === "/TVShows" ? "active" : null
                  }>
                  TV Shows
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/Movies'
                  className={
                    this.props.location.path === "/Movies" ? "active" : null
                  }>
                  Movies<span className='sr-only'>(current)</span>
                </Nav.Link>
                <Nav.Link as={Link} to='/RecentlyAdded'>
                  Recently Added
                </Nav.Link>
                <Nav.Link as={Link} to='/MyList'>
                  My List
                </Nav.Link>
              </Nav>
              <Nav className='mr-auto d-flex d-sm-flex d-md-flex d-lg-none'>
                <NavDropdown
                  title='Browse'
                  id='basic-nav-dropdown'
                  className='dropdown-menu rounded-0 customDropDown'>
                  <div id='smalltriangle' />
                  <NavDropdown.Item className='text-white' to='/' as={Link}>
                    Home
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='text-white'
                    to='/TVShows'
                    as={Link}>
                    TV Shows
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='text-white font-weight-bold'
                    to='/TVShows'
                    as={Link}>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className='text-white font-weight-bold'
                    to='/TVShows'
                    as={Link}>
                    Recently Added
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='text-white font-weight-bold'
                    to='/TVShows'
                    as={Link}>
                    My List
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className='ml-auto'>
                <SearchBar
                  onSearchTextChange={this.props.onSearchTextChange}
                  searchText={this.props.SearchText}
                />
                <Nav.Link as={Link} to='/'>
                  KIDS
                </Nav.Link>
                <Nav.Link as={Link} to='/'>
                  <AlarmOutline
                    color={"#ffffff"}
                    title={"Clock"}
                    height='30px'
                    width='30px'
                  />
                </Nav.Link>
                <Dropdown as={ButtonGroup} drop='bottom' id='SearchDropDown'>
                  <Dropdown.Toggle
                    as={"a"}
                    className='dropDown-toggler'
                    onMouseOver={(e) => {
                      // this.handleMouseOver(e);
                    }}
                    ref={this.toggleContainer}>
                    <img
                      className='rounded'
                      src={avatar}
                      width='32px'
                      alt='Avatar'
                    />
                    {/* <span className='caret-down' /> */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    align='right'
                    className='dropDown'
                    show={true || this.state.showDropDown || false}
                    style={{ opacity: 0.8, backgroundColor: "#141414" }}>
                    <div id='smalltriangle' />
                    <Dropdown.Item eventKey='1' className='text-white'>
                      <img
                        className='mr-2'
                        src='./assets/img/Capture.PNG'
                        alt=''
                        width='32px'></img>
                      Max
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='2' className='text-white'>
                      Manage Profiles
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='3'
                      className='text-white font-weight-bold'>
                      Account
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      eventKey='4'
                      className='text-white font-weight-bold'>
                      Help Center
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='5'
                      className='text-white font-weight-bold'>
                      <Nav.Link as={Link} to={`/Register`}>
                        Sign out from Netflix
                      </Nav.Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    );
  }
}

export default withRouter(NavbarNetflix);
