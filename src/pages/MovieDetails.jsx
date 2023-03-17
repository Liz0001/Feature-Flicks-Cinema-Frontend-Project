
import { useParams } from 'react-router-dom'
import { useStates } from '../utilities/states';



export default function MovieDetails() {

  const { slug, id } = useParams();

  const s = useStates('screenings');

  const screening = s.screenings.find(mov => mov.id == id)


  if (!screening) {
    return null
  }
  console.log(screening, id)



  return <>
    <h1>Movie</h1>
    <h3>{slug}</h3>
    <p>{screening.title}</p>
  </>
}