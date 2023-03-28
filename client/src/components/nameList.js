import React from 'react';

const names=(props)=>{

    console.log(props.names);
    const names=props.names;
    return(

        names.map((name)=>{
            return(
            // React.createElement("p", null,name.name),
            <p>{name.name}</p>
            )
        }
        )
        
    );

}

export default names;