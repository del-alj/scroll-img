
import './App.css';
import {ImageScroll} from "./components/imageScroll";
import {images} from "./asset/imagesList.js";

export const App = () => {
  return (
    <div className="App">
        <ImageScroll images={images} />
    </div>
  );
}
