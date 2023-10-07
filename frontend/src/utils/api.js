class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _handleResponse(res) {
        if (res.ok) {
            return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getUser() {
        const link = `${this._baseUrl}/users/me`;
        return fetch(link, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(this._handleResponse);
    };

    getInitialCards() {
        const link = `${this._baseUrl}/cards`;
        return fetch(link, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._handleResponse);
    }

    addCard(card) {
        const link = `${this._baseUrl}/cards`;
        return fetch(link, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(card),
        }).then(this._handleResponse);
    };

    deleteCard(data) {
        const link = `${this._baseUrl}/cards/${data.id}`;
        return fetch(link, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            method: "DELETE",
        }).then(this._handleResponse);
    };

    changeLikeCardStatus(data) {
        const link = `${this._baseUrl}/cards/${data.id}/likes`;
        return fetch(link, {
            method: data.isLiked ? 'PUT' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._handleResponse);
    }

    editUserProfile(user) {
        const link = `${this._baseUrl}/users/me`;
        return fetch(link, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(user),
        }).then(this._handleResponse);
    };

    editUserAvatar(user) {
        const link = `${this._baseUrl}/users/me/avatar`;
        return fetch(link, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(user),
        }).then(this._handleResponse);
    };
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
});

export default api;