import S from './Button.style';
import {ButtonProps} from './Button.type';

const Button = ({children, themeColor = 'primary', ...props}: ButtonProps) => {
  return (
    <S.Button {...props} themeColor={themeColor}>
      <S.Text themeColor={themeColor}>{children}</S.Text>
    </S.Button>
  );
};

export default Button;
