const translations = {
    ru: {
        navPosts: "Задачи",
        navProfile: "Профиль",
        postsTitle1: "Актуальные",
        postsTitle2: "проблемы",
        newPostButton: "+ Опубликовать задачу",
        searchPlaceholder: "Поиск задач...",
        filterAll: "Все",
        filterStudent: "Ученики",
        filterScientist: "Ученые",
        filterCompany: "Компании",
        filterOther: "Другое",
        statProblems: "Опубликовано задач",
        statSolutions: "Предложено решений",
        myPostsTitle: "Мои проблемы",
        mySolutionsTitle: "Мои решения",
        modalNewPostTitle: "Новая задача",
        labelTitle: "Заголовок",
        placeholderTitle: "Краткое название (обязательно)",
        labelDesc: "Описание",
        placeholderDesc: "Подробное описание проблемы... (обязательно)",
        charLimitText: "400 символов",
        labelLink: "Ссылка на доп. материалы (GitHub, Figma, диск и т.д.)",
        labelContact: "Ваша почта / Телеграм (для связи)",
        labelTag: "Тег",
        placeholderTag: "экология, IT и т.д.",
        publishBtn: "Опубликовать",
        modalSolutionTitle: "Предложить решение",
        labelSolText: "Ваше решение / Комментарий",
        placeholderSolText: "Опишите, как вы предлагаете решить проблему...",
        labelSolLink: "Ссылка на решение (GitHub, репозиторий, документ)",
        sendSolutionBtn: "Отправить решение",
        asideEyebrow: "Платформа идей",
        asideTitle1: "Объединяем науки",
        asideTitle2: "и решения.",
        asideDesc: "Платформа для совместной работы учеников, ученых и организаций.",
        tabLogin: "Вход",
        tabRegister: "Регистрация",
        loginHeader: "С возвращением",
        loginSub: "Введите свои данные для входа",
        labelNick: "Никнейм",
        placeholderNick: "Ваш никнейм",
        labelPass: "Пароль",
        placeholderPass: "Пароль",
        showPassBtn: "Показать",
        hidePassBtn: "Скрыть",
        loginBtnText: "Войти",
        regHeader: "Создать аккаунт",
        regSub: "Заполните поля для регистрации",
        placeholderRegNick: "Придумайте никнейм",
        labelRole: "Роль",
        roleStudent: "Ученик",
        roleScientist: "Ученый",
        roleCompany: "Компания",
        roleOther: "Другое",
        placeholderRegPass: "Минимум 6 символов",
        regBtnText: "Зарегистрироваться",
        role_student: "Ученик",
        role_scientist: "Ученый",
        role_company: "Компания",
        role_other: "Другое",
        participant: "Участник",
        authorLabel: "Автор: ",
        deleteText: "Удалить",
        materialsText: "🔗 Материалы",
        solutionsBtnText: "💬 Решения",
        noSolutionsText: "Пока нет предложенных решений.",
        AddSolutionBtnText: "+ Предложить решение",
        solLinkText: "🔗 Ссылка на решение",
        noMyPosts: "Нет опубликованных задач",
        noMySolutions: "Нет предложенных решений",
        emptyPosts: "Задач пока нет."
    },
    en: {
        navPosts: "Tasks",
        navProfile: "Profile",
        postsTitle1: "Current",
        postsTitle2: "challenges",
        newPostButton: "+ Post a Challenge",
        searchPlaceholder: "Search tasks...",
        filterAll: "All",
        filterStudent: "Students",
        filterScientist: "Scientists",
        filterCompany: "Companies",
        filterOther: "Other",
        statProblems: "Published tasks",
        statSolutions: "Proposed solutions",
        myPostsTitle: "My Tasks",
        mySolutionsTitle: "My Solutions",
        modalNewPostTitle: "New Challenge",
        labelTitle: "Title",
        placeholderTitle: "Short title (required)",
        labelDesc: "Description",
        placeholderDesc: "Detailed description... (required)",
        charLimitText: "400 characters",
        labelLink: "Link to materials (GitHub, Figma, Drive, etc.)",
        labelContact: "Your email / Telegram (for contact)",
        labelTag: "Tag",
        placeholderTag: "ecology, IT, etc.",
        publishBtn: "Publish",
        modalSolutionTitle: "Propose Solution",
        labelSolText: "Your solution / Comment",
        placeholderSolText: "Describe your proposed solution...",
        labelSolLink: "Solution link (GitHub, repo, document)",
        sendSolutionBtn: "Submit Solution",
        asideEyebrow: "Ideas Platform",
        asideTitle1: "Uniting science",
        asideTitle2: "& solutions.",
        asideDesc: "Collaboration platform for students, scientists, and organizations.",
        tabLogin: "Sign In",
        tabRegister: "Sign Up",
        loginHeader: "Welcome Back",
        loginSub: "Enter your details to sign in",
        labelNick: "Nickname",
        placeholderNick: "Your nickname",
        labelPass: "Password",
        placeholderPass: "Password",
        showPassBtn: "Show",
        hidePassBtn: "Hide",
        loginBtnText: "Sign In",
        regHeader: "Create Account",
        regSub: "Fill in the fields to register",
        placeholderRegNick: "Choose a nickname",
        labelRole: "Role",
        roleStudent: "Student",
        roleScientist: "Scientist",
        roleCompany: "Company",
        roleOther: "Other",
        placeholderRegPass: "At least 6 characters",
        regBtnText: "Register",
        role_student: "Student",
        role_scientist: "Scientist",
        role_company: "Company",
        role_other: "Other",
        participant: "Participant",
        authorLabel: "Author: ",
        deleteText: "Delete",
        materialsText: "🔗 Materials",
        solutionsBtnText: "💬 Solutions",
        noSolutionsText: "No solutions proposed yet.",
        AddSolutionBtnText: "+ Propose solution",
        solLinkText: "🔗 Solution link",
        noMyPosts: "No published tasks",
        noMySolutions: "No proposed solutions",
        emptyPosts: "No tasks yet."
    }
};

