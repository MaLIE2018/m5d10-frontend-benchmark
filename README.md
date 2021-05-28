ApiMaxKey Max 5660ed2b
http://www.omdbapi.com/?i=tt3896198&apikey=5660ed2b

Suggested steps:

Start from the best old Netflix project your team members achieved in M2 and create the main page (with all the styles and the search bar)
Create, using components, the several "galleries" for the movies (at least 3 galleries with 3 sagas you like (es.: Harry Potter, Lord of the Rings etc.))
Implement a working search bar that triggers the APIs and propose the result.
Implement loaders, form validation and error messages throughout the app
[EXTRA] Implement empty state and loaders also for the search
[EXTRA] When clicking on a movie show its Comment list
[EXTRA] Let the user add a comment to a movie in the Comment list
[EXTRA] Sort every AJAX response per Year (from newer to older)



HarryPotter

Lord of the Rings

Transformers

App
componentDidUpdate(){
  title = [HarryPotter, LOR, Terminator]

  forEach(fetch(titles))
  Promisearray.push(fetch)

  promise.all(prmoisearray).then(result[{movies},{movies},{movies}])
}
