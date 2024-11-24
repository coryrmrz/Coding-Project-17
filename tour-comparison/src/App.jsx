import React from "react"; //Import react library
import Gallery from "./Gallery"; //Import Gallery component
import './App.css'; //Import app css for styling

function App() { //Defining App component
    return ( //return header and Gallery component HTML
        <div>
            <h1>The Tour Comparison App</h1>
            <Gallery />
        </div>
    );
}

export default App; //export App as default component