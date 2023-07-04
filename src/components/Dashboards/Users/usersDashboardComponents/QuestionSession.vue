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

            <div class="summary_class" :id="quizSection">
                <div class="quiz_section_header">
                    <div class="section_question">
                        Question: <span class="question_number" :id="questionNumber">{{ curQuestionIndex }}</span>
                    </div>
                    <div class="section_timer" id="timer">
                        {{ output_time }}
                    </div>
                </div>
                <div class="question_background">
                    <div id="question_body" class="question">
                        <h1 class="question_h1" id="question_H1">{{ question }}</h1>
                    </div>
                    <section class="options" id="optionsContainer">
                        <div class="option" id="option" v-for="selOpt in options" :key="selOpt" @click="handleSelectedAnswer">   
                            <input type="radio" :id="selOpt" name="answer" :checked="selOpt === answer" :value="selOpt" v-model="answer" @change="handleSelectedAnswer(selOpt)" />
                            <label :for="selOpt" class="adjustLabel">{{ selOpt }}</label>
                        </div>
                    </section>  
                </div>
                <div class="trigger_btns">
                    <div class="prev_btn"><button type="button" @click="prevQuestion()" id="prev" :disabled="btnIsPrevDisabled">Prev</button></div>
                    <div class="submit_btn"><button type="button" id="submit" :disabled="btnIsSubmitDisabled" @click="handleSubmit()">Submit</button></div>
                    <div class="next_btn"><button type="button" @click="nextQuestion()" id="next" :disabled="btnIsNextDisabled">Next</button></div>
                </div>

                
                <result-modal v-if="displayResult">
                
                    <main ref="targetRef" class="settings" id="quizSummary">
                        <h3 class="summary_h1">Results</h3>
                        <table class="summaryTable">
                            <tbody>
                                <tr>
                                    <td class="textSuccess"><b>Correct score</b></td>
                                    <td class="textSuccess" id="correct_score">{{ correct }}</td>
                                </tr>
                                <tr>
                                    <td class="textDanger"><b>Wrong score</b></td>
                                    <td class="textDanger" id="wrong_score">{{ wrong }}</td>
                                </tr>
                                <tr>
                                    <td class="total_score"><b>Total</b></td>
                                    <td class="total_score"><b id="total_score">{{ total }}</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="summaryBtns">
                                <button class="btnWelcome  mt-2" id="welcome_page"><router-link to="/login">Quiz Ended</router-link></button>
                        </div>
                    </main>
                </result-modal>
                
            </div>
        </div>
    </div>
</template>

<script>
import ResultModal from "../../../../slots/ResultModal.vue"
import quizClass from "../../../../classes/quizClass"
import TheHeader from "../../../../UI/TheHeader.vue"
import Sidebar from "./Sidebar.vue"
import duration from 'human-duration'

export default {
    components: {
        "the-header": TheHeader,
        "sidebar": Sidebar,
        "result-modal": ResultModal
    },
    data() {
        return {
            questionNumber: "questionNumber",
            questions: [],
            question: "",
            output_time: "",
            time: 0,
            timer: 0,
            next: "next",
            submit: "submit",
            prev: "prev",
            quizSection: "quizSection",
            option: '',
            loadingState: 'Fetching Questions...',
            SECONDS_PER_QUESTIONS: 10,
            state: true,
            noOfQuestion: 0,
            curQuestionIndex: 0,
            categorySet: '',
            handleOptionChange: '',
            answers: [],
            correct: '',
            wrong: '',
            total: '',
            answer: '',
            difficultySet: '',
            optionsTypeSet: '',
            currentQuestionObject: {},
            displayResult: false,
            options: [],
            isTimed: '',
            btnIsNextDisabled: true,
            btnIsSubmitDisabled: true,
            btnIsPrevDisabled: true,
            interval: null,
        }
    },
    methods: {
        handleSubmit() {
            clearInterval(this.interval)
            
            this.displayResult = true
            
            this.endQuiz
        },

        handleSelectedAnswer(answer) {
            if (typeof answer !== 'string') return;
            this.answer = answer
            this.questions[this.curQuestionIndex - 1].selectedAnswer = answer

            this.answers[this.curQuestionIndex - 1] = answer.toLowerCase() === this.questions[this.curQuestionIndex - 1].correct_answer.toLowerCase()
            console.log(this.answers)

            const isLastQuestion = this.curQuestionIndex === this.questions.length
            if (!isLastQuestion) {
                this.btnIsNextDisabled = false;
            } else {
                this.btnIsSubmitDisabled = false;
            }
        },

        setTimer(reduceTime = true) {
            if (this.time <= 0) { 
                clearInterval(this.interval)
                this.endQuiz
                return 
            }
            let minutes = Math.floor(this.time / (60));
            let seconds = this.time > 60 ? this.time % 60 : this.time
            
            if (minutes.toString().length === 1) minutes = minutes.toString().padStart(2, 0)
            if (seconds.toString().length === 1) seconds = seconds.toString().padStart(2, 0)
            this.output_time = `${minutes}:${seconds}`
        },

        nextQuestion() {
            this.curQuestionIndex++
        },

         prevQuestion() {
            this.curQuestionIndex--
        },

        renderQuestion() { 
            this.currentQuestion = this.questions[this.curQuestionIndex - 1]
            this.options = this.currentQuestion.options

            this.question = this.currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            this.answer = this.currentQuestion.selectedAnswer

            this.btnIsNextDisabled = true;
            this.btnIsPrevDisabled = true;
            if (this.curQuestionIndex !== 1) this.btnIsPrevDisabled = false;
            if (this.answer) this.btnIsNextDisabled = false
            
        },

        triggerTimer() { 
            this.time = this.time - 1
        }
       
    },
    computed: {
        
        endQuiz() {
            let correctAnswers = this.answers.filter(ans => Boolean(ans)).length
            let wrongAnswers = this.questions.length - correctAnswers
            this.correct = correctAnswers;
            this.wrong = wrongAnswers;
            this.total = this.questions.length;  
        }
        
    },
    watch: {
        curQuestionIndex() {
            this.renderQuestion()
        },
        time() { 
            this.setTimer()
        }
    },
    created() {

    },
    
    async mounted() {
        
        const sessions = JSON.parse(localStorage.getItem('Quiz Session'))
        const id = +this.$route.params.id

        const session = sessions.find(session => session.id === id)

        if (!session) return;
        this.isTimed = session.isTimed

        this.quiz = new quizClass({
            numOfQuestionsSet: this.questionSet,
            categorySet: this.categorySet,
            difficultySet: this.difficultySet,
            optionsTypeSet: this.optionsTypeSet,
            isTimed: this.isTimed,
        })
        const url = session.url
        this.questions = await this.quiz.getQuestionsFromApiGenerated(`${url}`)

        this.curQuestionIndex = 1

        if (!this.isTimed) return;
        const secondsPerQuestion = 1.5 * 60

        this.time = Number(this.questions.length * secondsPerQuestion)
        this.interval = setInterval(() => { 
            this.triggerTimer()
        }, 1000)
    },
    
    beforeDestroy() {
        localStorage.removeItem('Options')
        this.curQuestionIndex = 1
        clearInterval(this.interval)
    }
    
}

