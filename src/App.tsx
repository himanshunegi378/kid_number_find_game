import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { quizMenu } from './services/QuizMenu';
import { QuestionView } from "./views/question/Question.view";


function App() {
  const [currentQuizObectId, setCurrentQuizObjectId] = React.useState<any>(null);
  const history = useHistory();
  const handleMenuItemSelect = (menuItemId: string) => {
    setCurrentQuizObjectId(menuItemId);
    history.push('/quiz')
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Menu menuList={quizMenu.map(({ quizObject, ...data }) => data)} onItemSelect={handleMenuItemSelect} />
        </Route>
        <Route path="/quiz" >
          <QuestionView quizObject={quizMenu.find(menuItem => menuItem.id === currentQuizObectId)?.quizObject} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
