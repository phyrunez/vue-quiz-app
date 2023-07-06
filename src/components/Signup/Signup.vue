<template>
    <transition name="fade">
        <jumbotron-slot>
            <h3>Sign up for an Account</h3>
            <form @submit.prevent="signup">
                <label id="email" for="email">Email</label>
                <input 
                    class="email"
                    type="email" 
                    placeholder="Enter Email"
                    v-model="email"
                    required
                />

                <label id="password" for="password">Password</label>
                <input 
                    class="password"
                    type="password" 
                    placeholder="Enter Password"
                    v-model="password"
                    required
                />

                <label id="user-type" for="user-type">User Type</label>
                <select name="User" v-model="userType" class="user-type">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button class="signup_btn"><span>Sign up</span></button>
                <p>Already have an Account? <router-link class="link_active" to='/login'>Login</router-link></p>
            </form>
        </jumbotron-slot>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            userType: "",
            success_msg: "Successfully registered with the system"
        }
    },
    methods: {
        async signup() {
            try {
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password,
                    userType: this.userType
                })

            }catch{err => 
                alert(err.message)
            }

            if(this.userType === 'user') {
                 this.$store.dispatch('users/newUsers', {
                    email: this.email,
                    password: this.password,
                    userType: this.userType
                })

                this.$router.push('dashboard/users')
            }

            if (this.userType === 'admin') {
                this.$store.dispatch('admin/newAdmin', {
                    email: this.email,
                    password: this.password,
                    userType: this.userType
                })

                this.$router.push('dashboard/admin')
            }
                
        }
    },
   
    watch: {
        signup(data) {
            this.$store.getters["users/allUsers"] = data

        }
    }
}
</script>

<style scoped>
</style>