const state = {
    allAdmin: []
}

const mutations = {
    async newAdmin(_, payload) {
        await fetch("https://vue-quiz-app-1c64b-default-rtdb.firebaseio.com/quiz-admin.json",{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                userType: payload.userType
            })
        })
        .catch(err => {
            const showError = err.message + " - Please check the url and try again"
            alert(showError)
        })
    },

    async allAdmin(state) {
        await fetch("https://vue-quiz-app-1c64b-default-rtdb.firebaseio.com/quiz-admin.json")
        .then(resp => {
            const data = resp.json()
            return data
        })
        .then(data => {
            state.allAdmin.push(data)
        })
        .catch(err => {
            const showError = err.message + " - Please check the url and try again"
            alert(showError)
        })
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}