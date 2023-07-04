<template>
    <jumbotron-slot>
        <h3>Login to your Account</h3>
        <form @submit.prevent="login">
            <label id="email" for="email">Email</label>
            <input class="email" type="email" placeholder="Enter Email" v-model="email" required />

            <label id="password" for="password">Password</label>
            <input class="password" type="password" placeholder="Enter Password" v-model="password" required />

            <label id="user-type" for="user-type">User Type</label>
            <select name="User" v-model="userType" class="user-type">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button class="login_btn"><span>Login</span></button>
            <p>Don't have an Account yet? <router-link class="link_active" to='/signup'>Signup</router-link></p>
        </form>
    </jumbotron-slot>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            userType: "",
            success_msg: "Successfully logged in to the system"
        }
    },
    computed: {
        UsersArr() {
            return this.$store.getters["users/allUsers"]
        }
    },
    methods: {
        login() {
            
            try {
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                    userType: this.userType
                })

                if(this.userType === 'user') {
                    this.$store.commit("users/setAuthentication", true);
                    alert(this.success_msg)
                    this.$router.replace({ name: "users" });
                }else {
                    localStorage.setItem('CurrentAdmin', this.email)
                    this.$store.commit("admin/setAuthentication", true);
                    alert(this.success_msg)
                    this.$router.replace({ name: "admin" });
                }
            }catch {err => 
                alert(err.message)
            }

        }
    },
    
}
</script>