import React from 'react';

class Home extends React.Component {
    render() {
        return(
            <>
                <h1>Welcome to "Sysken Library" !!</h1>
                <button>sign up</button>
                <button>sign in</button>

                <button onClick={()=>{window.location.href = '/#/List'}}>junp to List</button>
            </>
        );
    }
}

export default Home;