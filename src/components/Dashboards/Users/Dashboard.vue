<template>
    <div class="all">
        <the-header></the-header>
        <div class="row">
            <div>
                <button type="button" class="btn btn-info navbar-btn p-3 m-3">
                    <i class="glyphicon glyphicon-align-left"></i>
                    <span>Users Dashboard</span>
                </button>
                
            </div>
            <all-quiz></all-quiz>
            <router-view></router-view>
            
        </div>
    </div>
</template>

<script>
import TheHeader from '../../../UI/TheHeader'
import AllQuiz from "./usersDashboardComponents/AllQuiz"

export default {
    components: {
        'the-header': TheHeader,
        'all-quiz': AllQuiz,
    },
    data() {
        return {
            state: true
        }
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
    button {
        cursor: default;
    }
</style>