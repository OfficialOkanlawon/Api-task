const postCard = document.querySelector('#make-card');
const createForm = document.querySelector('#create-form')
const title = document.querySelector('#title')
const body = document.querySelector('#body')



let postBox = [];

function postContent (content) {
    let postHolder = '';
            content.forEach(post => {
                postHolder += `
                        <div class="cardd">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.body}</p>
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



function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
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

createForm.addEventListener('submit', createPost)