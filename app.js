require("@babel/polyfill");
var $knI9B$axios = require("axios");
var $knI9B$stripe = require("stripe");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $c67cb762f0198593$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $c67cb762f0198593$export$de026b00723010c1 = (type, msg)=>{
    $c67cb762f0198593$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($c67cb762f0198593$export$516836c6a9dfc573, 5000);
};


const $70af9284e599e604$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'Success') {
            (0, $c67cb762f0198593$export$de026b00723010c1)('success', 'Logged in successfully');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', err.response.data.message);
    }
};
const $70af9284e599e604$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') location.reload(true);
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', 'Error logging out! Try again.');
    }
};




const $2db3670f13ba185b$export$7200a869094fec36 = async (name, email, password, passwordConfirm)=>{
    try {
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
        });
        if (res.data.status === 'Success') {
            (0, $c67cb762f0198593$export$de026b00723010c1)('success', 'Signed Up successfully');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', err.response.data.message);
    }
};




const $936fcc27ffb6bbb1$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updatePassword' : '/api/v1/users/updateMe';
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'Success') (0, $c67cb762f0198593$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', err.response.data.message);
    }
};





const $6710bca62beba915$var$stripe = $knI9B$stripe('pk_test_51THOtVIfTD7A7kHjREk6XSlR4LJk8caE1BmZqbADK5OuvSjkqcorJj7wVgBEo4IBN84k0wdKN9jH378T2jtTO7Xb00LcgUAeXt');
const $6710bca62beba915$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        const session = await (0, ($parcel$interopDefault($knI9B$axios)))(`/api/v1/bookings/checkout-session/${tourId}`);
        window.location.href = session.data.session.url;
    } catch (err) {
        console.log(err);
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', err);
    }
};


const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector('.form--login');
const $d0f7ce18c37ad6f6$var$signUpFrom = document.querySelector('.form--signup');
const $d0f7ce18c37ad6f6$var$logOutBtn = document.querySelector('.nav__el--logout');
const $d0f7ce18c37ad6f6$var$userDataForm = document.querySelector('.form-user-data');
const $d0f7ce18c37ad6f6$var$userPasswordForm = document.querySelector('.form-user-password');
const $d0f7ce18c37ad6f6$var$bookBtn = document.getElementById('book-tour');
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, $70af9284e599e604$export$596d806903d1f59e)(email, password);
});
if ($d0f7ce18c37ad6f6$var$signUpFrom) $d0f7ce18c37ad6f6$var$signUpFrom.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    (0, $2db3670f13ba185b$export$7200a869094fec36)(name, email, password, passwordConfirm);
});
if ($d0f7ce18c37ad6f6$var$logOutBtn) $d0f7ce18c37ad6f6$var$logOutBtn.addEventListener('click', (0, $70af9284e599e604$export$a0973bcfe11b05c9));
if ($d0f7ce18c37ad6f6$var$userDataForm) $d0f7ce18c37ad6f6$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    (0, $936fcc27ffb6bbb1$export$f558026a994b6051)(form, 'data');
});
if ($d0f7ce18c37ad6f6$var$userPasswordForm) $d0f7ce18c37ad6f6$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm = document.getElementById('password-confirm').value;
    await (0, $936fcc27ffb6bbb1$export$f558026a994b6051)({
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});
if ($d0f7ce18c37ad6f6$var$bookBtn) $d0f7ce18c37ad6f6$var$bookBtn.addEventListener('click', (e)=>{
    e.target.textContent = 'Processing...';
    const { tourId: tourId } = e.target.dataset;
    (0, $6710bca62beba915$export$8d5bdbf26681c0c2)(tourId);
});


//# sourceMappingURL=app.js.map
