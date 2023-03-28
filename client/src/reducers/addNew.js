

 var list=[];
const addItem=(state=list,action)=>{
    let item=action.payload;
    switch(action.type){
        case 'add':
            const newList=[...list,item];
            return newList;

        default:
            return list;
    }

}

export default addItem;