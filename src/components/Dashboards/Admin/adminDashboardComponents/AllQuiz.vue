<template>
    <div>
        <div class="container">
            <div class="row row_div">
                <div class="users col-lg-4">
                    <p>Application Users</p>
                    <span>{{ allUsers }}</span>
                </div>
                <div class="session col-lg-4">
                    <p>Available Quiz Session</p>
                    <span>{{ session.length }}</span>
                </div>
                <div class="admin col-lg-4">
                    <p>Current Admin</p>
                    <span>{{ currentAdmin }}</span>
                </div>
            </div>
        </div>
        <div class="summary_class">
            <div>
                <h2>Available Quiz Sessions</h2>
            </div>
            <div class="summary_table container table-reponsive">
                <table class="table table-striped table-dark">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">serial no.</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Number of Questions</th>
                            <th scope="col">Options Type</th>
                            <th scope="col">Question Category</th>
                            <th scope="col">Session</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sess in session" :key="sess">
                            <th scope="row">{{ sess.id}}</th>
                            <td>{{ sess.difficulty }}</td>
                            <td>{{ sess.num_of_questions }}</td>
                            <td>{{ sess.options_type }}</td>
                            <td>{{ sess.category_name }}</td>
                            <td v-if="sess.isTimed === true">
                                <div :class="{ 'tag_class_timed': timed }">Timed</div>
                            </td>
                            <td v-else-if="sess.isTimed === false">
                                <div :class="{ 'tag_class_untimed': timed }">Untimed</div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>    
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {   
            session: null,
            timed: true,
            currentAdmin: "",
            // allUsers: "",
        }
    },
    computed: {
        
    },
    
    mounted() {
        let currentAdmin = localStorage.getItem('CurrentAdmin')
    
        this.currentAdmin = currentAdmin

        let session = JSON.parse(localStorage.getItem('Quiz Session'))
        this.session = session

        console.log(this.$store.getters['users/allAdmin'])
        // let chaii = this.$store.getters['users/allUsers']
        // let newArr = chaii.map(item => { console.log(Object.values(item)) })
        
        // this.allUsers = newArr.length + 1
        
    }
}
</script>

<style scoped>
.users{
    border: grey;
    background: #08c355;
    height: 11rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
}
.session{
    border: grey;
    background: #ff6666;
    height: 11rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
}
.admin{
    border: grey;
    background: #ff7f60;
    height: 11rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
}
.users p, .session p, .admin p {
    font-size: 20px;
    padding-top: 10px
}
.users span, .session span, .admin span { 
    float: right; 
    padding-top: 30px;
    font-size: 20px;
    font-weight: bold;
}

h2 {
    text-align: center;
    margin: 4rem 0;
}

.table { font-size: 15px; }

thead { background: black !important; }
.tag_class_timed {
    background: #ff7f60;
    width: 56%;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
}
.tag_class_untimed {
    background: #a1c621;
    width: 56%;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
}

.row_div {
    width: 100%;
    text-align: center;
    margin: 7rem auto;
    padding: 0 8px;
}

@media screen and (max-width: 1200px) {
    .table {
        font-size: 10px;
    }
}

@media screen and (max-width: 990px) {
    .tag_class_untimed, .tag_class_timed {
        width: 90%;
    }
}


@media screen and (max-width: 883px) {
    .tag_class_untimed, .tag_class_timed {
        width: 100%;
    }
}

</style>