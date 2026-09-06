const firebaseConfig = {
    apiKey: "AIzaSyBjdFx-myXUXM3jM4vDOVyP-QUEEckx7V4",
    authDomain: "colab-85246.firebaseapp.com",
    projectId: "colab-85246",
    storageBucket: "colab-85246.firebasestorage.app",
    messagingSenderId: "140125081566",
    appId: "1:140125081566:web:5a33c2ea07a61d0d9fd74f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getEl(sel) {
    return document.querySelector(sel);
}

const roleNames = { 
    student: 'Ученик', 
    scientist: 'Ученый', 
    company: 'Компания', 
    other: 'Другое' 
};

let currentUser = JSON.parse(localStorage.getItem('colab_user')) || null;
let allPosts = [];

const isAuthPage = window.location.pathname.endsWith('reg.html');
const isAppPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/collab/');

if (!currentUser && !isAuthPage) {
    window.location.href = 'reg.html';
} else if (currentUser && isAuthPage) {
    window.location.href = 'index.html';
}

/* === АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ === */
if (isAuthPage) {
    const tabs = document.querySelectorAll('.authTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.auth;
            if (target === 'login') {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            } else {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
            }
        });
    });

    document.querySelectorAll('.passwordToggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const inputId = btn.dataset.target;
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                btn.textContent = 'Скрыть';
            } else {
                input.type = 'password';
                btn.textContent = 'Показать';
            }
        });
    });

    const loginBtn = document.getElementById('loginButton');
    if (loginBtn) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const nick = document.getElementById('loginNick').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const msg = document.getElementById('loginMessage');
            msg.textContent = '';

            if (!nick || !password) {
                msg.textContent = 'Заполните все поля!';
                return;
            }

            try {
                const userDoc = await db.collection('users').doc(nick.toLowerCase()).get();
                if (!userDoc.exists || userDoc.data().password !== password) {
                    msg.textContent = 'Неверный никнейм или пароль!';
                    return;
                }

                localStorage.setItem('colab_user', JSON.stringify(userDoc.data()));
                window.location.href = 'index.html';
            } catch (err) {
                msg.textContent = 'Ошибка подключения к базе данных.';
            }
        });
    }

    const regBtn = document.getElementById('registerButton');
    if (regBtn) {
        regBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const nick = document.getElementById('registerNick').value.trim();
            const password = document.getElementById('registerPassword').value.trim();
            const role = document.getElementById('registerRole').value;
            const msg = document.getElementById('registerMessage');
            msg.textContent = '';

            if (!nick || !password) {
                msg.textContent = 'Заполните все поля!';
                return;
            }

            if (password.length < 6) {
                msg.textContent = 'Пароль должен быть минимум 6 символов!';
                return;
            }

            try {
                const userDocRef = db.collection('users').doc(nick.toLowerCase());
                const doc = await userDocRef.get();

                if (doc.exists) {
                    msg.textContent = 'Этот никнейм уже занят!';
                    return;
                }

                const newUser = { nick: nick, password: password, role: role };
                await userDocRef.set(newUser);
                localStorage.setItem('colab_user', JSON.stringify(newUser));
                window.location.href = 'index.html';
            } catch (err) {
                msg.textContent = 'Ошибка сохранения данных.';
            }
        });
    }
}

