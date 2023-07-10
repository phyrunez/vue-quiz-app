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
import axios from "axios"

export default {
    data() {
        return {
            email: "",
            password: "",
            userType: "",
            usersArr: null,
            adminArr: null,
            userData: null,
            adminData: null
        }
    },

    created() {
        axios.get(process.env.VUE_APP_USERS_ENDPOINT)
            .then(resp => {
                let Data = resp.data
                this.usersArr = Object.values(Data)
            })

        axios.get(process.env.VUE_APP_ADMIN_ENDPOINT)
            .then(resp => {
                let Data = resp.data
                this.adminArr = Object.values(Data)
            })
    },

    methods: {
        async signup() {

            this.userData = this.usersArr.find(item => {
                return item.email === this.email 
            });

            this.adminData = this.adminArr.find(item => {
                return item.email === this.email
            });

            if (!this.userData && this.userType === 'user') {
                try {
                    await this.$store.dispatch('auth/signup', {
                        email: this.email,
                        password: this.password,
                        displayName: this.userType
                    })


                    this.$store.getters["users/allUsers"];
                    this.$router.replace({ name: "users" });
                } catch {
                    err =>
                    console.log(err.message)
                }
                return
            } else if (!this.adminData && this.userType === 'admin') {
                try {
                    await this.$store.dispatch('auth/login', {
                        email: this.email,
                        password: this.password,
                        displayName: this.userType
                    })


                    this.$store.getters["admin/AllAdmin"];
                    this.$router.replace({ name: "admin" });

                } catch {
                    err =>
                        console.log(err.message)
                }

                return
            } else {
                alert("Email already Exist, Please Signup with the system!!")
                return
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