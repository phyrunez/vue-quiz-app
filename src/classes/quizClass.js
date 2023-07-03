const API_URL = 'https://opentdb.com/api.php'

const SECONDS_PER_QUESTIONS = 10

class quizClass {

    constructor({ 
        numOfQuestionsSet, 
        categorySet, 
        difficultySet, 
        optionsTypeSet, 
        isTimed ,
        questionNumber,
        question_H1,
        optionsContainer,
        timer,
        option,
        next,
        submit,
        prev
    } = {}) {
        this.numOfQuestionsSet = numOfQuestionsSet > 20 ? 20 : numOfQuestionsSet
        this.isTimed = isTimed
        this.categorySet = categorySet
        this.difficultySet = difficultySet
        this.optionsTypeSet = optionsTypeSet
        this.curQuestionIndex = 0;
        this.answers = [];
        this.curQuestionIndex = 0;
        this.questionNumber = document.getElementById(questionNumber)
        this.question_H1 = document.getElementById(question_H1)
        this.timer = document.getElementById(timer)
        this.optionsContainer = document.getElementById(optionsContainer)
        this.nextBtn = document.getElementById(next)
        this.prevBtn = document.getElementById(prev)
        this.submitBtn = document.getElementById(submit)
        this.option = option
    }

    getQuestionsFromApiGenerated(url) {
        return new Promise((resolve, reject) => {
            // fetch(`${API_URL}?amount=${this.numOfQuestionsSet}&category=${this.categorySet}&difficulty=${this.difficultySet}&type=${this.optionsTypeSet}`)
            fetch(url)
            .then(resp => {
                const data = resp.json()
                return data
            })
            .then(data => {
                console.log(data?.results)
                const transformedResp = data?.results.map((item) => {
                    const options = this.shuffleOptions([...item.incorrect_answers, item.correct_answer])
                    return {...item, options, selectedAnswer: "" }
                })
                this.questions = transformedResp
                console.log(this.questions)

                this.curQuestion = this.questions[this.curQuestionIndex]
                console.log(this.curQuestion)

                localStorage.setItem('UserChoice', JSON.stringify(data?.results))
                // return resolve([this.curQuestion])
                return resolve({ currentQuestion: this.curQuestion, questions: this.questions })
                //let options = []
                //this.curQuestion.options.forEach((i) => {
                    // const isSelected = curQuestion.selectedAnswer === i
                    //options.push(i)
                    //this.option = options
                    //localStorage.setItem('Options', JSON.stringify(options))
                //})
                // resolve({})
                // localStorage.setItem('UserChoice', JSON.stringify(data?.results))
                // this.loadQuestions(this.curQuestion, this.questions)
                
            })
            .catch(err => {
                reject({})
                console.log(err.message)
            })
        })
    }

    getQuestionsFromApi() {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}?amount=${this.numOfQuestionsSet}&category=${this.categorySet}&difficulty=${this.difficultySet}&type=${this.optionsTypeSet}`)
            .then(resp => {
                const data = resp.json()
                return data
            })
            .then(data => {
                console.log(data?.results)
                const transformedResp = data?.results.map((item) => {
                    const options = this.shuffleOptions([...item.incorrect_answers, item.correct_answer])
                    return {...item, options, selectedAnswer: "" }
                })
                this.questions = transformedResp
                console.log(this.questions)
                this.curQuestion = this.questions[this.curQuestionIndex]
                console.log(this.curQuestion)
                resolve({})
                localStorage.setItem('UserChoice', JSON.stringify(data?.results))
                
            })
            .catch(err => {
                reject({})
                console.log(err.message)
            })
        })
    }

    // beginQuiz() {
    //     console.log(this.numOfQuestionsSet)
    //     this.time = Number(this.numOfQuestionsSet * SECONDS_PER_QUESTIONS)
    //     console.log(this.time)
    //     this.timeInMill = this.time * 1000
    //     if(this.isTimed === true) {
    //         this.timer = setTimeout(() => this.endQuiz(), this.timeInMill)
    //         this.interval = setInterval(() => this.setTimer(), 1000)
    //     }
    //     // this.loadQuestions()
    //     if(this.isTimed === false) {
    //         this.timer.classList.add('display')
    //     }else {
    //         this.setTimer(false)
    //     }
    // }

    loadQuestions(curQuestion, questions) {
        // console.log(questions)
        // this.questionNumber = this.questionNumber
        // console.log(this.questionNumber)
        // this.questionNumber.textContent = this.curQuestionIndex + 1;
        // this.question_H1.textContent = curQuestion.question.replace(/&quot;/g,'"').replace(/&#039;/g, "'")
        // // let options = []
        // // curQuestion.options.forEach((i) => {
        // //     // const isSelected = curQuestion.selectedAnswer === i
        // //     options.push(i)
        // //     localStorage.setItem('Options', JSON.stringify(options))
        // // })
        // let options = ''
        // curQuestion.options.forEach((i) => {
        //     // const isSelected = curQuestion.selectedAnswer === i
        //     // options.push(i)
        //     // localStorage.setItem('Answer', JSON.stringify(options))

        //     const isSelected = curQuestion.selectedAnswer === i
        //     options += `<div class="option">   
        //                     <input type="radio" id="${i}" name="answer" value="${i}" class=${isSelected ? "checked-answer" : "unchecked-answer"} />
        //                     <label for="${i}" class="adjustLabel">${i}</label>
        //                 </div>`
        // })
        // console.log(this.optionsContainer)
        // this.optionsContainer.innerHTML = options;
        // // console.log(this.optionsContainer.innerHTML)
        // // const selectedOptionElement = document.querySelector(".checked-answer")
        // // if(selectedOptionElement){
        // //     selectedOptionElement.setAttribute(
        // //         "checked" , true
        // //     )
        // // }

