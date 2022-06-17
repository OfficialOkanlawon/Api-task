function view() {
    let viewPost = localStorage.getItem('viewedPost')
    let post = JSON.parse(viewPost)
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post-body').innerHTML = post.body
}

view();