const state = {
    userId: null,
    token: null,
    tokenExpiration: null,
}

const mutations = {
    setUser(state, payload) {
        state.token = payload.idToken;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration
    }
}

const actions = {
    async login(context, payload){
        await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgbSBN72BUDBoPhnFdcnNHkOnS7igBoEY", {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                userType: payload.userType,
                returnSecureToken: true
            })
        })
        .then(resp => {
            if(resp.status === 400) {
                const error = "Something went wrong, Please Check that your Login details are correct";
                alert(error)
                // throw new Error(error);
                return
            }
            const data = resp.json()
            return data
        })
        .then(data => {
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    },

    async signup(context, payload) {
        await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgbSBN72BUDBoPhnFdcnNHkOnS7igBoEY", {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                userType: payload.userType,
                returnSecureToken: true
            })
        })
        .then(resp => {
            if(resp.status === 400) {
                const error = "Something went wrong, Please Check that you are not using a registered details";
                alert(error)
                throw new Error(error);
            }
            const data = resp.json()
            return data
        })
        .then(data => {
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}

const getters = {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    }
}

export default {
    state, 
    mutations,
    actions,
    getters
}