/* === ОТРЕСОВКА И ОТОБРАЖЕНИЕ ПОСТОВ === */
function renderPosts(posts) {
    const postsList = getEl('#postsList');
    if (!postsList) return;

    const searchInput = getEl('#searchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeFilterBtn = document.querySelector('.filter.active');
    const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';

    const visible = posts.filter(p => {
        const matchFilter = (activeFilter === 'all') || (p.role === activeFilter);
        const matchSearch = (p.title + ' ' + p.description + ' ' + (p.tag || '')).toLowerCase().includes(query);
        return matchFilter && matchSearch;
    });

    if (!visible.length) {
        postsList.innerHTML = '<div class="empty">Задач пока нет.</div>';
        return;
    }

    let html = '';
    for (let i = 0; i < visible.length; i++) {
        const p = visible[i];
        const isOwner = currentUser && p.author.toLowerCase() === currentUser.nick.toLowerCase();
        
        let deleteBtnHtml = isOwner ? '<button class="deleteButton" data-delete="' + p.id + '">Удалить</button>' : '';
        let emailHtml = p.email ? '<a href="mailto:' + p.email + '" class="postContact">✉ ' + p.email + '</a>' : '';
        const roleText = roleNames[p.role] || 'Участник';

        html += '<article class="postCard">' +
            '<div class="postMeta">' +
                '<span class="roleLabel">' + roleText + '</span>' +
                '<div style="display:flex; gap:10px; align-items:center;">' +
                    '<span>Автор: ' + p.author + '</span>' +
                    deleteBtnHtml +
                '</div>' +
            '</div>' +
            '<h3>' + p.title + '</h3>' +
            '<p>' + p.description + '</p>' +
            '<div class="postBottom">' +
                '<span class="tag"># ' + (p.tag || '') + '</span>' +
                emailHtml +
            '</div>' +
        '</article>';
    }

    postsList.innerHTML = html;
}

function renderProfile(posts) {
    const headerNick = getEl('#headerNick');
    const headerAvatar = getEl('#headerAvatar');
    const profileNick = getEl('#profileNick');
    const profileAvatar = getEl('#profileAvatar');
    const profileRole = getEl('#profileRole');
    const profileProblems = getEl('#profileProblems');

    if (currentUser) {
        const letter = currentUser.nick.charAt(0).toUpperCase();
        if (headerNick) headerNick.textContent = currentUser.nick;
        if (headerAvatar) headerAvatar.textContent = letter;
        if (profileNick) profileNick.textContent = currentUser.nick;
        if (profileAvatar) profileAvatar.textContent = letter;
        if (profileRole) profileRole.textContent = roleNames[currentUser.role] || 'Участник';
        
        const myPosts = posts.filter(p => p.author.toLowerCase() === currentUser.nick.toLowerCase());
        if (profileProblems) profileProblems.textContent = myPosts.length;
    }
}

/* === УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ И СОЗДАНИЕ ПОСТОВ === */
if (isAppPage) {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        allPosts = snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
        renderPosts(allPosts);
        renderProfile(allPosts);
    }, error => {
        console.error("Ошибка загрузки постов:", error);
    });

    const modal = getEl('#postModal');
    const openBtn = getEl('#openModalBtn');
    const closeBtn = getEl('#closeModalBtn');
    const createForm = getEl('#createPostForm');

    // Открыть модальное окно
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    // Закрыть модальное окно на крестик
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Закрыть при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Отправка новой формы
    if (createForm) {
        createForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = getEl('#postTitle').value.trim();
            const description = getEl('#postDesc').value.trim();
            const tag = getEl('#postTag').value.trim();
            const email = getEl('#postEmail').value.trim();

            if (!title || !description) return;

            try {
                await db.collection('posts').add({
                    title: title,
                    description: description,
                    tag: tag,
                    email: email,
                    author: currentUser.nick,
                    role: currentUser.role,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                createForm.reset();
                modal.classList.add('hidden');
            } catch (err) {
                alert('Ошибка при публикации задачи!');
            }
        });
    }
}

document.addEventListener('click', async (e) => {
    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) {
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
        renderPosts(allPosts);
        return;
    }

    if (e.target.id === 'logoutButton') {
        localStorage.removeItem('colab_user');
        window.location.href = 'reg.html';
        return;
    }

    const deleteId = e.target.dataset.delete;
    if (deleteId) {
        if (confirm('Удалить эту задачу?')) {
            try {
                await db.collection('posts').doc(deleteId).delete();
            } catch (err) {
                alert('Ошибка при удалении');
            }
        }
    }
});

const searchEl = getEl('#searchInput');
if (searchEl) {
    searchEl.addEventListener('input', () => renderPosts(allPosts));
}
