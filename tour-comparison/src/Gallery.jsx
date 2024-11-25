import React, { useEffect, useState } from "react";
import './Gallery.css'; //Import gallery css for styling

const Gallery = () => {
    const [tourList, setTourList] = useState([]); //State to store tour data
    const [isLoading, setIsLoading] = useState(true); //State to track loading status
    const [loadError, setLoadError] = useState(""); //State to track errors that occur during fetching

    useEffect(() => { //Effect runs once when component fetches tour data
        const fetchToursData = async () => {
            try {
                const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://course-api.com/react-tours-project')); //Fetch API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch tours."); //Error message if fetching fails
                }
                const tours = await response.json();
                setTourList(tours); //Set fetched data to state
            } catch (err) {
                setLoadError(err.message); //Set error message if fetching fails
            } finally {
                setIsLoading(false); //Set loading to false once fetching is done
            }
        }; fetchToursData(); //Call function to fetch data
    }, []); //Empty array to run only once on component
    const handleRemoveTour = (tourId) => { //Filter tour with matching id to remove it from list
        setTourList(tourList.filter((tour) => tour.id !== tourId));
    };
    const handleToggleDescription = (tourId) => { //Toggle visibility of description for tour by updating state
        setTourList(tourList.map((tour) =>
            tour.id === tourId ? { ...tour, showFullDescription: !tour.showFullDescription } : tour
        ));
    };
    if (isLoading) return <p>Loading tours...</p>; //Show loading message while data is fetching
    if (loadError) return <p>Error: {loadError}</p>; //Display error message if fetching fails

    return ( //return HTML for tour list, info, price, buttons, and toggles
        <div className="gallery">
            {tourList.map(({ id, name, description, image, price, showFullDescription }) => (
                <div key={id} className="tour-card">
                    <img src={image} alt={name} />
                    <div className="tour-info">
                        <h2>{name}</h2>
                        <p className="tour-price">${price}</p>
                        <p>
                            {showFullDescription ? description : `${description.substring(0, 100)}...`}
                            <button onClick={() => handleToggleDescription(id)}>
                                {showFullDescription ? "Show Less" : "Read More"}
                            </button>
                        </p>
                        <button className="not-interested" onClick={() => handleRemoveTour(id)}>
                            Not Interested
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery; //Export Gallery component as default