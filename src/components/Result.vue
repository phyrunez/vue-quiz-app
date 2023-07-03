<template>
    <main class="settings display" id="quizSummary">
        <h3 class="summary_h1">Results</h3>
        <table class="summaryTable">
            <tbody>
                <tr>
                    <td class="textSuccess"><b>Correct score</b></td>
                    <td class="textSuccess" id="correct_score">50</td>
                </tr>
                <tr>
                    <td class="textDanger"><b>Wrong score</b></td>
                    <td class="textDanger" id="wrong_score">20</td>
                </tr>
                <tr>
                    <td class="total_score"><b>Total</b></td>
                    <td class="total_score"><b id="total_score">100</b></td>
                </tr>
            </tbody>
        </table>
        <div class="summaryBtns">
            <button class="btnWelcome w-100 mt-2" id="welcome_page" onclick="welcomePage()">Welcome Page</button>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    methods: { },
    mounted() {}
}
</script>

<style scoped>
#quizSummary {
    text-align: center;
    margin: 10vw auto;
    background-color: #fbdb89;
    max-width: 32rem;
    height: 25rem;
    border-radius: 10px;
    box-shadow: 0 2rem 6rem 0.5rem rgba(#615551, 0.2);   
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
    width: 150px;
    font-size: 17px;
    margin-left: 15px;
    border-color: transparent;
    color: white;
    background: #f38e82;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
}
</style>