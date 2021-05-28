import { SearchOutline } from "react-ionicons";
import "../styles/css/SearchBar.css";
import { FormControl, Form } from "react-bootstrap";
import React from "react";
import { withRouter } from "react-router";

class SearchBar extends React.Component {
  expandSearch = (e) => {
    const searchContainer = e.currentTarget;
    searchContainer.classList.toggle("border");
    searchContainer.classList.toggle("border-white");
    searchContainer.classList.toggle("input-hidden");
    searchContainer.classList.toggle("input-expanded");
    searchContainer.lastChild.focus();
  };

  handleSearchTextChange = (e) => {
    const history = this.props.history;
    history.push(`/Search/q=${e.target.value}`);
    if (e.target.value.length > 3) {
      this.props.onSearchTextChange(e.target.value);
    } else if (e.target.value.length === 0) {
      this.props.onSearchTextChange(e.target.value);
      history.push(`/Movies`);
    }
  };

  render() {
    return (
      <Form
        className='d-flex flex-row input-hidden align-items-center'
        id='searchContainer'
        onClick={(e) => this.expandSearch(e)}
        onSubmit={(e) => e.preventDefault()}
        style={{ backgroundColor: "#141414" }}>
        <SearchOutline
          id='lensInSearchBox'
          color={"#ffffff"}
          title={"Search"}
          height='30px'
          width='30px'
        />
        <FormControl
          type='text'
          placeholder='Title, People, Genres'
          id='searchField'
          style={{ zIndex: 1 }}
          value={this.props.searchText}
          onChange={(e) => this.handleSearchTextChange(e)}
          style={{ backgroundColor: "#141414" }}
        />
      </Form>
    );
  }
}

export default withRouter(SearchBar);
