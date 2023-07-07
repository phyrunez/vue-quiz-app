import axios from "axios"

const state = {
    userId: null,
    token: null,
    tokenExpiration: null,
    displayName: null,
    success_msg: "Successfully logged in to the system",
    User: []
}

const mutations = {
    setUser(state, payload) {
        state.token = payload.idToken;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration
        state.displayName = payload.displayName

        state.User.push(payload)
    }
}

const actions = {
    async login(context, payload){
        const login = process.env.VUE_APP_FIREBASE_SIGN_IN_WITH_PASSWORD 

        await axios.post(login, {
            email: payload.email,
            password: payload.password,
            userType: payload.userType,
            displayName: payload.displayName,
            returnSecureToken: true
        })
        .then(resp => {
            context.commit('setUser', {
                token: resp.idToken,
                userId: resp.localId,
                tokenExpiration: resp.expiresIn,
                displayName: resp.displayName
            })
            
            alert(state.success_msg)
            
        })
        .catch(error => {
            console.log('Something went wrong - Please make sure to login with the correct')

        })

    },

    async signup(context, payload) {
        const signup = process.env.VUE_APP_FIREBASE_SIGNUP

        await axios.post(signup, {
            email: payload.email,
            password: payload.password,
            userType: payload.userType,
            returnSecureToken: true
            
        })
        .then(resp => {
            // if(resp.status === 400) {
            //     const error = "Something went wrong, Please Check that you are not using a registered details";
            //     alert(error)
            //     throw new Error(error);
            // }else {
            //     const data = resp
               
            //     return data
            // }
            
            const data = resp
            console.log(data.data)
            return data      
        })
        .then(data => {
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn
            })

            alert(state.success_msg)
            this.router.push("/dashboard/admin")
        })
        .catch(error => {
            // alert('Something went wrong - Please make sure to login with the correct')
            if(error.response) {
                console.log(error.resp.data)
            }
        })
    }
}

const getters = {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    User(state) {
        return state.User;
    }
}

export default {
    namespaced: true,
    state, 
    mutations,
    actions,
    getters
}