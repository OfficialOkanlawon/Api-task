const postCard = document.querySelector('#post-card');
const createForm = document.querySelector('#create-form')
const title = document.querySelector('#title')
const body = document.querySelector('#body')



let postBox = [];

function postContent (content) {
    let postHolder = '';
            content.forEach(post => {
                postHolder += `
                        <div class="card">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.body}</p>
                            <div class="buttons">
                                <button class="btn btn-success mt-auto" id="view-btn" onclick="newPage(${post.id})">View</button>
                                <button class="btn btn-primary mt-auto" onclick="editPost(${post.id})">Edit</button>
                                <button class="btn btn-danger mt-auto" onclick="trash(${post.id})">Trash</button>
                            </div>
                        </div>
                `
            });
            postCard.innerHTML = postHolder;

}


function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            console.log(postBox)
            //    console.log(data)
            postBox = data
            postContent(postBox)
        })


}

getPosts();

createForm.addEventListener('submit', createPost)


function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox.unshift(data);
            postContent(postBox)
        })
}

function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('.post-title') // 100 post titles [0 -99]
            let postBodies = document.querySelectorAll('.post-body')
            console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

        });
}

function newPage(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'view.html'
        });
}

function editPost(id) {

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            let cardTitles = document.querySelectorAll('.card-title')
            let cardTexts = document.querySelectorAll('.card-text')
            cardTitles.forEach((cardTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        cardTitle.innerHTML = data.title
                    }
                }

            })

            cardTexts.forEach((cardText, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        cardText.innerHTML = data.body
                    }
                }

            })

        });
}

function trash(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox = postBox.filter(post => post.id !== id)
            console.log(postBox)
            postContent(postBox)
        })

}