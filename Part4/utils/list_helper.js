const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0

    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) return {}

    let mostLiked = blogs[0]
    for (let i = 0; i < blogs.length; i++) {
        if (mostLiked.likes < blogs[i].likes)
            mostLiked = blogs[i]
    }
    return mostLiked
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}

    const authors = []
    for (let i = 0; i < blogs.length; i++) {
        let foundAuthor = authors.find(author => author.author === blogs[i].author)

        if (!foundAuthor) {
            authors.push({
                author: blogs[i].author,
                blogs: 1
            })
        }
        else {
            foundAuthor.blogs += 1
        }
    }

    let mostBlogs = authors[0]

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].blogs > mostBlogs.blogs) {
            mostBlogs = authors[i]
        }

    }

    return mostBlogs
}


const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    const authors = []
    for (let i = 0; i < blogs.length; i++) {
        let foundAuthor = authors.find(author => author.author === blogs[i].author)

        if (!foundAuthor) {
            authors.push({
                author: blogs[i].author,
                likes: blogs[i].likes
            })
        }
        else {
            foundAuthor.likes += blogs[i].likes
        }
    }

    let mostLikes = authors[0]

    for (let i = 0; i < authors.length; i++) {
        if (authors[i].likes > mostLikes.likes) {
            mostLikes = authors[i]
        }
    }

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}