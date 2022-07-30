import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Navbar } from '../../components'
import { getblog } from '../../features/BlogSlice'
import "./BlogDetails.scss";
import { Editor, EditorState, convertFromRaw } from 'draft-js';
// import { AppWrap, MotionWrap } from '../../wrapper

const BlogDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {blog, loading} = useSelector((state) => state.blog)
    
    
    useEffect(() => {
        dispatch(getblog(id))
    }, [])

    return (
        <div className="container">
            <div className="body">
                <div className="header">
                <h1>POST <span>DETAILS</span></h1>
                </div>
            {
                loading ? 
                <div className="header">
                    <h1>Loading....</h1>
                </div>
                :
                <Details {...blog?.blogPost}/>
            }
            </div>
        </div>
    )
}

export default BlogDetails


function Details({image, title, createdAt, message}) {


    const content = JSON?.parse(message)
    const contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState); 
    return(
        <div>
                <div className="blog__image">
                   <img src={image} />
                   </div>
                   <div className="blog__title">
                   <h1>{title}</h1>
                   <p>Date: {createdAt.toString().slice(0, 10)} By Collins </p>
                   </div>
                   <div>
                       <Editor editorState={editorState} readOnly={true} />
                   </div>
                </div>
    )
}