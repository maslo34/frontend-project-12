import FormAuthorization from '../../components/form';

import './login.css';

const Login = () => {
  
  return (
    <div className="conteiner">
      <div className='card'>
        <div className='card-body'>
          <div className="img_login_form"></div>
          <FormAuthorization />
        </div>
        <div className='card-footer'></div>
      </div>
    </div>
  );
};

export default Login;
