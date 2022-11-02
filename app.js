// ====== CONFIG & GLOBAL VARS ====== //
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;
let selectedPostId;

// === READ (GET) === //
// get all posts
function getPosts() {
    fetch(endpoint + "/posts")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            appendPosts(data);
        });
}

// appends posts to the DOM
function appendPosts(postList) {
    let html = "";

    for (let index = 0; index < postList.length; index++) {
        const post = postList[index];

        html += /*html*/ `
            <article>
                <img src="${post.image}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div class="btns">
                    <button class="btn-update-user" onclick="getPost(${post.id})">Update</button>
                    <button class="btn-delete-user" data-id="${post.id}">Delete</button>
                </div>
            </article>
        `;
    }
    document.querySelector("#posts-grid").insertAdjacentHTML("afterbegin", html);
}

function getPost(id) {
    fetch(`${endpoint}/posts/${id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            displayPost(data);
        });
}

function displayPost(post) {
    console.log(post);
    const form = document.querySelector("#form-update");
    form.title.value = post.title;
    form.body.value = post.body;
    form.url.value = post.image;
    form.scrollIntoView({ behavior: "smooth" });
}

// === INITIALIZE APP === //
getPosts();

// ====== INITIALIZE APP END ====== //
