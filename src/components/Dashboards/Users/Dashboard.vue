<template>
    <div class="all">
        <the-header></the-header>
        <div class="row">
            <div>
                <b-icon class="icon_class" v-b-toggle.sidebar-border icon="text-right" aria-hidden="true"></b-icon>
                <b-sidebar id="sidebar-border" sidebar-class="border-right bg-dark text-white display-block w-80">
                    <sidebar></sidebar>
                </b-sidebar>
            </div>
            <all-quiz></all-quiz>
            <router-view></router-view>
            
        </div>
    </div>
</template>

<script>
import TheHeader from '../../../UI/TheHeader'
import Sidebar from "./markup/Sidebar.vue"
import AllQuiz from "./markup/AllQuiz"

export default {
    components: {
        'the-header': TheHeader,
        'sidebar': Sidebar,
        'all-quiz': AllQuiz,
    },
    data() {
        return {
            state: true
        }
    },
    computed: {
        displayComponent(){}
    },
}
</script>

<style scoped>
    .all { 
        margin: 0;
        padding: 0;
    }
    .icon_class {
        font-size: 40px;
        cursor: pointer;
        margin: 30px 0 0 30px;
    }
    .sidebar-class {
        margin-top: 30rem !important;
        background: black !important;
    }
</style>