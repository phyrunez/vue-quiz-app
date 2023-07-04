const state = {
    allUsers: [],
    userAuthState: false
}

const mutations = {
    
    setAuthentication(state, status) {
        state.userAuthState = status;
    },

    async newUsers(state, payload) {
        
        await fetch("https://vue-quiz-app-1c64b-default-rtdb.firebaseio.com/quiz-users.json", {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                userType: payload.userType
            })
        })
        .catch(err => {
            const showError = err.message + " - Please check the url and try again"
            console.log(showError)
        })

        state.allUsers.push(payload)

        // context.commit('newUsers', {
        //     ...payload,
        // }) 
    },

    async allUsers(state) {
        await fetch("https://vue-quiz-app-1c64b-default-rtdb.firebaseio.com/quiz-users.json")
        .then((resp) => {
            const data = resp.json()
            return data
        })
        .then(data => {
            console.log(data)
            state.allUsers.push(data)
        })
        .catch(err => {
            const showError = err.message + " - Please check the url and try again"
            console.log(showError)
        })

        // commit('allUsers') 
    }
}

const actions = {
   newUsers(context, payload) {
        context.commit("newUsers", payload)
        // state.email = payload.email;
        // state.password = payload.password;
        // state.userType = payload.userType;
    },
    allUsers(context, data) {
        context.commit('allUsers', data)
        // state.allUsers.push(payload)
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