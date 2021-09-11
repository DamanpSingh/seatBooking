import fakeAPI from "../../fakeAPI/getMoviesList"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/actions/moviesActions";
import "./MoviesListings.css"

const MovieListings = () => {
    const movies = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    //get list of Movies
    const fetchMovies = () => {
        const response = fakeAPI.getMoviesList;
        dispatch(setMovies(response));
    }

    useEffect(() => {
        fetchMovies();
    }, []);


    const renderList = movies.moviesList.map(movie => {
        return (
            <div className="moviesListing" key={movie.movieId}>
                <Link to={`/booking/${movie.movieId}`}>
                    <div className="card">
                        <div className="image">
                            <img src={movie.imgURL} />
                        </div>
                        <div className="content">
                            <div className= "contentHeader">{movie.movieName}</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    })
    return (
        <>{renderList}</>
    );
}

export default MovieListings;