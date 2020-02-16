import React from 'react';
import Button from '@material-ui/core/Button';

export default class CustomButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {isToggleOn: true};
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
     this.setState(state => ({
       isToggleOn: !state.isToggleOn
     }));
  }
  render() {
    return (
      <Button
        variant="outlined"
        onClick={this.handleClick}
      >
        {this.state.isToggleOn ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    );
  }
}