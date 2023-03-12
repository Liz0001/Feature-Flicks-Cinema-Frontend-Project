


export default function Movies() {

  return <>
    <h2>ALL THE MOVIES IN THE WORLD.... HEREEEE</h2>
    <p>Welcome to us! Now you are part of an exciting community!</p>
  </>

}



// const [movies, setMovies] = useState([]);
// useEffect(() => {

//   (async () => {

//     setMovies(await (await (fetch("/api/movies"))).json());

//   })();

// }, []);

// export default function Movie(props) {

//   let { title, description } = props;
//   let { posterImage } = description;
//   posterImage = "https://cinema-rest.nodehill.se/" + posterImage;
//   // key={id}
//   return <div className="movie">
//     <h3>{title}</h3>
//     <img src={posterImage} alt="" />

//     {/* this is a comment */}
//   </div>

// }