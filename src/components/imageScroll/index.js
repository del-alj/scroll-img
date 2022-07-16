import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfiniteScroll from "react-infinite-scroll-component";

import { Box, Div } from "./style";

export const ImageScroll = (props) => {
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const temp = props?.images
        const index = 6 * page;

        setImages(
            temp?.slice(0, (index < temp?.length ? index : temp?.length)), 
        )
    }, [page])

    return (
        <Box>
            <InfiniteScroll
                dataLength={images.length}
                next={() => setPage(page + 1)}
                hasMore={true} >
                {images?.map((elem, i) => {
                    return <Div key={i}>
                        <p >{elem}</p>
                        <img
                            src={`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`}
                            alt={elem}
                            width="300"
                            height="400" />
                    </Div>
                })}
            </InfiniteScroll>
        </Box>

    )
}