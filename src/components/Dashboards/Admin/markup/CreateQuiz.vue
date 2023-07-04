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
            <main class="container" id="welcome">
                <div class="imgPart">
                        <h1>Set Session for the Quiz App</h1>
                        <img src="../../../../assets/quiz.jpg" alt="quiz_img">
                </div>
                <div class="textPart">
                    <h4>Kindly select your questions preference to get started!!!</h4>
                    <div class="question_selector">
                            <select name="" id="num_selector" v-model="questionSet">
                                <option v-for="opt in selectedQuestionOption" :value="opt" label="1">{{ opt }}</option>
                            </select>
                            <select name="" id="category_selector" v-model="categorySet" @change="categorySet">
                                <option v-for="opt in selectedCategoryOption" :value="opt.id" label="Politics">{{ opt.name }}</option>
                               
                            </select>
                            <select name="" id="difficulty_selector" v-model="difficultySet">
                                <option v-for="opt in selectedDifficultyOption" :value="opt" label="medium">{{ opt }}</option>
                            </select>
                            <select name="" id="option-type_selector" v-model="optionsTypeSet">
                                <option v-for="opt in selectedOptionType" :value="opt" label="multiple">{{ opt }}</option>
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
import quizClass from "../../../../classes/quizClass"

export default {
    components: {
        'the-header': TheHeader,
        'sidebar': Sidebar,
    },
    data() {
        return {
            state: true,
            CATEGORY_URL: "https://opentdb.com/api_category.php",
            DIFF_OPT_URL: "https://opentdb.com/api.php?amount=20",
            API_URL: 'https://opentdb.com/api.php',
            selectedCategoryOption: null,
            selectedDifficultyOption: null,
            selectedOptionType: null,
            selectedQuestionOption: [],
            quizSession: [],
            questionSet: '1',
            categorySet: 'General Knowledge',
            difficultySet: 'medium',
            optionsTypeSet: 'multiple',
            isTimed: false,
            id: 1,
            btnState: "Create Quiz",
        }
    },
    methods: {
        createQuizSession: async function() {
            
            this.btnState = "Creating..."

            try {
                const url =  `https://opentdb.com/api.php?amount=${this.questionSet}&category=${this.categorySet}&difficulty=${this.difficultySet}&type=${this.optionsTypeSet}`
                const questions = await this.quiz.getQuestionsFromApiGenerated(url)
                this.btnState = "Create Quiz"

                if (!questions.length) return alert('The Question combination you set is unavailable, please select another one') 
                console.log(this.selectedCategoryOption)
                let sessions = localStorage.getItem('Quiz Session')
                if (sessions) sessions = JSON.parse(sessions)
                else sessions = []
                if (!Array.isArray(sessions)) sessions = []

                let GeneratedAPI = {
                    id: sessions.length + 1,
                    num_of_questions: this.questionSet,
                    category:  this.categorySet, 
                    category_name: this.selectedCategoryOption.find(item => item.id === this.categorySet)?.name,
                    difficulty: this.difficultySet,
                    options_type: this.optionsTypeSet,
                    isTimed: this.isTimed,
                    url
                }
                
                sessions.push(GeneratedAPI)
                localStorage.setItem('Quiz Session', JSON.stringify(sessions))
                window.alert("Session created successfully")
            }catch(err) {
                this.btnState = "Create Quiz"
                console.log(err.message)
            }
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
        },

        handleQuizCategory: async function() {
            try {
                const res = await fetch(`${this.CATEGORY_URL}`)
                const data = await res.json()
                let selectCategoryOption = data?.trivia_categories.map(item => { return item })
                this.selectedCategoryOption = selectCategoryOption
                this.categorySet = this.selectedCategoryOption.find(item => item.id === this.categorySet)?.name
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
    mounted() {
        this.handleQuizCategory
        this.handleQuizDifficulty
        this.handleQuizOptionType
        this.handleQuizQuestion
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
        console.log(this.catName)
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
#welcome {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    width: 55rem;
    margin: 10px 33rem 0;
    height: 36.5rem;
    display: flex;
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
    font-size: 50px;
    letter-spacing: 2px;
    margin: 0 auto;
    margin-top: 30px;
}

.imgPart img {
    margin-top: 84px;
    width: 100%;
    height: 50%;
    border-radius: 0 0 0 10px;
}

.textPart { 
    text-align: center; 
    border-radius: 0 10px 10px 0;
    width: 32rem;
    background-color: #f38e82;
    margin-right: -20px;
}

.textPart h4 {
    width: 350px;
    margin: 70px auto;
    font-size: 20px;
    color: white;
    font-weight: bold;
}

.question_selector select {
    width: 21rem;
    margin-bottom: 20px;
    padding: 15px;
    outline: none;
    border: transparent;
    appearance: none;
    font-size: 15px;
    border-radius: 10px 0;
}
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
</style>