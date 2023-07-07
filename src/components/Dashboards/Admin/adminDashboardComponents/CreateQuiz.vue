<template>
    <div class="all">
        <the-header></the-header>
        <div class="row">
            <div>
                <button type="button" id="toggle" @click="handleClick" class="btn btn-info navbar-btn p-3 m-3">
                    <i class="glyphicon glyphicon-align-left"></i>
                    <span> View All Quiz Session</span>
                </button>
            </div>
           
            <main class="container-full" id="welcome">
                <div class="imgPart">
                        <h1>Set Session for the Quiz App</h1>
                        <img src="../../../../assets/quiz.jpg" alt="quiz_img">
                </div>
                <div class="textPart">
                    <h4>Kindly select your questions preference to get started!!!</h4>
                    <div class="question_selector">
                            <label for="cars">Number of questions</label><br>
                            <select name="" id="num_selector" v-model="questionSet">
                                <option v-for="opt in selectedQuestionOption" :value="opt">{{ opt }}</option>
                            </select><br>

                            <label for="cars">Category</label><br>
                            <select name="" id="category_selector" v-model="categorySet">
                                <option v-for="opt in selectedCategoryOption" :value="opt.id">{{ opt.name }}</option>
                               
                            </select><br>

                            <label for="cars">Difficulty</label><br>
                            <select name="" id="difficulty_selector" v-model="difficultySet">
                                <option v-for="opt in selectedDifficultyOption" :value="opt">{{ opt.charAt(0).toUpperCase() + opt.slice(1)  }}</option>
                            </select><br>

                            <label for="cars">Options Type</label><br>
                            <select name="" id="option-type_selector" v-model="optionsTypeSet">
                                <option v-for="opt in selectedOptionType" :value="opt">{{ opt.charAt(0).toUpperCase() + opt.slice(1) }}</option>
                            </select>
                    </div>
                    <div class="textPart_input">
                            <input type="checkbox" v-model="isTimed" name="is-timed" id="is-timed">
                            <label for="is-timed" class="selector-label">Time Quiz</label>
                    </div>
                    <button class="btn_submit" @click="createQuizSession" id="start_quiz">{{ btnState }}</button>
                </div>       
            </main>
        </div>
    </div>
</template>

<script>
import TheHeader from '../../../../UI/TheHeader.vue'
import Sidebar from "./Sidebar"
import { ref, nextTick } from "vue"
import quizClass from "../../../../classes/quizClass"

