import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const radioButtons = byDateDesc?.map((evt, radioIdx) => (
    <input
      key={`radio${evt.date}`}
      type="radio"
      name="radio-button"
      checked={index === radioIdx}
    />
  ));

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (byDateDesc) {
          setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
        }
      }, 5000);
      return () => clearInterval(intervalId);
    }, [index, byDateDesc]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={`slider${event.title}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />  
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {radioButtons}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
