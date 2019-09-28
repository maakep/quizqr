import * as React from 'react';
import styles, * as style from '../styles';
import Quiz from './quiz';
import { BrowserQRCodeReader } from '@zxing/library';
import { DeviceAndScanner } from '../../types';


const TEAM_NAME = 'TEAM_NAME';
const QUIZ = 'QUIZ_NAME';

interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
};

export interface IQuiz {
  name: string;
  questions: IQuestion[];
};

interface IProps {

};

interface IState {
  error: string;
  team: string;
  teamInput: string;
  quiz: IQuiz;
  quizInput: string;
}

export default class extends React.PureComponent<{}, IState> {
  constructor(props: {}) {
    super(props);

    const quiz = JSON.parse(localStorage.getItem(QUIZ)) || undefined;
    const team = localStorage.getItem(TEAM_NAME) || '';

    this.state = {
      error: '',
      team: team,
      teamInput: '',
      quiz: quiz,
      quizInput: '',
    };
  }

  inputWithButton = (placeholder: string, submit: () => void, onChange: (text: string) => void) => {
    return (
      <div style={style.center}>
        <input
          key={placeholder}
          autoFocus
          style={style.input}
          type="text"
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
        />
        <button style={style.button} onClick={() => submit()}>Go</button>
      </div>
    );
  }

  do(ms: number, func: () => void): void {
    setTimeout(func, ms)
  }

  selectTeam = () => {
    const submit = () => {
      const input = this.state.teamInput;
      if (input.length > 3) {
        localStorage.setItem(TEAM_NAME, input);
        this.setState({ team: input });
      }
      else {
        this.setState({ error: 'Minimum 4 characters' });
      }
    }

    return (
      <>
        {this.inputWithButton("Enter your team name", submit, (input) => this.setState({ teamInput: input }))}
        <div style={styles(style.center, style.error, style.text)}>
          {this.state.error}
        </div>
      </>
    );
  };

  selectQuiz = () => {

    const submit = async () => {
      // const res = await fetch(`/Quiz/${this.state.quizInput}`);
      // const json: IQuiz = await res.json();
      // if (json.success)...
      const mockedJson: IQuiz = {
        name: 'test quiz',
        questions: [{
          question: 'What is 1+1?',
          answers: ['Pizza'],
          correctAnswer: 0,
        },
        {
          question: 'What is the best food?',
          answers: ['Taco', 'Pizza', '3'],
          correctAnswer: 1,
        }],
      }
      localStorage.setItem(QUIZ, JSON.stringify(mockedJson));
      this.setState({ quiz: mockedJson });
    }

    return this.inputWithButton("Enter Quiz name", submit, (input) => this.setState({ quizInput: input }));
  }
  render() {
    if (this.state.team === '') return this.selectTeam();
    else if (!this.state.quiz) return this.selectQuiz();
    else return <Quiz team={this.state.team} quiz={this.state.quiz} />;

  }

}