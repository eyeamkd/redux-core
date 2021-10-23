import React from 'react'; 
import {useSelector} from 'react-redux';

function PostList() { 
    const posts = useSelector(state=>state.posts);  

    const postsRenderer = posts.map(post=> ( 
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3> 
            <p className="post-content">{post.description}</p>
        </article>
    ))
    return (
        <section className="posts-list">
            <h2>Posts</h2>  
            {postsRenderer}
        </section>
    )
}

export default PostList
