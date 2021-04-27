// These routes will be excluded from the jwt authentication
const routes = [
    '/users/login',
    '/users/signup',
    '/users/signup/confirm',
    '/users/signup/confirm/resend',
];

module.exports = routes;
