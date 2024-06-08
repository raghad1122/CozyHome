function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'cozyhome11@gmail.com' && password === 'cozyhome11') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = 'admin.html';
    }
});
