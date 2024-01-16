import React from "react";
import useFetch from "../../../hook/useFetch";

import Carousel from "../../../components/carsousel/Carsouel";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
     
    console.log(data)
    return (
        <>
         <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
        </>
    );
};

export default Recommendation;