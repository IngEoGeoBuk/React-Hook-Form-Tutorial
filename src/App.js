import React, { useRef } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

function App() {

  const { register, handleSubmit, watch, errors } = useForm();
  console.log(watch('email'))
  const password = useRef();

  // console.log(watch('email'))에서 보듯 현재 password에 들어간 값을 password.current에 넣고
  // 그걸 Password Confirm의 value로 준다
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log('data', data)

    // data들을 backend에 보낼려면
    // axios.post('/', data)  <--- 뭐 이런 식으로 보내면 되겠죠?
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Email</label>
      <input name="email" type="email" 
        ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
      />
      {errors.email && <p>This email fiels is required</p>}

      <label>Name</label>
      <input name="name" 
        ref={register({ required: true, maxLength: 10 })}
      />
      {errors.name && errors.name.type === "required" 
        && <p>This filed is required</p>}
      {errors.name && errors.name.type === "maxLength" 
        && <p>Your input exceed maxinum length 10</p>}

      <label>Password</label>
      <input name="password" type="password"
        ref={register({ required: true, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && 
        <p>This filed is required</p>}
      {errors.password && errors.password.type === "minLength" && 
        <p>Password must have at least 6 characters</p>}
      {/* type에 password라 안주면 아이디 입력하듯 비밀번호가 뭔지 노출됨 */}

      <label>Password Confirm</label>
      <input name="password_confirm" type="password"
        ref={register({ required: true, validate: (value) => 
          value === password.current
        })}
      />
      {errors.password_confirm 
        && errors.password_confirm.type === "required" 
        && <p>This filed is required</p>}
      {errors.password && errors.password.type === "validate" 
        && <p>The password do not match</p>}
      <input type="submit" />
    </form>
  );
}

export default App;
