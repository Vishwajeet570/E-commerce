import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../Context/profile.context';
import categeories from '../db/categories.json';

import '../styles/Home.scss';

const Home = () => {
  const catio = categeories;
  const abc = useProfile();
  const obj = abc[0];

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem(0));
  //   const realCost = JSON.parse(localStorage.getItem(0));
  //   const realProductId = JSON.parse(localStorage.getItem([]));
  //   setObj({ count: items, cost: realCost, productId: realProductId });
  // }, []);
  return (
    <div className="App-dad">
      <div className="head">
        <Link to="/checkout">
          <div className="circle">{obj.count}</div>
        </Link>
        <div className="circle-cost">
          <Link to="/checkout">${obj.cost}</Link>
        </div>
      </div>
      <div className="App">
        {catio.map(item => (
          <div key={item.id}>
            <Link to={`category/${item.id}`}>
              <div className="catBox">{item.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
