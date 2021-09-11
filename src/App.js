import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Booking from "./pages/Booking/Booking";
import MovieListings from "./pages/MoviesListing/MoviesListings";


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/seatBooking/" exact component={MovieListings} />
          <Route path="/seatBooking/booking/:movieId" component={Booking} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
