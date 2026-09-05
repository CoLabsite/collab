const storageKeys = { 
    users: 'colab_users', 
    posts: 'colab_posts', 
    current: 'colab_current' 
};

const seedPosts = [
    { 
        id: 'p1', 
        title: 'Очистка воды в поселениях', 
        description: 'Нужен доступный способ контроля качества воды.', 
        tag: 'экология', 
        author: 'Aqua Research', 
        email: 'aqua@test.com', 
        role: 'scientist' 
    },
    { 
        id: 'p2', 
        title: 'Умное распределение энергии', 
        description: 'Как уменьшить потери солнечной энергии?', 
        tag: 'энергетика', 
        author: 'EcoTech', 
        email: 'eco@test.com', 
        role: 'company' 
    }
];

const get = key => JSON.parse(localStorage.getItem(key) || 'null');
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const $ = selector => document.querySelector(selector);

const roleNames = { 
    student: 'Ученик', 
    scientist: 'Ученый', 
    company: 'Компания', 
    other: 'Другое' 
};

let posts = get(storageKeys.posts) || seedPosts;
let currentUser = get(storageKeys.current);

const isAuthPage = !!$('#authView');
const isAppPage = !!$('#appView');

if (isAuthPage) {
    if (currentUser) {
        window.location.href = 'index.html';
    }

    function showAuth(mode) {
        document.querySelectorAll('.authTab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.auth === mode);
        });
        $('#loginForm').classList.toggle('hidden', mode !== 'login');
        $('#registerForm').classList.toggle('hidden', mode !== 'register');
    }

    document.addEventListener('click', e => {
        const authBtn = e.target.closest('[data-auth]');
        if (authBtn) {
            showAuth(authBtn.dataset.auth);
        }
        if (e.target.matches('.passwordToggle')) {
            const input = $(`#${e.target.dataset.target}`);
            input.type = input.type === 'password' ? 'text' : 'password';
            e.target.textContent = input.type === 'password' ? 'Показать' : 'Скрыть';
        }
    });

    $('#registerButton')?.addEventListener('click', () => {
        const nick = $('#registerNick').value.trim();
        const password = $('#registerPassword').value;
        const users = get(storageKeys.users) || [];
        
        if (nick.length < 3 || password.length < 6) {
            $('#registerMessage').textContent = 'Заполните поля корректно (пароль от 6 символов).';
            return;
        }

        const user = { 
            nick, 
            password, 
            role: $('#registerRole').value 
        };
        
        users.push(user);
        save(storageKeys.users, users);
        save(storageKeys.current, user);
        window.location.href = 'index.html';
    });

    $('#loginButton')?.addEventListener('click', () => {
        const nick = $('#loginNick').value.trim();
        const password = $('#loginPassword').value;
        const users = get(storageKeys.users) || [];
        
        const user = users.find(u => u.nick === nick && u.password === password);
        if (!user) {
            $('#loginMessage').textContent = 'Неверный логин или пароль.';
            return;
        }

        save(storageKeys.current, user);
        window.location.href = 'index.html';
    });
}

if (isAppPage) {
    if (!currentUser) {
        window.location.href = 'reg.html';
    } else {
        $('#headerNick').textContent = currentUser.nick;
        $('#headerAvatar').textContent = currentUser.nick.charAt(0).toUpperCase();
        renderPosts();
        renderProfile();
    }

    function deletePost(id) {
        posts = posts.filter(p => p.id !== id);
        save(storageKeys.posts, posts);
        renderPosts();
        renderProfile();
    }

    function renderPosts() {
        const query = $('#searchInput').value.toLowerCase();
        const activeFilter = document.querySelector('.filter.active')?.dataset.filter || 'all';
        
        const visible = posts.filter(p => {
            const matchFilter = activeFilter === 'all' || p.role === activeFilter;
            const matchSearch = `${p.title} ${p.description} ${p.tag}`.toLowerCase().includes(query);
            return matchFilter && matchSearch;
        });

        if (!visible.length) {
            $('#postsList').innerHTML = '<div class="empty">Задач не найдено.</div>';
            return;
        }

        $('#postsList').innerHTML = visible.map(p => {
            const isOwner = currentUser && p.author === currentUser.nick;
            return `
                <article class="postCard">
                    <div class="postMeta">
                        <span class="roleLabel">${roleNames[p.role] || 'Участник'}</span>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <span>Автор: ${p.author}</span>
                            ${isOwner ? `<button class="deleteButton" data-delete="${p.id}">Удалить</button>` : ''}
                        </div>
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="postBottom">
                        <span class="tag"># ${p.tag}</span>
                        ${p.email ? `<a href="mailto:${p.email}" class="postContact">✉ ${p.email}</a>` : ''}
                    </div>
                </article>
            `;
        }).join('');
    }

    function renderProfile() {
        const mine = posts.filter(p => p.author === currentUser.nick);
        $('#profileNick').textContent = currentUser.nick;
        $('#profileRole').textContent = roleNames[currentUser.role] || 'Участник';
        $('#profileAvatar').textContent = currentUser.nick.charAt(0).toUpperCase();
        $('#profileProblems').textContent = mine.length;
        $('#myPosts').innerHTML = mine.length 
            ? mine.map(p => `
                <div class="profileItem">
                    <strong>${p.title}</strong>
                    <button class="deleteButton" data-delete="${p.id}">Удалить</button>
                </div>
            `).join('') 
            : '<p>Вы еще не опубликовали задач.</p>';
    }

    document.addEventListener('click', e => {
        const deleteBtn = e.target.closest('[data-delete]');
        if (deleteBtn) {
            deletePost(deleteBtn.dataset.delete);
            return;
        }

        const pageBtn = e.target.closest('[data-page]');
        if (pageBtn) {
            document.querySelectorAll('.navButton').forEach(b => {
                b.classList.toggle('active', b === pageBtn);
            });
            $('#postsPage').classList.toggle('hidden', pageBtn.dataset.page !== 'posts');
            $('#profilePage').classList.toggle('hidden', pageBtn.dataset.page !== 'profile');
        }

        const filterBtn = e.target.closest('[data-filter]');
        if (filterBtn) {
            document.querySelectorAll('.filter').forEach(b => {
                b.classList.toggle('active', b === filterBtn);
            });
            renderPosts();
        }

        const closeBtn = e.target.closest('[data-close]');
        if (closeBtn) {
            $(`#${closeBtn.dataset.close}`).classList.add('hidden');
        }
    });

    $('#logoutButton')?.addEventListener('click', () => {
        localStorage.removeItem(storageKeys.current);
        window.location.href = 'reg.html';
    });

    $('#searchInput')?.addEventListener('input', renderPosts);
    $('#newPostButton')?.addEventListener('click', () => {
        $('#postModal').classList.remove('hidden');
    });

    $('#savePostButton')?.addEventListener('click', () => {
        const title = $('#postTitle').value.trim();
        const description = $('#postDescription').value.trim();
        const email = $('#postEmail').value.trim();
        const tag = $('#postTag').value.trim() || 'общие';
        if (!title || !description || !email) {
            $('#postMessage').textContent = 'Заполните заголовок, описание и почту.';
            return;
        }
        posts.unshift({ 
            id: `p${Date.now()}`, 
            title, 
            description, 
            email, 
            tag, 
            author: currentUser.nick, 
            role: currentUser.role 
        });
        save(storageKeys.posts, posts);
        $('#postModal').classList.add('hidden');
        $('#postTitle').value = '';
        $('#postDescription').value = '';
        $('#postEmail').value = '';
        $('#postTag').value = '';
        
        renderPosts();
        renderProfile();
    });
}