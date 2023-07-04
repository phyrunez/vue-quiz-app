<template>
    <div>
        <div class="summary_class">
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
                            <th scope="col">Start Quiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sess in session" :key="sess">
                            <th scope="row">{{ sess.id }}</th>
                            <td>{{ sess.difficulty }}</td>
                            <td>{{ sess.num_of_questions }}</td>
                            <td>{{ sess.options_type }}</td>
                            <td>{{ sess.category_name }}</td>
                            <td v-if="sess.isTimed === true">
                                <div :class="{ 'tag_class_timed': timed }">Timed</div>
                            </td>
                            <td v-else-if="sess.isTimed === false">
                                <div :class="{'tag_class_untimed': timed }">Untimed</div>
                            </td>
                            <td v-if="sess.isTimed === true">
                                <button class="div_curs" :class="{ 'tag_class_timed': timed }" @click="startTimedQuiz(sess.id, sess)">Start</button>
                            </td>
                            <td v-else-if="sess.isTimed === false">
                                <button class="div_curs" :class="{ 'tag_class_untimed': timed }" @click="startUntimedQuiz(sess.id, sess)">Start</button>
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
            startedQuiz: true,
            user_choice: "",
            questionSet: '',
            categorySet: '',
            difficultySet: '',
            optionsTypeSet: '',
            isTimed: '',
        }
    },
    methods: {
        startTimedQuiz(id, sess) {
            console.log(sess.num_of_questions)
            console.log(sess.url)
            localStorage.setItem('Current Session', sess.url)

            console.log(this.$route.path + "/" + id)
            this.$router.push("users/" + id)
        },

        startUntimedQuiz(id, sess) {
            console.log(sess.num_of_questions)
            console.log(sess.url)
            localStorage.setItem('Current Session', sess.url)

            console.log(this.$route.path + "/" + id)
            this.$router.push("users/" + id)
        }
    },
    mounted() {
        let session = JSON.parse(localStorage.getItem('Quiz Session'))
        this.session = session
        console.log(this.session)
    }
}
</script>

<style scoped>
.summary_class {
    width: 80rem;
    margin: -2rem 25rem 0;
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

.div_curs { 
    cursor: pointer;
    border-color: transparent;
    color: white;
}
.session{
    border: grey;
    background: #ff6666;
    height: 10rem;
    border-radius: 10px 0 10px 0;
    color: whitesmoke;
    width: 29rem;
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
    margin-left: -30px;
}
.table {
    /* border: 1px solid; */
    width: 75rem;
    margin: 4rem -0.5rem 0;
}
thead { background: black !important; }
.tag_class_timed {
    background: #ff7f60;
    width: 66%;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
}
.tag_class_untimed {
    background: #a1c621;
    width: 66%;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
}

</style>