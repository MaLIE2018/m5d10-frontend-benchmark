import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/App.css";
import NavbarNetflix from "./components/NavbarNetflix";
import { Container, Alert, Row, Col } from "react-bootstrap";
import React from "react";
import MoviePage from "./components/MoviePage";
import NetflixFooter from "./components/NetflixFooter";
import Details from "./components/Details";
import {Route} from "react-router-dom"
import SearchResults from './components/SearchResults';
import Registration from "./components/Registration";
import WelcomePage from "./components/WelcomePage"
import ebconfig from './ebconfig';
import { EasybaseProvider } from "easybase-react"
class App extends React.Component {
  state = {
    queryArr: ["Harry Potter", "Lord of the Rings", "Terminator"],
    history:[],
    preference: ['break'],
    data: [],
    searchText: "",
    error: {
      mes: "",
      isError: false,
    },
    showComments: false,
    selectedMovie: {}
    
  };
  // Search field 
  handleSearchTextChange = (searchText) => {
    this.setState({
      searchText: searchText,
      queryArr: searchText.length>=3?[searchText]:["Harry Potter", "Lord of the Rings", "Terminator"]
    });
  };

  fetchData = async () => {
    this.setState({data:await Promise.all(
      this.state.queryArr.map(async(query) => {
          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=5660ed2b`,
            {
              method: "GET",
              header: {
                ContentType: "application/json",
              },
            }
            );
            if(res.ok){
              return await res.json();
            }   
        })
        ).catch ((err) =>{
          this.setState({
            error: {
              mes: err.message,
              isError: true,
            },
          });
        })
      })
  }

  componentDidUpdate(prevProps,prevState) {
      if(this.state.searchText.length === 0  && prevState.searchText.length !== 0) this.fetchData()
      if(this.state.searchText.length > 0 && prevState.searchText !== this.state.searchText){
          this.fetchData() 
      }
  }
  componentDidMount() {
    this.fetchData()
  }

render() {
    return (
      <>
      <EasybaseProvider ebconfig={ebconfig}>
        <Container fluid>
          <NavbarNetflix
            onSearchTextChange={this.handleSearchTextChange}
            searchText={this.state.searchText}
          />
          {this.state.error.isError ? (
            <Row>
              <Col>
                <Alert variant='danger' className='mx-4'>
                  {this.state.error.mes}
                </Alert>
              </Col>
            </Row>
          ) :
          <> 
            <Route render={(routerProps) =>  <MoviePage
              data={this.state.data}
              searchText={this.state.searchText}
              movieRowTitles={this.state.queryArr}
              {...routerProps}
            />}  path="/Movies"/>
            <Route render={(routerProps) => <SearchResults
                    randomSearch = {undefined}
                    moviePageHeadline={"Search Results"}
                  />} path="/Search/q=:query"/>
            <Route render={(routerProps) => <SearchResults
                    randomSearch = {this.state.preference[0]}
                    moviePageHeadline={"TV Shows"}
                  />} path="/TVShows"/>
            <Route render={(routerProps) => <Details
            selectedMovie={this.state.selectedMovie}
            {...routerProps}/>} path="/Details/:id"/>
            <Route render={(routerProps) => <Registration
            {...routerProps}/>} exact path="/Register"/>
             <Route render={(routerProps) => <WelcomePage
            {...routerProps}/>} path="/Register/:id"/>
          </>
          }
        </Container>
        
        <NetflixFooter />
        </EasybaseProvider>
      </>
    );
  }
}

export default App;
;