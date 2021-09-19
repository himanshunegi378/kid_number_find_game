import React from 'react';
import './App.css';
import { quizMenu } from './services/QuizMenu';
import { QuestionView } from "./views/question/Question.view";


function App() {

  return (
    <div>
      <QuestionView quizObject={quizMenu[0].quizObject} />
    </div>
  );
}

export default App;
