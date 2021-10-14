///////////////
//App State
///////////////

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true,
}

let questions = {
    
}
///////////////
//Dom Elements
///////////////

const $question = $("#question") 
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#p1 h4")
const $p2score = $("#p2 h4")
const $reset = $("#reset")
const $img = $(".img")

/////////////////
//Functions
/////////////////
const reset = () => {
    location.reload()
}

$reset.on("click", reset)

const chooseAnswer = (event, question) => {
    if(event.target.innerText === question.answer) {
        
        if (state.which){
            
            state.player1++
            state.which = !state.which
        }
        else {
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    }
    else {
        setBoard(questions)
        state.which = !state.which
    }
}

const setBoard = (q) => {
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
    //Update Question
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)
    $img.css("background-image", "url(" + randomQuestion.backgroundUrl + ")")   

    //update player scores
    $p1score.text(state.player1)
    $p2score.text(state.player2)

    $("li").off()
    $("li").on("click", (event) => {
        chooseAnswer(event, randomQuestion)
    })
}



//////////////
//Logic
/////////////

const URL = "https://cdn.contentful.com/spaces/01lk7vxmn5n1/environments/master/entries?access_token=YUPKVBheDCKM1rqirxvdaSAwQH6SgDg-QQQGNVboCS4&content_type=triviaQP"
$.ajax(URL)
.then((data) => {
    questions = data.items.map((q) => q.fields)
    console.log(data)
    console.log(questions)
    setBoard(questions)
})
