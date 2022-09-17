import React from 'react';
import StartScreen from "./Start Screen/StartScreen";
import GameScreen from "./Game Screen/GameScreen";
import {QuestionModel} from "./Question/questionModel";
function App() : JSX.Element {
    const [isGameRunning, setIsGameRunning] = React.useState<boolean>(false);
    const [questionModels,setQuestionModels] = React.useState<QuestionModel[]>([]);
    const [currentGameNumber,setCurrentGameNumber] = React.useState<number>(1);
    const [difficulty,setDifficulty] = React.useState("Easy");

    function startButtonClickHandler() {
        setIsGameRunning(true);
    }
    function difficultyMenuOnchange(value:string):void {
        setDifficulty(value);
    }

    React.useEffect(() => {

            function getArrayOfQuestionModels(data:any):QuestionModel[] {
                //extracts the question model from the data
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
            fetch(`https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${difficulty.toLowerCase()}`)
                .then(response => response.json())
                .then(data => getArrayOfQuestionModels(data))
                .then(question => setQuestionModels(question))
        }
    ,[currentGameNumber,difficulty]);

    function newGameHandler() {
        setCurrentGameNumber(lastGameNumber => lastGameNumber + 1);
        setIsGameRunning(false);
    }

    function getAllAnswersArray (correctAnswer:string, incorrectAnswers: string[]):string[]{
        //return an array with all answers where the correct answer is randomly inserted.
        let answers = [...incorrectAnswers];
        //insert the correct answer randomly in the answers array
        const randomPosition = Math.floor(Math.random() * 4) ;//get the random position in the array
        answers.splice(randomPosition,0,correctAnswer);
        return answers;
    }

  return (
    <div className="App">
        {isGameRunning
            ? <GameScreen allQuestions={questionModels} newGameHandler={newGameHandler}/>
            : <StartScreen difficulty={difficulty}  selectOnChange={difficultyMenuOnchange} startButtonClickHandler={startButtonClickHandler}/>
        }
    </div>
  );
}

export default App;
