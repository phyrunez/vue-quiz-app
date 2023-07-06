<template>
    <div class="nav_head">
        <div class="logo_class">
            <img src="../assets/Quiz-Logo-Transparent-Background.png" alt="quiz logo" />
            <h3>VueQuiz</h3>
        </div>
        <div class="dropdown">
            <button class="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown">Welcome
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><router-link to="/login">Logout</router-link></li>
            </ul>
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
.dropdown button {
    font-size: 15px;
}
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
@media screen and (max-width: 281px) {
    .nav_head {
        width: 100%;
    }
}
</style>