        //     // `<div class="option">   
        //     //                 <input type="radio" id="${i}" name="answer" :value="${i}" v-bind:checked="selectedOption === '${i}'" @change="handleOptionChange(${i})" :class='radioChecked' />
        //     //                 <label for="${i}" class="adjustLabel">${i}</label>
        //     //             </div>`

        //  // <input type="radio" id="${i}" name="answer" value="${i}" v-model="answer" :checked="checked" class='${isSelected ? "checked-answer" : "unchecked-answer"}' />

        // if(this.isTimed === false) {
        //     this.timer.classList.add('display')
        // }else {
        //     this.setTimer(false)
        // }
    }

    shuffleOptions(options) {
        for (let i = options.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = options[i]
            options[i] = options[j]
            options[j] = temp
          }
        return options;
    }

    

    // handlePrevQuestion() {
    //     if(!this.curQuestionIndex) {
    //         this.prevBtn.setAttribute("disabled", true);
    //         return
    //     }
    //     this.nextBtn.removeAttribute("disabled");
    //     this.curQuestionIndex--
    //     this.curQuestion = this.questions[this.curQuestionIndex]
    //     this.firstQuestion = this.questions[0]
    //     console.log(this.firstQuestion)
    //     if(this.curQuestion === this.firstQuestion) this.prevBtn.setAttribute("disabled", true)
    //     this.loadQuestions(this.curQuestion, this.questions)
    //     let options = []
    //     this.curQuestion.options.forEach((i) => {
    //         // const isSelected = curQuestion.selectedAnswer === i
    //         options.push(i)
    //         localStorage.setItem('Options', JSON.stringify(options))
    //     })
    // }

    // selectedAnswer(answer) {
    //     console.log(answer)
    //     this.questions[this.curQuestionIndex].selectedAnswer = answer
    //     console.log(this.questions)
    //     console.log(this.nextBtn)
    //     this.answers[this.curQuestionIndex] = answer.toLowerCase() === this.questions[this.curQuestionIndex].correct_answer.toLowerCase()
    //     if (this.numOfQuestionsSet > 1 && this.numOfQuestionsSet !== this.answers.length) {
    //         this.nextBtn.removeAttribute("disabled")
    //     }
    //     if(this.numOfQuestionsSet === this.answers.length) {
    //         this.submitBtn.removeAttribute("disabled")
    //     }
    //     console.log(this.questions[this.curQuestionIndex], answer)
    // }


    // endQuiz() {
    //     this.correctAnswers = this.answers.filter(ans => Boolean(ans)).length
    //     this.wrongAnswers = this.numOfQuestionsSet - this.correctAnswers
    //     this.quizSection.classList.add('display');
    //     this.correctScore.textContent = this.correctAnswers;
    //     this.wrongScore.textContent = this.wrongAnswers;
    //     this.totalScore.textContent = this.numOfQuestions;
    //     this.quizSummaryPage.classList.remove('display');
    //     if(this.timer) {
    //         clearTimeout(this.timer);
    //         clearInterval(this.interval);
    //     }
    // }
}

export default quizClass