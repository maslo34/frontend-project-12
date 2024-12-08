// import { useEffect } from 'react';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectors } from "../slices/chanelSlice";

const ChanelList = () => {
  const chanel = useSelector(selectors.selectAll)
  console.log(chanel)
  return (
    <div>
      <ul>
      {chanel.map((el) => <li key={el.id}>{el.name}</li>)}
      </ul>
    </div>
  )
};

export default ChanelList;
