import axios from "axios"

const url = process.env.VUE_APP_USERS_ENDPOINT

const state = {
    allUsers: [],
    userAuthState: false
}

const mutations = {
    
    setAuthentication(state, status) {
        state.userAuthState = status;
    },

    allUsers(state, data) {
        state.allUsers.push(data)
    }
}

const actions = {
    async newUsers(_, payload) {

        try {
			await axios.post(url, {
                email: payload.email,
                password: payload.password,
                userType: payload.userType
            })


		}catch(err) {
            const showError = err.message + " - Please check the url and try again"
            console.log(showError)
        }

    },

    async allUsers(context) {

        try {
			await axios.get(url)
            .then(resp => {
                const data = resp
                console.log(data)
                context.commit('allUsers', data)
            })

		}catch(err) {
            const showError = err.message + " - Please check the url and try again"
            alert(showError)
        }
    }
}

const getters = {
    allUsers(state) {
        return state.allUsers
    },
    userAuthState(state) {
        return state.userAuthState
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}