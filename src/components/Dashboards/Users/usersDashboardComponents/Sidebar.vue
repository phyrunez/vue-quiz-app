<template>
    <div class="sidebar_div">
        <div class="image_div">
            <img src="../../../../assets/admin.svg" />
            <p>User</p>
        </div>
        <div class="sidebar_list">
            <ul>
                <li><router-link to="/dashboard/users">All Quiz</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{}
    }
}
</script>

<style scoped>
.image_div {
    background: white;
    color: black;
    text-align: center;
    padding: 20px 0;
}
img {
    width: 80px !important;
    height: 80px !important;
}
p {
    padding-top: 20px
}
.sidebar_list {
    margin-top: 30px;
    padding: 10px 0;
}
.sidebar_list ul li {
    padding: 20px 0;
    cursor: pointer;
    list-style: none;
    margin-left: -25px
}
.sidebar_list ul li:hover {
    background: #ff6666;
    color: white;
     width: 100%;
}
.sidebar_list ul li a {
    text-decoration: none;
    color: white;
}
</style>