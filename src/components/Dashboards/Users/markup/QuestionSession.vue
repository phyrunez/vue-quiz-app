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
                        Question: <span class="question_number" :id="questionNumber">{{ curQuestionIndex + 1}}</span>
                    </div>
                    <div class="section_timer" id="timer">
                        <!-- 05:22 -->
                        {{ output_time }}
                    </div>
                </div>
                <div class="question_background">
                    <div id="question_body" class="question">
                        <h1 class="question_h1" id="question_H1">{{ question_H1 }}</h1>
                    </div>
                    <section class="options" id="optionsContainer">
                        <div class="option" id="option" v-for="selOpt in selectedOption" :key="selOpt" @click="handleSelectedAnswer">   
                            <input type="radio" :id="selOpt" name="answer" checked :value="selOpt" v-model="handleOptionChange" @change="handleSelectedAnswer(selOpt)" />
                            <label :for="selOpt" class="adjustLabel">{{ selOpt }}</label>
                        </div>
                    </section>  
                </div>
                <div class="trigger_btns">
                    <div class="prev_btn"><button type="button" @click="prevQuestion()" id="prev" :disabled="btnIsPrevDisabled">Prev</button></div>
                    <div class="submit_btn"><button type="button" id="submit" :disabled="btnIsSubmitDisabled" @click="handleSubmit()">Submit</button></div>
                    <div class="next_btn"><button type="button" @click="nextQuestion()" id="next" :disabled="btnIsNextDisabled">Next</button></div>
                </div>

                <main ref="targetRef" class="settings display" id="quizSummary">
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
                            <button class="btnWelcome w-100 mt-2" id="welcome_page" onclick="welcomePage()">Welcome Page</button>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import questionsClass from "@/classes/questionsClass"
import quizClass from "../../../../classes/quizClass"
import TheHeader from "../../../../UI/TheHeader.vue"
import Sidebar from "./Sidebar.vue"

