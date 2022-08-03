let isLogged = () => {
    let token = localStorage.getItem('token')

    return !!token
}


export const accountService = {
    isLogged
}