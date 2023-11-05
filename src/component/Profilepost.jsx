/* eslint-disable react/prop-types */
import { IF } from "../../url"

 

const Profilepost = ({p}) => {
  return (
    <div className="homepost">
        {/* left */}
        <div className="image">
            <img src= {IF+p.photo} />
        </div>
        {/* right */}
        <div className="right">
            <h1>{p.title}</h1>
            <div className="textblock">
                <p>{p.username}</p>
                <div className="date">
                <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
                </div>
            </div>
            <p className="description"> {p.desc.slice(0,200)+" ...Read more"}</p>
        </div>

    </div>
  )
}

export default Profilepost