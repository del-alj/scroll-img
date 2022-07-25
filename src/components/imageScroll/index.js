import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Div } from "./style";

export const ImageScroll = (props) => {
  const temp = props?.images;
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(temp?.slice(0, 3));
  const fetchMoreData = () => {
   setTimeout(() => {
     const index = 3 * page;
     const tempimg = temp?.slice(images?.length -1 ,index );
     setImages(images.concat(tempimg));
     console.log(images, page);
   }, 1000);
 };

  useEffect(() => {
    if (page > 1)
    fetchMoreData();
    hires_images();
  }, [page]);

  const hires_images = () => {
    let imgs = document.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i]) {
        let img = imgs[i];
        let attr = img?.getAttribute("realurl");
        imgs[i].src = attr;
      }
    }
  };
  if (window.addEventListener) {
    window.addEventListener("load", hires_images, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", hires_images);
  } 
  return (
    <Box >
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading more 2 itens...</h4>}
      >
        {images?.map((elem, i) => {
          return (
            <Div key={i}>
              <p>{elem}</p>
              <img
                realurl={`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`}
                src={
                  "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
                }
                alt={elem}
                width="300"
                height="400"
              />
            </Div>
          );
        })}
      </InfiniteScroll>
    </Box>
  );
};
