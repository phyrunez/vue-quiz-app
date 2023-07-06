import axios from "axios"

class quizClass {
	constructor({
		numOfQuestionsSet,
		categorySet,
		difficultySet,
		optionsTypeSet,
		isTimed,
	} = {}) {
		this.numOfQuestionsSet = numOfQuestionsSet > 20 ? 20 : numOfQuestionsSet;
		this.isTimed = isTimed;
		this.categorySet = categorySet;
		this.difficultySet = difficultySet;
		this.optionsTypeSet = optionsTypeSet;
		
	}

	async getQuestionsFromApiGenerated(url) {

		try {
			const response = await axios.get(url)

			const transformedResp = response?.data?.results.map((item) => {
				const options = this.shuffleOptions([
					...item.incorrect_answers,
					item.correct_answer,
				]);
				return { ...item, options, selectedAnswer: "" };
			});

			this.questions = transformedResp;
			return this.questions;

		}catch(err) {
			console.log(err.message)
		}

	}

	shuffleOptions(options) {
		for (let i = options.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = options[i];
			options[i] = options[j];
			options[j] = temp;
		}
		return options;
	}
}

export default quizClass;
