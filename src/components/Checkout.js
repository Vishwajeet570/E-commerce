import React, { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
import CloseIcon from '@rsuite/icons/Close';
import { useProfile } from '../Context/profile.context';
import products from '../db/products.json';
import '../styles/checkout.scss';

const Checkout = () => {
  const [isProduct, setIsProduct] = useState(products);

  const abc = useProfile();
  const obj = abc[0];
  const setObj = abc[1];

  // console.log(obj);
  // useEffect(() => {
  //   localStorage.setItem('count', JSON.stringify(obj.count));
  //   localStorage.setItem('cost', JSON.stringify(obj.cost));
  //   localStorage.setItem('productId', JSON.stringify(obj.productId));
  // }, [obj.count, obj.cost, obj.productId]);
  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('count'));
  //   const realCost = JSON.parse(localStorage.getItem('cost'));
  //   const realProductId = JSON.parse(localStorage.getItem('productId'));
  //   setObj({ count: items, cost: realCost, productId: realProductId });
  //   console.log(items, realCost, realProductId);
  // }, []);

  const l = [];
  isProduct.forEach(item => {
    obj.productId.forEach(o => {
      if (item.id === o) {
        if (!l.includes(item)) {
          l.push(item);
        }
      }
    });
  });

  const a = [];
  a.length = isProduct.length;
  for (let i = 0; i < isProduct.length; i++) {
    a[i] = '';
  }
  for (let i = 0; i < isProduct.length; i++) {
    a[i] = isProduct[i].id;
  }

  const individual = [];
  const order = [];
  individual.length = isProduct.length;

  for (let i = 0; i < isProduct.length; i++) {
    individual[i] = 0;
    order[i] = 0;
  }

  for (let i = 0; i < a.length; i++) {
    obj.productId.forEach(item => {
      if (item === a[i]) {
        individual[i] += 1;
      }
    });
  }
  for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (l[i].id === a[j]) {
        order[i] = individual[j];
      }
    }
  }
  const [ind, setInd] = useState(order);

  const dlt = (id, price, no) => {
    setObj(prev => {
      localStorage.setItem('count', JSON.stringify(prev.count - ind[no]));
      localStorage.setItem('cost', JSON.stringify(prev.cost - price * ind[no]));
      localStorage.setItem(
        'productId',
        JSON.stringify(prev.productId.filter(item => id !== item))
      );

      return {
        count: prev.count - ind[no],
        cost: prev.cost - price * ind[no],
        productId: prev.productId.filter(item => id !== item),
      };
    });
    individual[no] = 0;
    for (let i = no; i < isProduct.length; i++) {
      if (order[i + 1] > 0) {
        order[i] = order[i + 1];
      } else {
        order[i] = 0;
      }
    }
    setInd(order);
  };

  useEffect(() => {
    if (ind[0] !== order[0]) {
      setInd(order);
    }
  });
  const mediaQuery = window.matchMedia('(max-width: 630px)');
  console.log(mediaQuery.matches);
  return (
    <div className="n-box">
      <div className="t-head">
        <Link to="/checkout">
          <div className="cst">${obj.cost}</div>
          <div className="cnt">{obj.count}</div>
        </Link>
      </div>
      <div className="container-father">
        <div>
          <div className="heading">
            <h2>Checkout</h2>{' '}
          </div>
          <br />
        </div>
        <div className="ckhd">
          <div className="hd">
            <h5>Name </h5>
            <div className="pc">
              <h5>Price </h5>
            </div>
            <div className="quant">
              <h5>Quantity </h5>
            </div>
          </div>

          {l.map((item, no) => (
            <div key={item.id} className="added">
              <br />

              <img src={item.thumbnail} alt="img" />

              <span className="nmee">
                {!mediaQuery.matches
                  ? item.name.padEnd(22, '_')
                  : item.name.split(' ')[0]}
              </span>
              {/* {item.name.padEnd(20, '_')} */}
              <span>${item.price} </span>

              <span className="rs">{ind[no] > 0 ? ind[no] : ''}</span>
              <span>
                <Button onClick={() => dlt(item.id, item.price, no)}>
                  <CloseIcon />
                </Button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
