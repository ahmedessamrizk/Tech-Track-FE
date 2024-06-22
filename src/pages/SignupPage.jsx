import { redirect } from "react-router-dom";

export default async function signUpAction({ request }) {
    // console.log('handle signUp action entered');

    const data = await request.formData();
    if (data.get('phone').length !== 11) {
        return { error: "phone number must be 11 digits" }
    }
    const raw = {
        name: `${data.get('firstName') + ' ' + data.get('lastName')}`.trim(),
        email: data.get('email'),
        password: data.get('password'),
        passwordConfirm: data.get('passwordConfirm'),
        gender: data.get('gender'),
        phone: data.get('phone').slice(-10),
    }
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    const regex = /^1\d{9}$/;

    if (raw.password !== raw.passwordConfirm) {
        return { error: "passwords doesn't match" }
    }
    if (!regex.test(raw.phone)) {
        return { error: "wrong phone number" }
    }
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users/signup", requestOptions);
    const result = await response.json();
    if (result.status === 'error') {
        if (result.error.code === 11000) {
            if (result.error.keyPattern.phone === 1) {
                return { error: 'phone: phone already exists' }
            } else if (result.error.keyPattern.email === 1) {
                return { error: `email: email already exists` }
            } else {
                return { error: result.message }
            }
        }
        else {
            return { error: result.message }
        }
    }
    localStorage.setItem('userToken', JSON.stringify(result.token));
    localStorage.setItem('userRole', JSON.stringify(result.data.user.role));
    localStorage.setItem('userFavorites', JSON.stringify([]));

    const now = new Date();
    now.setHours(now.getHours() + 1);
    localStorage.setItem('expirationDate', now.toISOString());
    return redirect('/')
}