</script>

<style scoped>
.display { display: none; }
.load_q { 
    text-align: center;
    font-size: 30px;
    margin: 0 30rem;
    width: 30rem 
}
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

.summary_class {
    width: 70rem;
    margin: -1rem 25rem 0;
    height: 40rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

#quiz_section{
    margin: 10vw auto;
    background-color: #fbdb89;
    max-width: 49rem;
    height: 39rem;
    border-radius: 10px;
    box-shadow: 0 2rem 6rem 0.5rem rgba(#615551, 0.2);
}

.quiz_section_header {
   display: flex;
   justify-content: space-between !important;
   width: 68rem;
   padding-bottom: 15px;
}

.section_question {
    background: #f38e82;
    margin: 25px 0 0 30px;
    border-radius: 45px;
    padding: 20px;
    font-size: 20px;
    width: 11rem;
}

.question_number {
    background: white;
    border-radius: 50%;
    padding: 5px 10px;
    height: 10px;
}

.section_timer {
    background: #f38e82;
    font-size: 20px;
    margin: 25px 30px 0 0;
    width: 7rem;
    border-radius: 45px;
    padding: 20px;
    letter-spacing: 5px;
}

.question_background {
    background: #A67B5B;
    height: 27rem;
    width: 70rem;
    margin-top: 16px;
    margin-left: -12px;
    padding-top: 10px;
}

.question h1{
    text-align: center;
    color: white;
    padding: 0 2px 10px 2px;
    font-size: 30px;
    font-weight: bold;
    margin-top: 25px;
}

.options {
    float: left;
    margin-left: 20px; 
    /* margin-top: 20px; */
    padding: 30px 0;
}

.option {
    font-weight: bold;
    font-size: 18px; 
    width: 100%;
    padding: 20px 0;
}

.option input {
    padding: 0px;
    cursor: pointer;
}

.adjustLabel { cursor: pointer }

.trigger_btns {
    display: flex;
    justify-content: space-between;
    /* width: 45rem; */
    width: 63rem;
    margin: 20px 0 0 40px;
}

.prev_btn button, .next_btn button {
    padding: 9px;
    width: 100px;
    font-size: 17px;
    border-color: transparent;
    color: white;
    background: blue;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}

#quizSummary {
    text-align: center;
    background-color: #fbdb89;
    width: 40rem;
    margin: 15rem 35rem 10px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);   
}

#quizSummary h3 {
    font-size: 40px;
    padding-top: 40px
}

table tr td { width: 100rem; }
.textSuccess { 
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 10px;
    color: green; 
}

.textDanger { 
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 10px;
    color: red; 
}

.total_score {
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 10px;
}

.summaryBtns {
    padding-top: 60px;
}

.btnRestart {
    padding: 9px;
    width: 130px;
    font-size: 17px;
    border-color: transparent;
    color: white;
    background: #A67B5B;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}

.btnWelcome {
    padding: 9px;
    width: 160px;
    font-size: 17px;
    margin-left: 15px;
    border-color: transparent;
    color: white;
    background: #f38e82;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}
.btnWelcome a {
    text-decoration: none;
    color: white;
    cursor: pointer;
    font-size: 17px;
}

.submit_btn button {
    padding: 9px;
    width: 300px;
    font-size: 17px;
    border-color: transparent;
    color: white;
    background: green;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}
button:disabled,
button[disabled] {
    border-color: transparent;
    opacity: .5;
    background-color: rgb(117, 113, 113);
    color: white;
    padding: 9px;
    cursor: not-allowed;
}

input[type="radio"]:checked {
    color: red
}
</style>