import { redirect } from "react-router-dom";

export default function logoutAction() {
    // console.log('handle logout action entered');

    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userFavorites');
    localStorage.removeItem('expirationDate');
    localStorage.setItem('chatHistory', JSON.stringify([]));
    localStorage.setItem('compareProducts', JSON.stringify([]));
    return redirect('/')
}