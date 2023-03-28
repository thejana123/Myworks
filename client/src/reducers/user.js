var user='';
const User=(state=user,action)=>{

    const username=action.payload;
    switch(action.type){
        case 'new':
            return user=username;
        case 'delete':
                    user=''
                    break
        default:
            return user;
    }

}

export default User;