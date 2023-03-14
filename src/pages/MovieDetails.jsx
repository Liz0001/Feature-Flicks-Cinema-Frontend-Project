
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function MovieDetails() {

  const { id } = useParams();
  console.log(id)


  // useEffect(() => {
  //   movie.description.length = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam, corrupti assumenda facilis distinctio dicta fuga dignissimos cumque corporis autem iste. Temporibus aspernatur facere rem veritatis aut esse reprehenderit voluptas delectus asperiores? Harum assumenda id, consequuntur quibusdam voluptatem distinctio numquam et accusantium maxime aliquid aliquam ab ut voluptatibus nesciunt, minus corporis?!';
  // }, []);

  // return <div className="movie-detail">
  //   <h3>{title}</h3>
  //   <h4>Length: {length} minutes</h4>
  //   <h4>Categories: {categories.join(', ')}</h4>
  //   <img src={'https://cinema-rest.nodehill.se' + posterImage} />
  //   <hr />
  // </div>
  return <>
    <p>{id}</p>
  </>
}