import React from 'react';

const loading = props => {
    if(props.isLoading){
        return <p>Loading...</p>;
    }
    else{
        return <p></p>;
    }
}

export default loading;