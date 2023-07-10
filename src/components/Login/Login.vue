<template>
    <jumbotron-slot>
        <h3>Login to your Account</h3>
        <form @submit.prevent="login">
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
                <button class="login_btn"><span>Login</span></button>
                <p>Don't have an Account yet? <router-link class="link_active" to='/signup'>Signup</router-link></p>
            </div>
        </form>
    </jumbotron-slot>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            email: "",
            password: "",
            userType: "",
            success_msg: "Successfully logged in to the system",
            usersArr: null,
            userData: null,
            adminData: null,
            adminArr: null
        }
    },
    computed: {
        UsersArr() {
            return this.$store.getters["users/allUsers"]
        }, 
        
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
        async login() {
           
            this.userData = this.usersArr.find(item => {
                return item.email === this.email && item.password === this.password
            });

            this.adminData = this.adminArr.find(item => {
                return item.email === this.email && item.password === this.password
            });

            if(this.userData && this.userType === 'user'){
                try {
                    await this.$store.dispatch('auth/login', {
                        email: this.email,
                        password: this.password,
                        displayName: this.userType
                    })


                    this.$store.getters["users/allUsers"];
                    this.$router.replace({ name: "users" });
                } catch {err =>
                    console.log(err.message)               
                }
                return
            }else if (this.adminData && this.userType === 'admin') {
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
            }else {
                alert("Invalid details - check the email or password entered and make sure it is correct!!")
                return
            }
            
        }
    },

    // updated() {
    //     console.log(this.$store.dispatch('auth/signup'))
    // },
}
</script>