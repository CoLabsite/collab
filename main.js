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

function renderPosts(posts) {
    const postsList = getEl('#postsList');
    if (!postsList) return;

    const searchInput = getEl('#searchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeFilterBtn = document.querySelector('.filter.active');
    const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';

    const visible = posts.filter(p => {
        const matchFilter = (activeFilter === 'all') || (p.role === activeFilter);
        const matchSearch = (p.title + ' ' + p.description + ' ' + p.tag).toLowerCase().includes(query);
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
        
        let deleteBtnHtml = '';
        if (isOwner) {
            deleteBtnHtml = '<button class="deleteButton" data-delete="' + p.id + '">Удалить</button>';
        }

        let emailHtml = '';
        if (p.email) {
            emailHtml = '<a href="mailto:' + p.email + '" class="postContact">✉ ' + p.email + '</a>';
        }

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
                '<span class="tag"># ' + p.tag + '</span>' +
                emailHtml +
            '</div>' +
        '</article>';
    }

    postsList.innerHTML = html;
}

function renderProfile(posts) {
    const nickEl = getEl('#userNick');
    if (!nickEl) return;
    
    nickEl.textContent = currentUser.nick;
    getEl('#userRole').textContent = roleNames[currentUser.role] || 'Участник';
    
    const myPosts = posts.filter(p => p.author.toLowerCase() === currentUser.nick.toLowerCase());
    getEl('#myPostsCount').textContent = myPosts.length;
}

if (isAppPage) {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        allPosts = snapshot.docs.map(doc => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        renderPosts(allPosts);
        renderProfile(allPosts);
    }, error => {
        console.error(error);
    });
}

document.addEventListener('click', async (e) => {
    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) {
        const filters = document.querySelectorAll('.filter');
        filters.forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
        renderPosts(allPosts);
        return;
    }

    if (e.target.id === 'logoutBtn') {
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
    searchEl.addEventListener('input', () => {
        renderPosts(allPosts);
    });
}

const formEl = getEl('#postForm');
if (formEl) {
    formEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = getEl('#postTitle').value.trim();
        const description = getEl('#postDesc').value.trim();
        const tag = getEl('#postTag').value.trim();
        const email = getEl('#postEmail').value.trim();

        if (!title || !description || !tag) return;

        try {
            await db.collection('posts').add({
                title: title,
                description: description,
                tag: tag,
                email: email,
                role: currentUser.role,
                author: currentUser.nick,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            formEl.reset();
        } catch (err) {
            alert('Ошибка при публикации поста');
        }
    });
}

if (isAuthPage) {
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleAuth = document.getElementById('toggleAuth');
    const roleGroup = document.getElementById('roleGroup');
    const authError = document.getElementById('authError');
    let isReg = false;

    if (toggleAuth) {
        toggleAuth.addEventListener('click', function(e) {
            e.preventDefault();
            isReg = !isReg;
            
            if (isReg) {
                authTitle.textContent = 'Создать аккаунт';
                submitBtn.textContent = 'Зарегистрироваться →';
                toggleAuth.textContent = 'Уже есть аккаунт? Войти';
                if (roleGroup) roleGroup.style.display = 'block';
            } else {
                authTitle.textContent = 'Вход в аккаунт';
                submitBtn.textContent = 'Войти →';
                toggleAuth.textContent = 'Нет аккаунта? Зарегистрироваться';
                if (roleGroup) roleGroup.style.display = 'none';
            }
            if (authError) authError.textContent = '';
        });
    }

    if (authForm) {
        authForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (authError) authError.textContent = '';
            
            const nickInput = document.getElementById('nick');
            const passInput = document.getElementById('password');
            const roleSelect = document.getElementById('role');

            const nick = nickInput ? nickInput.value.trim() : '';
            const password = passInput ? passInput.value.trim() : '';
            const role = roleSelect ? roleSelect.value : 'student';

            if (!nick || !password) {
                if (authError) authError.textContent = 'Заполните все поля!';
                return;
            }

            try {
                const userDocRef = db.collection('users').doc(nick.toLowerCase());

                if (isReg) {
                    const doc = await userDocRef.get();
                    if (doc.exists) {
                        if (authError) authError.textContent = 'Этот никнейм уже занят!';
                        return;
                    }

                    const newUser = { nick: nick, password: password, role: role };
                    await userDocRef.set(newUser);
                    localStorage.setItem('colab_user', JSON.stringify(newUser));
                    window.location.href = 'index.html';
                } else {
                    const doc = await userDocRef.get();
                    if (!doc.exists || doc.data().password !== password) {
                        if (authError) authError.textContent = 'Неверный никнейм или пароль!';
                        return;
                    }

                    localStorage.setItem('colab_user', JSON.stringify(doc.data()));
                    window.location.href = 'index.html';
                }
            } catch (err) {
                if (authError) authError.textContent = 'Ошибка сети или базы данных.';
            }
        });
    }
}
