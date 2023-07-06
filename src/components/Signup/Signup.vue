<template>
    <transition name="fade">
        <jumbotron-slot>
            <h3>Sign up for an Account</h3>
            <form @submit.prevent="signup">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control fs-4" type="email" placeholder="Enter Email" v-model="email" required />
                </div>

                <div class="form-group pt-5">
                    <label for="pwd">Password</label>
                    <input type="password" class="form-control fs-4" id="pwd" v-model="password" placeholder="Enter password" required />
                </div>

                <div class="form-group pt-5">
                    <label for="user-type">User Type</label>
                    <select name="User" class="form-control fs-4" v-model="userType">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div class="btn_wrapper">
                    <button class="signup_btn"><span>Signup</span></button>
                    <p>Already have an account? <router-link class="link_active" to='/login'>Login</router-link></p>
                </div>
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