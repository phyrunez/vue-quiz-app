<template>
    <div class="sidebar_div container">
        <div class="image_div">
            <img src="../../../../assets/admin.svg" />
            <p>Admin</p>
        </div>
        <hr>
        <div class="sidebar_list">
            <ul>
                <li class="active"><router-link :to="dcq">Create Quiz</router-link></li>
                <li><router-link to="/dashboard/admin">All Quiz</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ["dcq"],
    data() {
        return{}
    }
}
</script>

<style scoped>
.sidebar_div {
    background: grey
}
.image_div {
    /* background: black; */
    color: white;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 20px 0;
    border: 3px solid grey;
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
    width: 100%;
}
.sidebar_list ul li {
    padding: 20px 0;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    list-style: none;
    margin-left: -25px
}
.sidebar_list ul li:hover {
    background: black;
    color: white;
     width: 100%;
}
.sidebar_list ul li a {
    text-decoration: none;
    color: white;
}

@media screen and (max-width: 577px) {
    .sidebar_div {
        width: 100%;
        margin: 0 auto;
    }
}
</style>