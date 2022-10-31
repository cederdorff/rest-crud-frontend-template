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

// ====== EVENTS ====== ("controller+view") //

function appendPosts(postList) {
    // todo: DOM manipulation
}

// ========= EVENTS END ====== //

// === INITIALIZE APP === //

async function initApp() {
    const posts = await getPosts();
    console.log(posts);
}

initApp();

// ====== INITIALIZE APP END ====== //
