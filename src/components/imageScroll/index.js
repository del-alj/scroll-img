import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Div } from "./style";
import ProgressiveImage from "react-progressive-graceful-image";

export const ImageScroll = (props) => {
  const temp = props?.images;
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(temp?.slice(0, 3));
  const checkimg = async (images) => {
    let temp = [];
    await images.forEach(async (elem) => {
       await axios.get(`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`, {
        headers: { 
          'Access-Control-Allow-Origin' : '*',
        },
      }).then((res) => {
        console.log("tititi", res);
        temp.push(elem);
      }).catch(()=> {
        console.log("45");

      })
    });
    return temp;
  };
  const fetchMoreData = () => {
    setTimeout(async () => {
      const index = 3 * page;
      const tempimg = temp?.slice(images?.length - 1, index);
      const imgi = await checkimg(tempimg);
      console.log("logi", imgi);
      setImages(images.concat(tempimg));
    }, 1000);
  };

  useEffect(() => {
    if (page > 1) fetchMoreData();
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
    <Box>
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
              <ProgressiveImage
                src={`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`}
              >
                {(src, loading) => (
                  <img
                    className={`image${loading ? " loading" : " loaded"}`}
                    realurl={`https://neoos.s3.eu-west-1.amazonaws.com/img/birds/${elem}`}
                    src={src}
                    alt={elem}
                    width="300"
                    height="400"
                  />
                )}
              </ProgressiveImage>
            </Div>
          );
        })}
      </InfiniteScroll>
    </Box>
  );
};
