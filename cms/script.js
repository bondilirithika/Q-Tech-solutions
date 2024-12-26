document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const addArticleBtn = document.getElementById("addArticleBtn");
    const viewArticlesBtn = document.getElementById("viewArticlesBtn");
    const manageUsersBtn = document.getElementById("manageUsersBtn");
    const loginSection = document.getElementById("loginSection");
    const signupSection = document.getElementById("signupSection");
    const addArticleSection = document.getElementById("addArticleSection");
    const viewArticlesSection = document.getElementById("viewArticlesSection");
    const manageUsersSection = document.getElementById("manageUsersSection");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const addArticleForm = document.getElementById("addArticleForm");
    const articlesList = document.getElementById("articlesList");
    const usersList = document.getElementById("usersList");

    let users = [];
    let articles = [];
    let currentUser = null;

    function showSection(section) {
        [loginSection, signupSection, addArticleSection, viewArticlesSection, manageUsersSection].forEach(sec =>
            sec.classList.add("hidden")
        );
        section.classList.remove("hidden");
    }

    function updateUI() {
        if (currentUser) {
            loginBtn.classList.add("hidden");
            signupBtn.classList.add("hidden");
            logoutBtn.classList.remove("hidden");
            addArticleBtn.classList.toggle("hidden", currentUser.role === "Viewer");
            viewArticlesBtn.classList.remove("hidden");
            manageUsersBtn.classList.toggle("hidden", currentUser.role !== "Admin");
        } else {
            loginBtn.classList.remove("hidden");
            signupBtn.classList.remove("hidden");
            logoutBtn.classList.add("hidden");
            addArticleBtn.classList.add("hidden");
            viewArticlesBtn.classList.add("hidden");
            manageUsersBtn.classList.add("hidden");
            showSection(loginSection);
        }
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            alert(`Welcome, ${currentUser.username}!`);
            updateUI();
            showSection(viewArticlesSection);
        } else {
            alert("Invalid credentials");
        }
    });

    logoutBtn.addEventListener("click", () => {
        currentUser = null;
        alert("Logged out!");
        updateUI();
    });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;
        const role = document.getElementById("signupRole").value;
        if (users.some(u => u.username === username)) {
            alert("Username already exists");
        } else {
            users.push({ username, password, role });
            alert("Sign up successful!");
            showSection(loginSection);
        }
    });

    addArticleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (currentUser.role === "Editor" || currentUser.role === "Admin") {
            const title = document.getElementById("articleTitle").value;
            const content = document.getElementById("articleContent").value;
            const imageInput = document.getElementById("articleImage");
            const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;
            articles.push({ title, content, author: currentUser.username, image });
            alert("Article added!");
            addArticleForm.reset();
        } else {
            alert("Permission denied");
        }
    });

    viewArticlesBtn.addEventListener("click", () => {
        articlesList.innerHTML = articles.length
            ? articles.map(article => `
                <li>
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    ${article.image ? `<img src="${article.image}" alt="${article.title}" />` : ""}
                    <p>By: ${article.author}</p>
                </li>
            `).join("")
            : "<p>No articles found</p>";
        showSection(viewArticlesSection);
    });

    manageUsersBtn.addEventListener("click", () => {
        usersList.innerHTML = users.map((user, index) => `
            <li>
                <strong>${user.username}</strong> (${user.role})
                ${currentUser.username !== user.username ? `<button onclick="deleteUser(${index})">Delete</button>` : ""}
            </li>
        `).join("");
        showSection(manageUsersSection);
    });

    window.deleteUser = (index) => {
        if (confirm("Are you sure you want to delete this user?")) {
            users.splice(index, 1);
            manageUsersBtn.click();
        }
    };

    loginBtn.addEventListener("click", () => showSection(loginSection));
    signupBtn.addEventListener("click", () => showSection(signupSection));
    addArticleBtn.addEventListener("click", () => showSection(addArticleSection));
});
