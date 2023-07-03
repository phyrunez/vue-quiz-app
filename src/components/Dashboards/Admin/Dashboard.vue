<template>
    <div class="all">
        <the-header></the-header>
        <div class="row">
            <div>
                <b-icon class="icon_class" v-b-toggle.sidebar-border icon="text-right" aria-hidden="true"></b-icon>
                <b-sidebar id="sidebar-border" sidebar-class="border-right bg-dark text-white display-block w-80">
                    <sidebar :dcq="displayCreateQuiz"></sidebar>
                </b-sidebar>
            </div>
            <all-quiz></all-quiz>
            <!-- <create-quiz></create-quiz> -->
        </div>
    </div>
</template>

<script>
import TheHeader from '../../../UI/TheHeader'
import Sidebar from "./markup/Sidebar"
import AllQuiz from "./markup/AllQuiz"

export default {
    components: {
        'the-header': TheHeader,
        'sidebar': Sidebar,
        'all-quiz': AllQuiz,
    },
    props: ["name"],
    data() {
        return {
            state: true
        }
    },
    computed: {
        displayCreateQuiz(){
            return "/dashboard/admin/create-quiz"
        }
    }
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
        margin-top: 50rem !important;
        background: black !important;
    }
</style>