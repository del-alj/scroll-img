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


const hires_images = () => {
    var imgs = document.getElementsByTagName('img');
    for (let i = 0; i < imgs.length; i++) { 
        if (imgs[i].realuri) {
            imgs[i].src=imgs[i].realuri;
        }
     }
}
if (window.addEventListener) {
     window.addEventListener('load', hires_images, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', hires_images);
}

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
                            realurl={`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`}
                            src={"data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"}
                            alt={elem}
                            width="300"
                            height="400" 
                            
                            />
                           {hires_images}
                          
                    </Div>
                })}
            </InfiniteScroll>
        </Box>

    )
}