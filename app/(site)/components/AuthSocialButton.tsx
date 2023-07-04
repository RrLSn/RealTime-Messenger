import { IconType } from "react-icons"
import Styles from '@/app/styles/AuthForm.module.css'

interface AuthSocialButtonProps{
  icon: IconType,
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick
}) => {
  return (
    <button
    type="button"
    onClick={onClick}
    className={Styles.AuthSocialButton}>
      <Icon />
    </button>
  )
}

export default AuthSocialButton