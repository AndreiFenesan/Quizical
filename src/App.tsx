import React from 'react';
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import {QuestionModel} from "./questionModel";
function App() : JSX.Element {
    const [isGameRunning, setIsGameRunning] =React.useState<boolean>(false);
    const [questionModels,setQuestionModels] = React.useState<QuestionModel[]>([])

    function startButtonClickHandler() {
        setIsGameRunning(true);
    }

    React.useEffect(() => {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then(response => response.json())
                .then(data => setQuestionModels(getArrayOfQuestionModels(data)))
        }
    ,[])

    function getAllAnswersArray (correctAnswer:string, incorrectAnswers: string[]):string[]{
        //return an array with all answers where the correct answer is randomly inserted.
        let answers = [...incorrectAnswers];
        //insert the correct answer randomly in the answers array
        const randomPosition = Math.floor(Math.random() * 4) ;//get the random position in the array
        answers.splice(randomPosition,0,correctAnswer);
        return answers;
    }

    function getArrayOfQuestionModels(data:any):QuestionModel[] {
        const arrObj = data.results;
        let resultArray:QuestionModel[]=[];
        for(let i=0;i<arrObj.length;i++){
            const obj:QuestionModel ={
                questionId:i,
                question:arrObj[i].question,
                correctAnswer:arrObj[i].correct_answer,
                allAnswers:getAllAnswersArray(arrObj[i].correct_answer,arrObj[i].incorrect_answers),
            }
            resultArray.push(obj);
        }
        return resultArray;

    }

  return (
    <div className="App">
        {isGameRunning ? <GameScreen allQuestions={questionModels}/> : <StartScreen startButtonClickHandler={startButtonClickHandler}/>}
    </div>
  );
}

export default App;
