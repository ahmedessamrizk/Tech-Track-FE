
export default async function resetAction({ request }) {
    // console.log('handle reset action entered');

    const data = await request.formData();
    const raw = {
        password: data.get('password'),
        passwordConfirm: data.get('passwordConfirm'),
    }
    var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(raw),
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    if (raw.password !== raw.passwordConfirm) {
        return { error: "passwords doesn't match" }
    }
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users/resetPassword/ebba0416199f7b316e8ae723084c66fadeb01456de9b1d0177ed31f44ac1525d", requestOptions);
    const result = await response.json();
    if (result.status === 'error') {
        return { error: result.message, success: false }
    } else if (result.status === 'fail') {
        return { error: 'this link is expired please reset from the beginning again', success: false }
    }
    localStorage.setItem('userToken', JSON.stringify(result.token));
    localStorage.setItem('userRole', JSON.stringify(result.data.user.role));

    const now = new Date();
    now.setMinutes(now.getMinutes() + 60);
    localStorage.setItem('expirationDate', now.toISOString());

    if (result.data.user.role === 'user') {
        var requestOptions1 = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${result.token}`,
            },
            redirect: "follow",
        };
        const response1 = await fetch(
            "https://techtrack-be.vercel.app/api/v1/favorites",
            requestOptions1
        );
        const result1 = await response1.json();
        localStorage.setItem('userFavorites', JSON.stringify(result1.data.favorites_products))
    }
    return { success: true }
}