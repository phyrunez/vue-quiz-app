<template>
    <div class="nav_head">
        <div class="logo_class">
            <img src="../assets/Quiz-Logo-Transparent-Background.png" alt="quiz logo" />
            <h3>VueQuiz</h3>
        </div>
        <div class="dropdown">
            <h3>
                Welcome <b-dropdown variant="warning">
                    <div class="dropdown_div">
                        <b-dropdown-item><router-link to="/login">Logout</router-link></b-dropdown-item>
                    </div>
                </b-dropdown>
            </h3>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            display: false
        }
    },
}
</script>

<style scoped>
.nav_head {
    background: #0c7988;
    display: flex;
    padding: 25px 40px 10px;
    margin: -8px -14px 0 -19px;
    justify-content: space-between;
    color: white;
    height: 80px;
}
h3 {
    font-size: 20px;
    margin-top: 5px;
}
.bic {
    cursor: pointer
}
.logo_class { display: flex; }
img {
    width: 70px;
    height: 70px;
    margin-top: -15px;
    background: transparent;
}
a {
    text-decoration: none;
    color: black;
    margin-right: 30px;
}
</style>