import axios from "axios"

const url = process.env.VUE_APP_ADMIN_ENDPOINT

const state = {
    allAdmin: [],
    adminAuthState: false
}

const mutations = {
    setAuthentication(state, status) {
        state.adminAuthState = status;
    },

    async newAdmin(_, payload) {
        
        try {
			await axios.post(url, {
                email: payload.email,
                password: payload.password,
                userType: payload.userType
            })

		}catch(err){
            const showError = err.message + " - Please check the url and try again"
            alert(showError)
        }
    },

    async allAdmin(state) {

        try {
			await axios.get(url)
            .then(resp => {
                const data = resp?.data
                state.allAdmin.push(data)
            })

		}catch(err) {
            const showError = err.message + " - Please check the url and try again"
            alert(showError)
        }
    }
}

const actions = {
    newAdmin(context, payload) {
        context.commit('newAdmin', payload)
    },
    allAdmin(context, payload) {
        context.commit('allAdmin', payload)
    }
}

const getters = {
    allAdmin(state) {
        return state.allAdmin
    },
    adminAuthState(state) {
        return state.adminAuthState
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}