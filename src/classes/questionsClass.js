const SECONDS_PER_QUESTIONS = 10

import quizClass from "./quizClass"

class questionsClass extends quizClass {
    constructor({ 
        // numOfQuestionsSet, 
        // categorySet, 
        // difficultySet, 
        // optionsTypeSet, 
        // isTimed,
        // curQuestion,
        questionNumber,
        question_H1,
        optionsContainer,
        timer,
        next,
        submit,
        prev
    } = {}) {
        // super(numOfQuestionsSet, categorySet, difficultySet, optionsTypeSet, isTimed, curQuestion)
    
        this.answers = [];
        this.curQuestionIndex = 0;
        this.questionNumber = document.getElementById(questionNumber)
        this.question_H1 = document.getElementById(question_H1)
        this.timer = document.getElementById(timer)
        this.optionsContainer = document.getElementById(optionsContainer)
        this.next = document.getElementById(next)
        this.prev = document.getElementById(prev)
        this.submit = document.getElementById(submit)
    }

    getQuestionsFromApi() {
        super.getQuestionsFromApi()
    }

    getQuestionsFromApiGenerated() {
        super.getQuestionsFromApiGenerated()
    }

    shuffleOptions() {
        super.shuffleOptions()
    }

    beginQuiz() {
        this.time = this.numOfQuestionsSet * SECONDS_PER_QUESTIONS
        this.timeInMill = this.time * 1000
        if(this.isTimed === true) {
            this.timer = setTimeout(() => this.endQuiz(), this.timeInMill)
            this.interval = setInterval(() => this.setTimer(), 1000)
        }
        this.loadQuestions()
    }

    loadQuestions() {
        console.log(this.curQuestion)
        this.questionNumber = this.questionNumber
        this.questionNumber.textContent = this.curQuestionIndex + 1;
        this.questionH1.textContent = this.curQuestion.question.replace(/&quot;/g,'"').replace(/&#039;/g, "'")
        let options = ''
        this.curQuestion.options.forEach((i) => {
            const isSelected = this.curQuestion.selectedAnswer === i
            options += `<div class="option">   
                            <input type="radio" id="${i}" name="answer" value="${i}" onchange="chosenAnswer(event)" class=${isSelected ? "checked-answer" : "unchecked-answer"} />
                            <label for="${i}" class="adjustLabel">${i}</label>
                        </div>`
        })
        this.optionsContainer.innerHTML = options;
        const selectedOptionElement = document.querySelector(".checked-answer")
        if(selectedOptionElement){
            selectedOptionElement.setAttribute(
                "checked" , true
            )
        }

        if(this.isTimed === '') {
            this.timerEl.classList.add('display')
        }else {
            this.setTimer(false)
        }
    }

    setTimer(reduceTime = true) {
        if(reduceTime) this.time -= 1
        let minutes = Math.floor(this.time / (60));
        let seconds = this.time > 60 ? this.time % 60 : this.time
        if(minutes.toString().length === 1) minutes = minutes.toString().padStart(2, 0)
        if(seconds.toString().length === 1) seconds = seconds.toString().padStart(2, 0)
        this.timerEl.innerHTML = `${minutes}:${seconds}`
    }

    handleNextQuestion() {
        this.nextBtn.setAttribute("disabled", true);
        if(this.curQuestionIndex >= this.numOfQuestionsSet) return
        this.prevBtn.removeAttribute("disabled");
        this.curQuestionIndex++
        this.curQuestion = this.questions[this.curQuestionIndex]
        this.loadQuestions()
        if(this.questions[this.curQuestionIndex].selectedAnswer !== "" && this.questions[this.curQuestionIndex] !== this.questions[this.questions.length - 1]) {
            this.nextBtn.removeAttribute("disabled")
        }
        console.log(this.questions[this.curQuestionIndex])
        console.log(+this.questions.length)
    }

    handlePrevQuestion() {
        if(!this.curQuestionIndex) {
            this.prevBtn.setAttribute("disabled", true);
            return
        }
        this.nextBtn.removeAttribute("disabled");
        this.curQuestionIndex--
        this.curQuestion = this.questions[this.curQuestionIndex]
        this.firstQuestion = this.questions[0]
        console.log(this.firstQuestion)
        if(this.curQuestion === this.firstQuestion) this.prevBtn.setAttribute("disabled", true)
        this.loadQuestions()
    }

    endQuiz() {
        this.correctAnswers = this.answers.filter(ans => Boolean(ans)).length
        this.wrongAnswers = this.numOfQuestionsSet - this.correctAnswers
        this.quizSection.classList.add('display');
        this.correctScore.textContent = this.correctAnswers;
        this.wrongScore.textContent = this.wrongAnswers;
        this.totalScore.textContent = this.numOfQuestions;
        this.quizSummaryPage.classList.remove('display');
        if(this.timer) {
            clearTimeout(this.timer);
            clearInterval(this.interval);
        }
    }
}

export default questionsClass