let currentLang = localStorage.getItem('colab_lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('colab_lang', lang);
    document.querySelectorAll('.langBtn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    if (typeof allPosts !== 'undefined' && typeof allSolutions !== 'undefined') {
        renderPosts(allPosts, allSolutions);
        renderProfile(allPosts, allSolutions);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.langBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    setLanguage(currentLang);
});

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

let currentUser = JSON.parse(localStorage.getItem('colab_user')) || null;
let allPosts = [];
let allSolutions = [];

const isAuthPage = window.location.pathname.endsWith('reg.html');
if (!currentUser && !isAuthPage) {
    window.location.href = 'reg.html';
} else if (currentUser && isAuthPage) {
    window.location.href = 'index.html';
}

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
                btn.textContent = translations[currentLang].hidePassBtn;
            } else {
                input.type = 'password';
                btn.textContent = translations[currentLang].showPassBtn;
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
                msg.textContent = currentLang === 'en' ? 'Fill in all fields!' : 'Заполните все поля!';
                return;
            }
            try {
                const userDoc = await db.collection('users').doc(nick.toLowerCase()).get();
                if (!userDoc.exists || userDoc.data().password !== password) {
                    msg.textContent = currentLang === 'en' ? 'Invalid nickname or password!' : 'Неверный никнейм или пароль!';
                    return;
                }
                localStorage.setItem('colab_user', JSON.stringify(userDoc.data()));
                window.location.href = 'index.html';
            } catch (err) {
                msg.textContent = currentLang === 'en' ? 'Database connection error.' : 'Ошибка подключения к базе данных.';
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
                msg.textContent = currentLang === 'en' ? 'Fill in all fields!' : 'Заполните все поля!';
                return;
            }
            if (password.length < 6) {
                msg.textContent = currentLang === 'en' ? 'Password must be at least 6 characters!' : 'Пароль должен быть минимум 6 символов!';
                return;
            }
            try {
                const userDocRef = db.collection('users').doc(nick.toLowerCase());
                const doc = await userDocRef.get();
                if (doc.exists) {
                    msg.textContent = currentLang === 'en' ? 'This nickname is already taken!' : 'Этот никнейм уже занят!';
                    return;
                }
                const newUser = { nick: nick, password: password, role: role };
                await userDocRef.set(newUser);
                localStorage.setItem('colab_user', JSON.stringify(newUser));
                window.location.href = 'index.html';
            } catch (err) {
                msg.textContent = currentLang === 'en' ? 'Error saving data.' : 'Ошибка сохранения данных.';
            }
        });
    }
}

