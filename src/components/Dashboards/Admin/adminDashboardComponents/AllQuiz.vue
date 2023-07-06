<template>
    <div>
        <div class="summary_class">
            <div class="row">
                <div class="users col-4">
                    <p>Application Users</p>
                    <span>{{ allUsers }}</span>
                </div>
                <div class="session col-4">
                    <p>Available Quiz Session</p>
                    <span>{{ session.length }}</span>
                </div>
                <div class="admin col-4">
                    <p>Current Admin</p>
                    <span>{{ currentAdmin }}</span>
                </div>
            </div>
            <div>
                <h2>Available Quiz Sessions</h2>
            </div>
            <div class="summary_table">
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
.summary_class {
    width: 80rem;
    margin: 0 25rem;
}
.users{
    border: grey;
    background: #08c355;
    height: 10rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
    width: 24rem;
    margin: 0 30px 0 0;
}
.session{
    border: grey;
    background: #ff6666;
    height: 10rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
    width: 24rem;
    margin: 0 30px 0 0;
}
.admin{
    border: grey;
    background: #ff7f60;
    height: 10rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
    width: 24rem;
    margin: 0 30px 0 0;
}
.users p, .session p, .admin p {
    font-size: 20px;
    padding-top: 10px
}
.users span, .session span, .admin span { 
    float: right; 
    padding-top: 60px;
    font-size: 20px;
}

h2 {
    text-align: center;
    margin: 4rem 0;
}
.table {
    /* border: 1px solid; */
    width: 75rem;
    margin: 4rem -0.5rem 0;
}
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

</style>