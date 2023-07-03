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

        <!-- <div v-for="user in UsersArr" :key="user">
            <span>{{ user.email }}</span>
        </div> -->
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
                    alert(this.success_msg)
                    this.$router.push("dashboard/users")
                }else {
                    alert(this.success_msg)
                    this.$router.push("dashboard/admin")
                }
            }catch {err => 
                console.log(err.message)
            }

            // if (this.userType === 'user') {
            //     this.$store.dispatch('users/newUsers', {
            //         email: this.email,
            //         password: this.password,
            //         userType: this.userType
            //     })

            //     alert(this.success_msg)
            //     this.$router.push("dashboard/users")
            // }

            // if (this.userType === 'admin') {
            //     this.$store.dispatch('admin/newAdmin', {
            //         email: this.email,
            //         password: this.password,
            //         userType: this.userType
            //     })

            //     alert(this.success_msg)
            //     this.$router.push("dashboard/users")
            // }
        }
    },
    mounted() {
        console.log(this.$store.dispatch('users/allUsers'))
        console.log(this.$store.getters['users/allUsers'])
    }
}
</script>