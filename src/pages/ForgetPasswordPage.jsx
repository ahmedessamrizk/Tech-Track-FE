export default async function handleForget({ request }) {
    // console.log('handle Forget action entered');
    const data = await request.formData();
    const raw = {
        email: data.get('email'),
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };

    const result = await fetch("https://techtrack-be.vercel.app/api/v1/users/forgotPassword", requestOptions);

    return 'submitted'
}