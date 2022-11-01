// ====== REST SERVICE ("model") ====== //
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;

// === READ (GET) === //
// get all posts
async function getPosts() {
    const res = await fetch(`${endpoint}/posts`);
    const posts = await res.json();
    return posts;
}

// ====== REST SERVICE END ====== //

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

// ====== REST SERVICE END ====== //

// appends posts to the DOM
function appendPosts(postList) {
    console.log(postList);

    for (let index = 0; index < postList.length; index++) {
        const post = postList[index];
        console.log(post);

        document.querySelector("#posts-grid").innerHTML += /*html*/ `
            <article>
                <img src="${post.image}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </article>
        `;
    }
}

// === INITIALIZE APP === //
getPosts();

// ====== INITIALIZE APP END ====== //
