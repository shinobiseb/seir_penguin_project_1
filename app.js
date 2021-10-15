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
            if(state.player1 === 5) {
                $(".modal1").css("display", "flex")
                $("#overlay").css("display", "flex")
            }
            state.which = !state.which
        }
        else {
            state.player2++
            if (state.player2 === 5) {
                {
                $(".modal2").css("display", "flex")
                $("#overlay").css("display", "flex")
            }
            }
            else{
            state.which = !state.which
            }
        }
        setBoard(questions)
    }
    else {
        setBoard(questions)
        state.which = !state.which
    }
    if (state.which === true) {
        $("#turn").text("Player 1's Turn")
    }
    else {
        $("#turn").text("Player 2's Turn")
    }
}

const setBoard = (q) => {

//     const questionsArray = []
//     // have we asked this question already?
// if(questionsArray.includes(questionName)) {
//   // If so, stop the function here.
//   return
// }
// else {
//   // If we haven't asked it before we'll add it to the array to keep track of question we have asked, and continue on as normal
//   questionsArray.push(questionName)
// }

    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q.splice(randomIndex, 1)[0]
    // console.log(randomQuestion)
    // const randomQuestion = q[randomIndex]
    // const questionToAsk = questionsArray.splice(randomNumberBasedOnQuestionArrayLength, 1);
   
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
