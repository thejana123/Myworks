export const login=(name)=>{
    return{
    type:'change',
    payload:name
}
}

export const addItem=(item)=>{
    return{
        type:'add',
        payload:item
    }
}

export const user=(name)=>{
    return{
        type:'new',
        payload:name
    }
}