function renderPosts(posts, solutions) {
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
        postsList.innerHTML = '<div class="empty">' + translations[currentLang].emptyPosts + '</div>';
        return;
    }

    let html = '';
    for (let i = 0; i < visible.length; i++) {
        const p = visible[i];
        const isOwner = currentUser && p.author && p.author.toLowerCase() === currentUser.nick.toLowerCase();
        let deleteBtnHtml = isOwner ? '<button class="deleteButton" data-delete-post="' + p.id + '">' + translations[currentLang].deleteText + '</button>' : '';
        let emailHtml = p.email ? '<a href="mailto:' + p.email + '" class="postContact">✉ ' + p.email + '</a>' : '';
        let linkHtml = p.link ? '<a href="' + p.link + '" target="_blank" class="postContact">' + translations[currentLang].materialsText + '</a>' : '';
        const roleText = translations[currentLang]['role_' + p.role] || translations[currentLang].participant;

        const postSolutions = solutions.filter(s => s.postId === p.id);
        
        let solutionsListHtml = '';
        postSolutions.forEach(sol => {
            const isSolOwner = currentUser && sol.author && sol.author.toLowerCase() === currentUser.nick.toLowerCase();
            let deleteSolBtn = isSolOwner ? '<button class="deleteButton" data-delete-sol="' + sol.id + '" style="font-size:10px;">' + translations[currentLang].deleteText + '</button>' : '';
            let solLinkHtml = sol.link ? '<br><a href="' + sol.link + '" target="_blank" class="postContact">' + translations[currentLang].solLinkText + '</a>' : '';
            
            solutionsListHtml += '<div class="solutionCard">' +
                '<div style="display:flex; justify-content:space-between; font-size:11px; color:#676767;">' +
                    '<span><strong>' + sol.author + '</strong></span>' +
                    deleteSolBtn +
                '</div>' +
                '<p style="margin:5px 0; font-size:12px;">' + sol.description + '</p>' +
                solLinkHtml +
            '</div>';
        });

        let solutionsSection = '<div class="solutionsSection">' +
            '<button class="toggleSolutionsBtn" data-toggle-solutions="' + p.id + '">' + translations[currentLang].solutionsBtnText + ' (' + postSolutions.length + ') ▼</button>' +
            '<div id="solutions-wrapper-' + p.id + '" class="solutionsWrapper hidden" style="margin-top:10px;">' +
                (solutionsListHtml || '<div style="font-size:11px; color:#676767; margin-bottom:10px;">' + translations[currentLang].noSolutionsText + '</div>') +
                '<button class="primaryButton compact" data-open-solution="' + p.id + '" style="font-size:11px; padding:8px 12px; margin-top:5px;">' + translations[currentLang].AddSolutionBtnText + '</button>' +
            '</div>' +
        '</div>';

        html += '<article class="postCard">' +
            '<div class="postMeta">' +
                '<span class="roleLabel">' + roleText + '</span>' +
                '<div style="display:flex; gap:10px; align-items:center;">' +
                    '<span>' + translations[currentLang].authorLabel + p.author + '</span>' +
                    deleteBtnHtml +
                '</div>' +
            '</div>' +
            '<h3>' + p.title + '</h3>' +
            '<p>' + p.description + '</p>' +
            '<div class="postBottom">' +
                '<span class="tag"># ' + (p.tag || '') + '</span>' +
                '<div style="display:flex; gap:10px;">' + linkHtml + emailHtml + '</div>' +
            '</div>' +
            solutionsSection +
        '</article>';
    }
    postsList.innerHTML = html;
}

