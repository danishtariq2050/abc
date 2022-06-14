import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const { desc } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch('https://api.publicapis.org/entries')
            .then((x) => {
                return x.json()
            })
            .then((data) => {
                setBlog(data.entries.find(x => x.Description === desc));
            });
    }, []);

    return (
        <div className="container">
            <h1>Blog Details</h1>
            {
                blog && (
                    <>
                        <p>Title: {blog.Title}</p>
                        <p>API: {blog.API}</p>
                        <p>Auth: {blog.Auth}</p>
                        <p>Cors: {blog.Cors}</p>
                        <p>Description: {blog.Description}</p>
                        <p>Category: {blog.Category}</p>
                        <p>HTTP: {blog.HTTP}</p>
                        <p>Link: {blog.Link}</p>
                    </>
                )
            }
        </div>
    );
}

export default BlogDetails;