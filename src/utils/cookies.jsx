import Cookies from 'js-cookie';

// Cookies.set('auth_token', 'your-token', { expires: 7, path: '/', sameSite: 'None', secure: true });

export const getToken = () => Cookies.get('auth_token');
