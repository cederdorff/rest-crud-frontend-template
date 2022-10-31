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

//get one  by given id
async function getPost(id) {
    const res = await fetch(`${endpoint}/posts/${id}`);
    const data = await res.json();
    return data;
}

// === CREATE (POST) === //
async function createPost(post) {
    const postAsJson = JSON.stringify(post);
    const res = await fetch(`${endpoint}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: postAsJson
    });
    console.log(res);
}

// === UPDATE (PUT) === //
async function updatePost(post) {
    const postAsJson = JSON.stringify(post);
    const res = await fetch(`${endpoint}/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: postAsJson
    });
    const data = await res.json();
    console.log(data);
}

// === DELETE (DELETE) === //
async function deletePost(id) {
    const res = await fetch(`${endpoint}/posts/${id}`, { method: "DELETE" });
    console.log(res);
}

// ====== REST SERVICE END ====== //

// ====== EVENTS ====== ("controller+view") //

let selectedPostId;

function appendposts(postList) {
    let html = "";

    for (const Post of postList) {
        html += /*html*/ `
             <article>
                <img src="${Post.image}">
                <h2>${Post.title}</h2>
                <p>${Post.body}</p>
                 <div class="btns">
                    <button class="btn-update-Post" data-id="${Post.id}">Update</button>
                    <button class="btn-delete-Post" data-id="${Post.id}">Delete</button>
                </div>
            </article>
        `;
    }

    document.querySelector("#posts-grid").innerHTML = html;
    addPostClickEvents();
}

function addPostClickEvents() {
    //delete event
    document.querySelectorAll(".btn-delete-Post").forEach(
        btn =>
            (btn.onclick = async () => {
                const postId = btn.getAttribute("data-id");
                const shouldDelete = confirm("Are you sure you want to delete this Post?");
                if (shouldDelete) {
                    await deletePost(postId);
                    onpostsListChanged();
                }
            })
    );

    //update event
    document.querySelectorAll(".btn-update-Post").forEach(
        btn =>
            (btn.onclick = async () => {
                selectedPostId = btn.getAttribute("data-id");
                const post = await getPost(selectedPostId);
                const form = document.querySelector("#form-update");
                form.title.value = post.title;
                form.body.value = post.body;
                form.url.value = post.image;
                form.scrollIntoView({ behavior: "smooth" });
            })
    );
}

function createSubmitEvent() {
    document.querySelector("#form-create").onsubmit = async event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        const image = event.target.url.value;
        await createPost({ title, body, image });
        onpostsListChanged();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

function updateSubmitEvent() {
    document.querySelector("#form-update").onsubmit = async event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        const image = event.target.url.value;
        await updatePost({ id: selectedPostId, title, body, image });
        onpostsListChanged();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

async function onpostsListChanged() {
    const posts = await getPosts();
    appendposts(posts);
}

// ========= EVENTS END ====== //

// === INITIALIZE APP === //

function initApp() {
    onpostsListChanged();
    createSubmitEvent();
    updateSubmitEvent();
}

initApp();

// ====== INITIALIZE APP END ====== //