export default {
    components: {
        'the-header': TheHeader,
        'sidebar': Sidebar,
    },
    props: ["name"],
    data() {
        return {
            state: true,
            CATEGORY_URL: "",
            DIFF_OPT_URL: "",
            API_URL: process.env.VUE_APP_API_URL,
            selectedCategoryOption: null,
            selectedDifficultyOption: null,
            selectedOptionType: null,
            selectedQuestionOption: [],
            quizSession: [],
            questionSet: "",
            categorySet: "",
            difficultySet: "",
            optionsTypeSet: "",
            isTimed: false,
            id: 1,
            url: "",
            btnState: "Create Quiz",
           
        }
    },
    methods: {
        createQuizSession: async function() {
            
            this.btnState = "Creating..."

            try {
                const url =  `${this.API_URL}?amount=${this.questionSet}&category=${this.categorySet}&difficulty=${this.difficultySet.toLowerCase()}&type=${this.optionsTypeSet.toLowerCase()}`
                console.log(url)
                const questions = await this.quiz.getQuestionsFromApiGenerated(url)
                
                this.btnState = "Create Quiz"

                if (!questions.length) return alert('The Question combination you set is unavailable, please select another one') 
                console.log(this.selectedCategoryOption)

                let sessions = localStorage.getItem('Quiz Session')
                if (sessions) sessions = JSON.parse(sessions)
                else sessions = []
                if (!Array.isArray(sessions)) sessions = []

                this.url = url

                let GeneratedAPI = {
                    id: sessions.length + 1,
                    num_of_questions: this.questionSet,
                    category:  this.categorySet, 
                    category_name: this.selectedCategoryOption.find(item => item.id === this.categorySet)?.name,
                    difficulty: this.difficultySet,
                    options_type: this.optionsTypeSet,
                    isTimed: this.isTimed,
                    url: this.url
                }
                
                sessions.push(GeneratedAPI)
                localStorage.setItem('Quiz Session', JSON.stringify(sessions))
                window.alert("Session created successfully")
            }catch(err) {
                this.btnState = "Create Quiz"
                console.log(err.message)
            }

        }, 

        handleClick() {
            window.location.assign("../admin")
        }

    },
    computed: {

        handleQuizQuestion() {
            let selectOption = "";
            const length = 20;
            let counter = 0
            while (counter < length) {
                selectOption = `${counter + 1}`;
                counter++;
                this.selectedQuestionOption.push(selectOption);
            }
            
            console.log(this.selectedQuestionOption)
        },

        handleQuizCategory: async function() {
            try {
                const res = await fetch(`${this.CATEGORY_URL}`)
                const data = await res.json()
                let selectCategoryOption = data?.trivia_categories.map(item => { return item })
                this.selectedCategoryOption = selectCategoryOption
                console.log(this.selectedCategoryOption)
                this.categorySet = this.selectedCategoryOption.find(item => item.id === item)?.name
                console.log(this.categorySet)
            } catch (err) {
                console.log(err)
            }
        },

        handleQuizDifficulty: async function() {
            try {
                let selectDifficultyOption = ""
                const res = await fetch(`${this.DIFF_OPT_URL}`)
                const data = await res.json()
                selectDifficultyOption = data?.results.map(item => item.difficulty)
                let newArray = selectDifficultyOption.filter((item, index) => selectDifficultyOption.indexOf(item) === index)
                let htmlDiffOption = newArray.map((item) => { return item })
                this.selectedDifficultyOption = htmlDiffOption
            } catch (err) {
                console.log(err)
            }
        },

        handleQuizOptionType: async function() {
            try {
                let selectOptionType = ""
                const res = await fetch(`${this.DIFF_OPT_URL}`)
                const data = await res.json()
                console.log(data)
                selectOptionType = data?.results.map(item => item.type)
                let newArray = selectOptionType.filter((item, index) => selectOptionType.indexOf(item) === index)
                let htmlDiffOption = newArray.map((item) => { return item })
                
                this.selectedOptionType = htmlDiffOption
               
            } catch (err) {
                console.log(err)
            }
        },
    },
    watch: {
        categorySet(cat) {
            console.log(cat)
        },
       
    },

    created() {
        this.CATEGORY_URL = process.env.VUE_APP_CATEGORY_URL,
        this.DIFF_OPT_URL = process.env.VUE_APP_DIFF_OPT_URL

        this.handleQuizCategory
        this.handleQuizDifficulty
        this.handleQuizOptionType
        this.handleQuizQuestion
    },

    mounted() {
        
    },
    updated() {
        this.quiz = new quizClass({
            numOfQuestionsSet: this.questionSet,
            categorySet: this.categorySet,
            difficultySet: this.difficultySet,
            optionsTypeSet: this.optionsTypeSet,
            isTimed: this.isTimed
        })

        console.log(this.quiz)
    }
}
</script>

<style scoped>

.all {
    margin: 0;
    padding: 0;
}
.btn-width {
    width: 200px;
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

.container-full {
    margin: 0 auto;
    width: 100%;
    display: flex;
    margin: 8rem 0;
    height: 60.5rem;
    justify-content: center;
}
.imgPart {
    background-color: #fbdb89;
    border-radius: 10px 0 0 10px;
    width: 32rem;
    margin-left: -15px;
    box-shadow: 0 2rem 6rem 0.5rem rgba(black, 0.2);
}

.imgPart h1 {
    width: 300px;
    text-align: center;
    font-size: 40px;
    letter-spacing: 2px;
    margin: 0 auto;
    margin-top: 30px;
}

.imgPart img {
    margin-top: 128px;
    width: 100%;
    height: 50%;
    border-radius: 0 0 0 10px;
}

.textPart { 
    text-align: center; 
    border-radius: 0 10px 10px 0;
    width: 48rem;
    background-color: #f38e82;
    margin-right: -20px;
}

.textPart h4 {
    width: 350px;
    margin: 30px auto;
    font-size: 20px;
    color: white;
    font-weight: bold;
}

.question_selector {
    margin-top: 20px;
}
.question_selector select {
    width: 31rem;
    margin-bottom: 20px;
    padding: 15px;
    outline: none;
    border: transparent;
    appearance: none;
    font-size: 15px;
    border-radius: 10px 0;
}
.question_selector label {
    float: left;
    margin: 0 0 0 100px;
    font-size: 16.5px;
}

.selector-label { font-size: 15px; }
.btn_submit {
    margin-top: 20px;
    padding: 12px;
    width: 130px;
    font-size: 17px;
    border-color: transparent;
    color: white;
    background: green;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}

@media screen and (max-width: 836px) {
    .imgPart {
        display: none;
    }
    .container-full {
        width: 100%;
    }
}

@media screen and (max-width: 466px) {
    .question_selector label {
        float: left;
        margin: 0 0 0 100px;
    }
}
</style>