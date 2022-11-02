// ====== CONFIG & GLOBAL VARS ====== //
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;

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
            </article>
        `;
    }
    document.querySelector("#posts-grid").insertAdjacentHTML("afterbegin", html);
}

// === INITIALIZE APP === //
getPosts();

// ====== INITIALIZE APP END ====== //
