import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

export const CustomInput = withStyles({
  root: {
    "&": {
      backgroundColor: 'red'
    }
  }
})(Input);
