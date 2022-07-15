import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Box, Div} from "./style";
export const ImageScroll = (props) => {
    const { images } = props;

    return (
            <Box>
                {images?.map((elem, i) => {
                    return <Div>
                        <p >{elem}</p>
                        <LazyLoadImage
                            effect="blur"
                            src={`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`}
                            alt={elem}
                            width={"300px"}
                            height={"400px"} />
                    </Div>
                })}
            </Box>

    )
}