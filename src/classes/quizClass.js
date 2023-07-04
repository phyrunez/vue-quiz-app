const API_URL = "https://opentdb.com/api.php";

const SECONDS_PER_QUESTIONS = 10;

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

	getQuestionsFromApiGenerated(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then((resp) => {
					const data = resp.json();
					return data;
				})
				.then((data) => {
					const transformedResp = data?.results.map((item) => {
						const options = this.shuffleOptions([
							...item.incorrect_answers,
							item.correct_answer,
						]);
						return { ...item, options, selectedAnswer: "" };
					});
					this.questions = transformedResp;
					return resolve(this.questions);
				})
				.catch((err) => {
					reject({});
					console.log(err.message);
				});
		});
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
