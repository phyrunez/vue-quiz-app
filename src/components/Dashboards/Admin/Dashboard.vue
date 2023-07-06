<template>
    <div class="all">
        <the-header></the-header>
        <div class="row">
            <!-- <div>
                <b-icon class="icon_class" v-b-toggle.sidebar-border icon="text-right" aria-hidden="true"></b-icon>
                <b-sidebar id="sidebar-border" sidebar-class="border-right bg-dark text-white display-block w-80">
                    <sidebar :dcq="displayCreateQuiz"></sidebar>
                </b-sidebar>
            </div> -->
            <div>
                <button type="button" @click="handleClick" class="btn btn-info navbar-btn p-3 m-3">
                    <i class="glyphicon glyphicon-align-left"></i>
                    <span> Toggle Admin Dashboard</span>
                </button>
            </div>
            <div v-if="show" ref="content">
                <sidebar :dcq="displayCreateQuiz"></sidebar>
            </div>
            
            <all-quiz></all-quiz>           
        </div>
    </div>
</template>

<script>
import TheHeader from '../../../UI/TheHeader'
import { ref, nextTick } from "vue"
import Sidebar from "./adminDashboardComponents/Sidebar.vue"
import AllQuiz from "./adminDashboardComponents/AllQuiz"

export default {
    components: {
        'the-header': TheHeader,
        'sidebar': Sidebar,
        'all-quiz': AllQuiz,
    },
    props: ["name"],
    data() {
        return {
            state: true,
            show: ref(false),
            content: ref()
        }
    },

    methods: {
        handleClick() {
            this.show = !this.show
            nextTick(() => {
                console.log(show.value, content.value)
            })
        }
    },

    computed: {
        displayCreateQuiz(){
            return "/dashboard/admin/create-quiz"
        },
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