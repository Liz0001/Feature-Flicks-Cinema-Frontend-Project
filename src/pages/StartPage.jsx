import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"



export default function StartPage() {

  return <div className="frontPage p-5">
    <div className="innerFront p-5">
      <h2> Feature Flicks Cinema</h2>
      <h3 className="mb-2">Best in Småstad</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse corporis assumenda, quaerat consectetur aliquid eius facere voluptates recusandae ratione in, est magni earum quos unde fugit dicta praesentium consequatur sit.</p>
      <p>Quibusdam nam quod velit a fugiat dolorem, officia eius aliquid obcaecati ab, assumenda veritatis excepturi aperiam. Repudiandae beatae nam quasi vitae perspiciatis iure voluptas dolore! Temporibus vitae odit fugiat accusantium!</p>

      <NavLink to={'/movieS/'} >

        <Button className="mt-5 m-3 px-4 py-2" variant="secondary" type="submit">
          Go to Movies
        </Button>
      </NavLink>

    </div>
  </div>
}