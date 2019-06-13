import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      
          login : "Login",
          signin : "Sign into your account",
          username : "Username",
          password :"Password",
          forgotpassword : "Forgot Password?"
      
    }),
 
    new MLanguage('portuguese').create({
        
            login : "Entrar",
            signin : "Faça login em sua conta",
            username : "Nome de usuário",
            password :"Senha",
            forgotpassword : "Esqueceu a senha?"
        
    })
  ]
})