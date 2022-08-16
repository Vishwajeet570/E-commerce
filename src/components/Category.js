import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'rsuite';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import products from '../db/products.json';
import '../styles/category.scss';
import { useProfile } from '../Context/profile.context';
import categories from '../db/categories.json';

const Category = () => {
  const [product, setProduct] = useState(products);
  const { id } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const [isExpensive, setIsExpensive] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const abc = useProfile();
  const obj = abc[0];
  const setCart = abc[1];
  const catio = categories;
  // const a = localStorage.getItem('count');
  // const b = localStorage.getItem('cost');
  // const c = localStorage.getItem('productId');
  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('count'));
  //   const realCost = JSON.parse(localStorage.getItem('cost'));
  //   const realProductId = JSON.parse(localStorage.getItem('productId'));
  //   setCart({ count: items, cost: realCost, productId: realProductId });
  // }, []);

  useEffect(() => {
    if (isChecked && !isExpensive && !isBestseller) {
      const filArray = products.filter(item => item.delivery === true);

      setProduct(filArray);
    }
    if (isExpensive && !isChecked && !isBestseller) {
      const exArray = products.filter(item => item.price > 100);
      setProduct(exArray);
    }
    if (isBestseller && !isChecked && !isExpensive) {
      const exArray = products.filter(item => item.soldUnits > 50);
      setProduct(exArray);
    }
    if (isExpensive && isChecked && !isBestseller) {
      const filArray = products.filter(
        item => item.delivery === true && item.price > 100
      );

      setProduct(filArray);
    }
    if (isChecked && isBestseller && !isExpensive) {
      const filArray = products.filter(
        item => item.delivery === true && item.soldUnits > 50
      );

      setProduct(filArray);
    }
    if (isExpensive && isBestseller && !isChecked) {
      const filArray = products.filter(
        item => item.soldUnits > 50 && item.price > 100
      );

      setProduct(filArray);
    }
    if (isBestseller && isChecked && isExpensive) {
      const filArray = products.filter(
        item =>
          item.soldUnits > 50 && item.price > 100 && item.delivery === true
      );

      setProduct(filArray);
    }

    if (!isChecked && !isExpensive && !isBestseller) {
      setProduct(products);
    }
  }, [isChecked, isExpensive, isBestseller]);

  const del = () => {
    setIsChecked(p => !p);
  };
  const exp = () => {
    setIsExpensive(p => !p);
  };
  const sell = () => {
    setIsBestseller(p => !p);
  };
  const add = (price, proId) => {
    setCart(prev => {
      localStorage.setItem('count', JSON.stringify(prev.count + 1));
      localStorage.setItem('cost', JSON.stringify(prev.cost + price));
      if (prev.productId === null) {
        localStorage.setItem('productId', JSON.stringify([proId]));
      } else {
        localStorage.setItem(
          'productId',
          JSON.stringify([...prev.productId, proId])
        );
      }

      return {
        count: prev.count + 1,
        cost: prev.cost + price,
        productId: [...prev.productId, proId],
      };
    });
  };
  // localStorage.setItem('count', obj.count);
  // localStorage.setItem('cost', obj.cost);
  // localStorage.setItem('productId', obj.productId);

  return (
    <div className="main-box">
      <div className="cont-head">
        <Link to="/checkout">
          <div className="cnt">{obj.count}</div>
        </Link>
        <div className="cst">
          <Link to="/checkout">${obj.cost}</Link>
        </div>
      </div>
      <div className="container">
        <div className="filter">
          <h3>Filter</h3>
          <Checkbox onChange={del}> Delivery</Checkbox>
          <Checkbox onChange={exp}>Expensive</Checkbox>
          <Checkbox onChange={sell}>Best Seller</Checkbox>
        </div>
        <div className="nm">
          <h3>
            {catio.map(item => {
              return item.id === id ? item.name : '';
            })}
          </h3>
        </div>
        {product.map(item => (
          <div key={item.id}>
            {id === item.categoryId && (
              <div className="container-son">
                <img src={item.thumbnail} alt="img" />

                <h5>{item.name}</h5>
                <div>${item.price}</div>

                {item.inStock ? (
                  <>
                    <div style={{ color: 'green' }}>In Stock</div>
                    <Button
                      onClick={() => add(item.price, item.id)}
                      appearance="primary"
                      color="blue"
                    >
                      Add to cart
                    </Button>
                  </>
                ) : (
                  <>
                    <div style={{ color: 'red' }}>Out of stock</div>
                    <Button appearance="primary" disabled>
                      Add to cart
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