function renderProfile(posts, solutions) {
    const headerNick = getEl('#headerNick');
    const profileNick = getEl('#profileNick');
    const profileRole = getEl('#profileRole');
    const profileProblems = getEl('#profileProblems');
    const profileSolutions = getEl('#profileSolutions');
    const myPostsList = getEl('#myPostsList');
    const mySolutionsList = getEl('#mySolutionsList');

    if (currentUser) {
        if (headerNick) headerNick.textContent = currentUser.nick;
        if (profileNick) profileNick.textContent = currentUser.nick;
        if (profileRole) profileRole.textContent = translations[currentLang]['role_' + currentUser.role] || translations[currentLang].participant;

        const myPosts = posts.filter(p => p.author && p.author.toLowerCase() === currentUser.nick.toLowerCase());
        const mySolutions = solutions.filter(s => s.author && s.author.toLowerCase() === currentUser.nick.toLowerCase());

        if (profileProblems) profileProblems.textContent = myPosts.length;
        if (profileSolutions) profileSolutions.textContent = mySolutions.length;

        if (myPostsList) {
            myPostsList.innerHTML = myPosts.length ? myPosts.map(p => '<div class="profileItem"><strong>' + p.title + '</strong><span>' + p.description.substring(0, 80) + '...</span></div>').join('') : '<span style="color:#676767; font-size:12px;">' + translations[currentLang].noMyPosts + '</span>';
        }

        if (mySolutionsList) {
            mySolutionsList.innerHTML = mySolutions.length ? mySolutions.map(s => '<div class="profileItem"><span>' + s.description.substring(0, 80) + '...</span></div>').join('') : '<span style="color:#676767; font-size:12px;">' + translations[currentLang].noMySolutions + '</span>';
        }
    }
}

