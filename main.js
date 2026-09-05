const firebaseConfig = {
  apiKey: "AIzaSyBjdFx-myXUXM3jM4vDOVyP-OUEECkx7V4",
  authDomain: "colab-85246.firebaseapp.com",
  projectId: "colab-85246",
  storageBucket: "colab-85246.firebasestorage.app",
  messagingSenderId: "140125081566",
  appId: "1:140125081566:web:5a33c2ea07a61d0d9fd74f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const roleNames = { 
    student: 'Ученик', 
    scientist: 'Ученый', 
    company: 'Компания', 
    other: 'Другое' 
};

const $ = selector => document.querySelector(selector);
const getCurrentUser = () => JSON.parse(localStorage.getItem('colab_current'));
const setCurrentUser = (user) => localStorage.setItem('colab_current', JSON.stringify(user));

let currentUser = getCurrentUser();

const isAuthPage = !!$('#authView');
const isAppPage = !!$('#appView');

// --- ЛОГИКА АВТОРИЗАЦИИ И РЕГИСТРАЦИИ ---
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
        if (authBtn) showAuth(authBtn.dataset.auth);
        
        if (e.target.matches('.passwordToggle')) {
            const input = $(`#${e.target.dataset.target}`);
            input.type = input.type === 'password' ? 'text' : 'password';
            e.target.textContent = input.type === 'password' ? 'Показать' : 'Скрыть';
        }
    });

    // Регистрация с проверкой уникальности никнейма в базе
    $('#registerButton')?.addEventListener('click', async () => {
        const nick = $('#registerNick').value.trim();
        const password = $('#registerPassword').value;
        const role = $('#registerRole').value;
        const msg = $('#registerMessage');

        if (nick.length < 3 || password.length < 6) {
            msg.textContent = 'Ник от 3 символов, пароль от 6 символов.';
            return;
        }

        msg.textContent = 'Проверка никнейма...';

        try {
            // Проверяем наличие ника в базе данных
            const userDoc = await db.collection('users').doc(nick.toLowerCase()).get();
            if (userDoc.exists) {
                msg.textContent = 'Этот никнейм уже занят. Выберите другой!';
                return;
            }

            const newUser = { nick, password, role };
            
            // Сохраняем нового пользователя в облако
            await db.collection('users').doc(nick.toLowerCase()).set(newUser);
            
            setCurrentUser(newUser);
            window.location.href = 'index.html';
        } catch (err) {
            msg.textContent = 'Ошибка при регистрации: ' + err.message;
        }
    });

    // Вход
    $('#loginButton')?.addEventListener('click', async () => {
        const nick = $('#loginNick').value.trim();
        const password = $('#loginPassword').value;
        const msg = $('#loginMessage');

        if (!nick || !password) {
            msg.textContent = 'Заполните все поля.';
            return;
        }

        msg.textContent = 'Вход...';

        try {
            const userDoc = await db.collection('users').doc(nick.toLowerCase()).get();
            if (!userDoc.exists || userDoc.data().password !== password) {
                msg.textContent = 'Неверный никнейм или пароль.';
                return;
            }

            setCurrentUser(userDoc.data());
            window.location.href = 'index.html';
        } catch (err) {
            msg.textContent = 'Ошибка входа: ' + err.message;
        }
    });
}

// --- ЛОГИКА ПРИЛОЖЕНИЯ ---
if (isAppPage) {
    if (!currentUser) {
        window.location.href = 'reg.html';
    } else {
        $('#headerNick').textContent = currentUser.nick;
        $('#headerAvatar').textContent = currentUser.nick.charAt(0).toUpperCase();
        
        // Синхронизация задач в реальном времени со всеми устройствами
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderPosts(posts);
            renderProfile(posts);
        });
    }

    // Отрисовка постов
    function renderPosts(posts) {
        const query = $('#searchInput').value.toLowerCase();
        const activeFilter = document.querySelector('.filter.active')?.dataset.filter || 'all';

        const visible = posts.filter(p => {
            const matchFilter = activeFilter === 'all' || p.role === activeFilter;
            const matchSearch = `${p.title} ${p.description} ${p.tag}`.toLowerCase().includes(query);
            return matchFilter && matchSearch;
        });

        if (!visible.length) {
            $('#postsList').innerHTML = '<div class="empty">Задач пока нет.</div>';
            return;
        }

        $('#postsList').innerHTML = visible.map(p => {
            const isOwner = currentUser && p.author.toLowerCase() === currentUser.nick.toLowerCase();
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

    // Отрисовка профиля
    function renderProfile(posts) {
        const mine = posts.filter(p => p.author.toLowerCase() === currentUser.nick.toLowerCase());
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

    // Слушатель кликов
    document.addEventListener('click', async e => {
        const deleteBtn = e.target.closest('[data-delete]');
        if (deleteBtn) {
            const postId = deleteBtn.dataset.delete;
            if (confirm('Точно удалить эту задачу?')) {
                await db.collection('posts').doc(postId).delete();
            }
            return;
        }

        const pageBtn = e.target.closest('[data-page]');
        if (pageBtn) {
            document.querySelectorAll('.navButton').forEach(b => b.classList.toggle('active', b === pageBtn));
            $('#postsPage').classList.toggle('hidden', pageBtn.dataset.page !== 'posts');
            $('#profilePage').classList.toggle('hidden', pageBtn.dataset.page !== 'profile');
        }

        const filterBtn = e.target.closest('[data-filter]');
        if (filterBtn) {
            document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === filterBtn));
        }

        const closeBtn = e.target.closest('[data-close]');
        if (closeBtn) {
            $(`#${closeBtn.dataset.close}`).classList.add('hidden');
        }
    });

    $('#logoutButton')?.addEventListener('click', () => {
        localStorage.removeItem('colab_current');
        window.location.href = 'reg.html';
    });

    $('#newPostButton')?.addEventListener('click', () => {
        $('#postModal').classList.remove('hidden');
    });

    // Отправка новой задачи в облако
    $('#savePostButton')?.addEventListener('click', async () => {
        const title = $('#postTitle').value.trim();
        const description = $('#postDescription').value.trim();
        const email = $('#postEmail').value.trim();
        const tag = $('#postTag').value.trim() || 'общие';

        if (!title || !description || !email) {
            $('#postMessage').textContent = 'Заполните заголовок, описание и почту.';
            return;
        }

        await db.collection('posts').add({
            title,
            description,
            email,
            tag,
            author: currentUser.nick,
            role: currentUser.role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        $('#postModal').classList.add('hidden');
        $('#postTitle').value = '';
        $('#postDescription').value = '';
        $('#postEmail').value = '';
        $('#postTag').value = '';
    });
}
