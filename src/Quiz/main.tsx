import * as React from 'react';
import styles, * as style from '../styles';
import Quiz from './quiz';


const TEAM_NAME = 'TEAM_NAME';

export default () => {
  const [input, setInput] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [team, setTeam] = React.useState<string>(localStorage.getItem(TEAM_NAME) || '');

  const submit = () => {
    if (input.length > 3) {
      localStorage.setItem(TEAM_NAME, input);
      setTeam(input);
    }
    else {
      setError('Minimum 4 characters');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    setError('');
  }

  return team === ''
    ? (
      <>
        <div style={style.center}>
          <input
            autoFocus
            style={style.input}
            type="text"
            onChange={handleChange} />
          <button onClick={() => submit()}>Go</button>
        </div>
        <div style={styles(style.center, style.error, style.text)}>
          {error}
        </div>
      </>
    )
    : (
      <Quiz
        team={team}
      />
    );
}
