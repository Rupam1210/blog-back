/* eslint-disable react/prop-types */

import { IF } from "../../url"

 

const Homepost = ({post}) => {
  return (
    <div className="homepost">
        {/* left */}
        <div className="image">
            <img  src={IF+post.photo} />
        </div>
        {/* right */}
        <div className="right">
            <h1>{post.title}</h1>
            <div className="textblock">
                <p>@{post.username}</p>
                <div className="date">
                    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                    <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                </div>
            </div>
            <p className="description"> {post.desc.slice(0,200)+"...Read more"} </p>
            </div>

    </div>
  )
}

export default Homepost