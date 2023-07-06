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
        }, 

    },
    created() {
       
    }, 

    methods: {
        login() {
            try {
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                    displayName: this.userType
                })

                
                if(this.userType === 'user') {
                    this.$store.getters["users/allUsers"];
                   
                    this.$router.replace({ name: "users" });
                }

                if(this.userType === 'admin') {
                    // this.$store.getters("admin/allAdmin")
                    
                    this.$router.push("dashboard/admin");
                }
            }catch {err => 
                console.log(err)
                alert(err.message)
            }
        }
    },
}
</script>