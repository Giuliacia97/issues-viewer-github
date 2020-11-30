import React from 'react';
import Issues from '../components/Issues.jsx'
function App() {
  return (
    <>
    <div className="App">  
     {/*Insert here the user and repo for the homepage*/}
      <Issues  user="Giuliacia97" repo="example" />
    </div>
  </>
  );
}

export default App;
