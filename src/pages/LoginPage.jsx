
export default async function LoginAction({ request }) {
    // console.log('handle login action entered');
    const data = await request.formData();
    const raw = {
        email: data.get('email'),
        password: data.get('password'),
    }
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users/login", requestOptions);
    const result = await response.json();
    if (result.status === 'fail') {
        return { error: result.message, success: false }
    }
    localStorage.setItem('userToken', JSON.stringify(result.token));
    localStorage.setItem('userRole', JSON.stringify(result.role));

    const now = new Date();
    now.setMinutes(now.getMinutes() + 50);
    localStorage.setItem('expirationDate', now.toISOString());

    if (result.role === 'user') {
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