export default {
    components: {
        "the-header": TheHeader,
        "sidebar": Sidebar
    },
    data() {
        return {
            questionNumber: "questionNumber",
            question_H1: "",
            timer: "timer",
            output_time: "",
            time: '',
            next: "next",
            submit: "submit",
            prev: "prev",
            quizSection: "quizSection",
            option: '',
            loadingState: 'Fetching Questions...',
            SECONDS_PER_QUESTIONS: 10,
            state: true,
            questionSet: '',
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
            currentQuestionObject: null,
            selectedOption: null,
            isTimed: '',
            btnIsNextDisabled: true,
            btnIsSubmitDisabled: true,
            btnIsPrevDisabled: true
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.targetRef.scrollIntoView({ behavior: 'smooth'})
            this.quiz.endQuiz()
        },

        handleSelectedAnswer(answer){
            if(typeof answer === 'string') {
                this.selectedAnswer(answer)
            }
        },

        selectedAnswer(answer) {
            this.answer = answer
            console.log(this.answer)
            
            this.currentQuestionObject.questions[this.curQuestionIndex].selectedAnswer = this.answer
            console.log(this.currentQuestionObject.questions)

            this.answers[this.curQuestionIndex] = this.answer.toLowerCase() === this.currentQuestionObject.questions[this.curQuestionIndex].correct_answer.toLowerCase()
            console.log(this.answers)
            if (this.currentQuestionObject.questions.length > 1 && this.currentQuestionObject.questions.length !== this.answers.length) {
                this.btnIsNextDisabled = false;
            }
            console.log(this.currentQuestionObject.questions.length, this.answers.length)
            if (this.currentQuestionObject.questions.length === this.answers.length) {
                this.btnIsSubmitDisabled = false;
            }
            console.log(this.currentQuestionObject.questions[this.curQuestionIndex], this.answer)
        },

        setTimer(reduceTime = true) {
            this.time = Number(this.currentQuestionObject.questions.length * this.SECONDS_PER_QUESTIONS)
            console.log(this.time)
            if (reduceTime) this.time = this.time -  1
            console.log(this.time)
            let minutes = Math.floor(this.time / (60));
            let seconds = this.time > 60 ? this.time % 60 : this.time
            if (minutes.toString().length === 1) minutes = minutes.toString().padStart(2, 0)
            if (seconds.toString().length === 1) seconds = seconds.toString().padStart(2, 0)
            this.output_time = `${minutes}:${seconds}`
        },

        nextQuestion() {

            this.btnIsNextDisabled = false;
            if (this.curQuestionIndex >= this.questionSet) return

            this.btnIsPrevDisabled = false;
            this.curQuestionIndex++
            // alert(this.curQuestionIndex)
            console.log(this.currentQuestionObject.currentQuestion)
            this.currentQuestionObject.currentQuestion = this.currentQuestionObject.questions[this.curQuestionIndex]
            this.question_H1 = this.currentQuestionObject.currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            this.selectedOption = this.currentQuestionObject.currentQuestion.options
            this.btnIsNextDisabled = true;


            if (this.currentQuestionObject.questions[this.curQuestionIndex].selectedAnswer !== "" && this.currentQuestionObject.questions[this.curQuestionIndex] !== this.currentQuestionObject.questions[this.currentQuestionObject.questions.length + 1]) {
                this.btnIsNextDisabled = true;
                console.log(this.answers)
            }
            this.answer = this.currentQuestionObject.questions[this.curQuestionIndex].selectedAnswer

            console.log(this.currentQuestionObject.questions[this.curQuestionIndex])
            console.log(+this.currentQuestionObject.questions.length)
        },

         prevQuestion() {

            if (!this.curQuestionIndex) {
                // this.btnIsPrevDisabled = false;
                return
            }
            this.btnIsNextDisabled = false;
            this.curQuestionIndex--;
            //    alert(this.curQuestionIndex)
            this.currentQuestionObject.currentQuestion = this.currentQuestionObject.questions[this.curQuestionIndex]
            let firstQuestion = this.currentQuestionObject.questions[0]

            if (this.currentQuestionObject.currentQuestion === firstQuestion) this.btnIsPrevDisabled = true;
            this.question_H1 = this.currentQuestionObject.currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            this.selectedOption = this.currentQuestionObject.currentQuestion.options
            this.answer =  this.currentQuestionObject.questions[this.curQuestionIndex].selectedAnswer
        },
       
    },
    watch: {
        handleOptionChange(item) {
            console.log(item)
            console.log(this.selectedOption)
            console.log(this.handleOptionChange)
        },
        
    },

    computed: {
        beginQuiz() {
            console.log(this.questionSet)
            const timer = document.getElementById("timer")
            let time = Number(this.currentQuestionObject.questions.length * this.SECONDS_PER_QUESTIONS)
            console.log(time)
            this.timeInMill = time * 1000
            if (this.isTimed === true) {
                this.output_time = setTimeout(() => this.quiz.endQuiz(), this.timeInMill)
                this.interval = setInterval(() => this.setTimer(), 1000)
            }
            // this.loadQuestions()
            if (this.isTimed === true) {
                timer.classList.add('display')
            } else {
                this.setTimer(false)
            }
        },

        // nextQuestion() {
            
        //     this.btnIsNextDisabled = false;
        //     if (this.curQuestionIndex >= this.questionSet) return

        //     this.btnIsPrevDisabled = false;
        //     this.curQuestionIndex++
        //     // alert(this.curQuestionIndex)
        //     console.log(this.currentQuestionObject.currentQuestion)
        //     this.currentQuestionObject.currentQuestion = this.currentQuestionObject.questions[this.curQuestionIndex]
        //     this.question_H1 = this.currentQuestionObject.currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
        //     this.selectedOption = this.currentQuestionObject.currentQuestion.options
        //     this.btnIsNextDisabled = true;
            

        //     if (this.currentQuestionObject.questions[this.curQuestionIndex].selectedAnswer !== "" && this.currentQuestionObject.questions[this.curQuestionIndex] !== this.currentQuestionObject.questions[this.currentQuestionObject.questions.length + 1]) {
        //         this.btnIsNextDisabled = true;
        //         console.log(this.answers)
        //     }
        //     console.log(this.currentQuestionObject.questions[this.curQuestionIndex])
        //     console.log(+this.currentQuestionObject.questions.length)
        // },

        // prevQuestion() {
            
        //     if (!this.curQuestionIndex) {
        //         // this.btnIsPrevDisabled = false;
        //         return
        //     }
        //     this.btnIsNextDisabled = false;
        //     this.curQuestionIndex--;
        // //    alert(this.curQuestionIndex)
        //     this.currentQuestionObject.currentQuestion = this.currentQuestionObject.questions[this.curQuestionIndex]
        //     let firstQuestion = this.currentQuestionObject.questions[0]
           
        //     if (this.currentQuestionObject.currentQuestion === firstQuestion) this.btnIsPrevDisabled = true;
        //     this.question_H1 = this.currentQuestionObject.currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
        //     this.selectedOption = this.currentQuestionObject.currentQuestion.options
        // },

        endQuiz() {
            let correctAnswers = this.answers.filter(ans => Boolean(ans)).length
            let wrongAnswers = this.currentQuestionObject.questions.length - correctAnswers   
            this.correct = correctAnswers;
            this.wrong = wrongAnswers;
            this.total = this.currentQuestionObject.questions.length;    
        }
        
    },

    // watch: {
    //     selectedOption(options) {
    //         console.log(options)
    //     }
    // },

    created() {
        console.log(this.answer)

        console.log(this.$route.params.id)
    },
    
    async mounted() {
        
        let session = JSON.parse(localStorage.getItem('Quiz Session'))
        this.session = session
        console.log(this.session)

        const id = +this.$route.params.id
        for (var i = 0, len = this.session.length; i < len; i++) {
            if (this.session[i].id === id) {
                console.log(this.session[i]);
                let heyii = this.session[i]

                this.questionSet = heyii.num_of_questions
                this.categorySet = heyii.category
                this.difficultySet = heyii.difficulty
                this.optionsTypeSet = heyii.options_type
                this.isTimed = heyii.isTimed

                this.quiz = new quizClass({
                    numOfQuestionsSet: this.questionSet,
                    categorySet: this.categorySet,
                    difficultySet: this.difficultySet,
                    optionsTypeSet: this.optionsTypeSet,
                    isTimed: this.isTimed,
                    // questionNumber: this.questionNumber,
                    // timer: this.timer,
                    // question_H1: this.question_H1,
                    // optionsContainer: this.optionsContainer,
                    // next: this.next,
                    // submit: this.submit,
                    // prev: this.prev,
                    // option: this.option
                })
               
                console.log(this.quiz)

                const url = localStorage.getItem('Current Session')
                console.log(url)
                this.currentQuestionObject = await this.quiz.getQuestionsFromApiGenerated(`${url}`)
                this.selectedOption = this.currentQuestionObject.currentQuestion.options
                console.log(this.selectedOption)
                this.question_H1 = this.currentQuestionObject.currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
                console.log(this.currentQuestionObject.currentQuestion)
                console.log(this.currentQuestionObject.questions)
               
                break;
            }

        }
        this.beginQuiz
    },
    
    beforeDestroy() {
        localStorage.removeItem('Options')
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