if (!isAuthPage) {
    db.collection('posts').onSnapshot(postSnapshot => {
        allPosts = postSnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
        allPosts.sort((a, b) => {
            const timeA = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
        });
        renderPosts(allPosts, allSolutions);
        renderProfile(allPosts, allSolutions);
    }, error => {
        console.error(error);
    });

    db.collection('solutions').onSnapshot(solSnapshot => {
        allSolutions = solSnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
        allSolutions.sort((a, b) => {
            const timeA = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
        });
        renderPosts(allPosts, allSolutions);
        renderProfile(allPosts, allSolutions);
    }, error => {
        console.error(error);
    });

    const modal = getEl('#postModal');
    const openBtn = getEl('#newPostButton');
    const closeBtn = getEl('[data-close="postModal"]');
    const saveBtn = getEl('#savePostButton');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    const descInput = getEl('#postDescription');
    const charCounter = getEl('#descCharCount');
    if (descInput && charCounter) {
        descInput.addEventListener('input', () => {
            charCounter.textContent = descInput.value.length;
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const title = getEl('#postTitle').value.trim();
            const description = getEl('#postDescription').value.trim();
            const link = getEl('#postLink').value.trim();
            const tag = getEl('#postTag').value.trim();
            const email = getEl('#postEmail').value.trim();
            const msg = getEl('#postMessage');

            if (!title || !description) {
                if (msg) msg.textContent = currentLang === 'en' ? 'Title and description are required!' : 'Заголовок и описание обязательны!';
                return;
            }

            if (description.length > 400) {
                if (msg) msg.textContent = currentLang === 'en' ? 'Description cannot exceed 400 characters!' : 'Описание не должно превышать 400 символов!';
                return;
            }

            try {
                await db.collection('posts').add({
                    title: title,
                    description: description,
                    link: link,
                    tag: tag,
                    email: email,
                    author: currentUser ? currentUser.nick : 'Аноним',
                    role: currentUser ? currentUser.role : 'other',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                getEl('#postTitle').value = '';
                getEl('#postDescription').value = '';
                getEl('#postLink').value = '';
                getEl('#postTag').value = '';
                getEl('#postEmail').value = '';
                if (charCounter) charCounter.textContent = '0';
                if (msg) msg.textContent = '';
                modal.classList.add('hidden');
            } catch (err) {
                if (msg) msg.textContent = currentLang === 'en' ? 'Publishing error!' : 'Ошибка при публикации!';
            }
        });
    }

    const solModal = getEl('#solutionModal');
    const closeSolBtn = getEl('[data-close="solutionModal"]');
    const saveSolBtn = getEl('#saveSolutionButton');

    if (closeSolBtn && solModal) {
        closeSolBtn.addEventListener('click', () => solModal.classList.add('hidden'));
    }

    if (saveSolBtn) {
        saveSolBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const postId = getEl('#targetPostId').value;
            const description = getEl('#solutionDescription').value.trim();
            const link = getEl('#solutionLink').value.trim();
            const msg = getEl('#solutionMessage');

            if (!description) {
                if (msg) msg.textContent = currentLang === 'en' ? 'Write the solution text!' : 'Напишите текст решения!';
                return;
            }

            try {
                await db.collection('solutions').add({
                    postId: postId,
                    description: description,
                    link: link,
                    author: currentUser ? currentUser.nick : 'Аноним',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                getEl('#solutionDescription').value = '';
                getEl('#solutionLink').value = '';
                if (msg) msg.textContent = '';
                solModal.classList.add('hidden');
            } catch (err) {
                if (msg) msg.textContent = currentLang === 'en' ? 'Error sending solution!' : 'Ошибка при отправке решения!';
            }
        });
    }
}

document.addEventListener('click', async (e) => {
    const navBtn = e.target.closest('.navButton');
    if (navBtn) {
        document.querySelectorAll('.navButton').forEach(b => b.classList.remove('active'));
        navBtn.classList.add('active');
        const page = navBtn.dataset.page;
        const postsPage = getEl('#postsPage');
        const profilePage = getEl('#profilePage');
        if (page === 'posts') {
            if (postsPage) postsPage.classList.remove('hidden');
            if (profilePage) profilePage.classList.add('hidden');
        } else if (page === 'profile') {
            if (postsPage) postsPage.classList.add('hidden');
            if (profilePage) profilePage.classList.remove('hidden');
        }
        return;
    }

    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) {
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
        renderPosts(allPosts, allSolutions);
        return;
    }

    if (e.target.id === 'logoutButton') {
        localStorage.removeItem('colab_user');
        window.location.href = 'reg.html';
        return;
    }

    const toggleBtn = e.target.closest('[data-toggle-solutions]');
    if (toggleBtn) {
        const postId = toggleBtn.dataset.toggleSolutions;
        const wrapper = getEl('#solutions-wrapper-' + postId);
        if (wrapper) {
            const isHidden = wrapper.classList.contains('hidden');
            if (isHidden) {
                wrapper.classList.remove('hidden');
                toggleBtn.textContent = toggleBtn.textContent.replace('▼', '▲');
            } else {
                wrapper.classList.add('hidden');
                toggleBtn.textContent = toggleBtn.textContent.replace('▲', '▼');
            }
        }
        return;
    }

    const openSolBtn = e.target.closest('[data-open-solution]');
    if (openSolBtn) {
        const postId = openSolBtn.dataset.openSolution;
        getEl('#targetPostId').value = postId;
        getEl('#solutionModal').classList.remove('hidden');
        return;
    }

    const deletePostId = e.target.dataset.deletePost;
    if (deletePostId) {
        if (confirm(currentLang === 'en' ? 'Delete this task?' : 'Удалить эту задачу?')) {
            try {
                await db.collection('posts').doc(deletePostId).delete();
            } catch (err) {
                alert(currentLang === 'en' ? 'Error deleting task' : 'Ошибка при удалении задачи');
            }
        }
        return;
    }

    const deleteSolId = e.target.dataset.deleteSol;
    if (deleteSolId) {
        if (confirm(currentLang === 'en' ? 'Delete this solution?' : 'Удалить это решение?')) {
            try {
                await db.collection('solutions').doc(deleteSolId).delete();
            } catch (err) {
                alert(currentLang === 'en' ? 'Error deleting solution' : 'Ошибка при удалении решения');
            }
        }
        return;
    }

    const closeAttr = e.target.dataset.close;
    if (closeAttr) {
        const modalEl = getEl('#' + closeAttr);
        if (modalEl) modalEl.classList.add('hidden');
        return;
    }
});

window.addEventListener('click', (e) => {
    const postModal = getEl('#postModal');
    const solModal = getEl('#solutionModal');
    if (e.target === postModal) postModal.classList.add('hidden');
    if (e.target === solModal) solModal.classList.add('hidden');
});

const searchEl = getEl('#searchInput');
if (searchEl) {
    searchEl.addEventListener('input', () => renderPosts(allPosts, allSolutions));
}
