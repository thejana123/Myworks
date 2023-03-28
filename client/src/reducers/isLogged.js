const loginStatus=localStorage.getItem('loginStatus')==='true';
// const username=loginStatus ? localStorage.getItem('user'):'';

const Login=(state = loginStatus,action)=>{
   

    switch(action.payload){
        case 'logout':
            return state=false;
        case 'login':
            let log=localStorage.getItem('loginStatus')==='true';
            return state=log;
        default:
            return state;
    }
}

export default Login;