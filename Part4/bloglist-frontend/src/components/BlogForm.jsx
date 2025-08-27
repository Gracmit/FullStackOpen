const BlogForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleNewBlog}>
                <div>
                    <label>
                        title:
                        <input type="text" value={props.title} onChange={props.handleTitleChange}></input>
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input type="text" value={props.author} onChange={props.handleAuthorChange}></input>
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input type="text" value={props.url} onChange={props.handleUrlChange}></input>
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm