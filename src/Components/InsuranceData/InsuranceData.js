import React from 'react';
import { useState, useEffect } from 'react';
import '../InsuranceData/InsuranceData.css';
import { useHistory } from 'react-router-dom';

const availableDiscount = {
  DISC10: 10,
  DISC20: 20,
  DISC30: 30,
  DISC40: 40,
  DISC50: 50,
};

const FoodData = ({ prod }) => {
  const { price, caption, image, validity, product, name } = prod;
  const [value, setValue] = useState(price);
  const [quant, setQuant] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(null);
  const [valid, setValid] = useState(0);
  const [active, setActive] = useState(true);
  const [payment, setPayment] = useState(false);
  const history = useHistory();
  const increment = () => {
    setQuant(quant + 1);
  };
  const decrement = () => {
    if (quant > 0) {
      setQuant(quant - 1);
    }
  };

  useEffect(() => {
    setValue(price * quant);
    setValid(validity + quant);
  }, [quant, price, validity]);

  useEffect(() => {
    setActive(true);
    for (let key in availableDiscount) {
      if (availableDiscount.hasOwnProperty(key)) {
        if (key === discountCode) {
          setDiscount(availableDiscount[key]);
        }
      }
    }
  }, [discountCode]);

  useEffect(() => {
    value > 0 ? setPayment(true) : setPayment(false);
  }, [value]);

  const handleClick = () => history.push('/payment', { value, product, name });

  const handleChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleDiscount = (e) => {
    e.preventDefault();

    if (discount > 0) {
      setValue(price * quant - (price * discount * quant) / 100);
      setDiscount(null);
    } else {
      setValue(price * quant);
      setActive(false);
    }
  };
  return (
    <div className="card">
      <figure>
        <img src={image} alt="Food" />
        <figcaption style={{ textAlign: 'right' }}>{caption}</figcaption>
      </figure>
      <h5>Years Insured</h5>
      <div className="container">
        <div className="start">
          <input
            type="button"
            value="-"
            onClick={decrement}
            className="inputButton"
          />
          <span style={{ margin: '0 .5em', verticalAlign: 'middle' }}>
            {quant}
          </span>
          <input
            type="button"
            value="+"
            onClick={increment}
            className="inputButton"
          />
        </div>
        <div className="end">
          <h4>Address : {prod.store}</h4>
          <h4>Vehicle No :{product}</h4>
          <h4>Valid till :{valid}</h4>
        </div>
      </div>

      <form className="discount" onSubmit={(e) => handleDiscount(e)}>
        <input
          type="text"
          className={active ? 'apply' : 'reject'}
          value={discountCode}
          placeholder="Enter Discount Code"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <input
          type="submit"
          value="Apply"
          className={payment ? 'secondaryButton' : 'secondaryButtonDisabled'}
          disabled={!payment}
        />
        {!active && (
          <div style={{ marginLeft: '5%', color: 'red' }}>
            DiscountCode Invalid
          </div>
        )}
      </form>
      <div className="priceDisplay">
        <button
          className={payment ? 'primaryButton' : 'primaryButtonDisabled'}
          onClick={handleClick}
          disabled={!payment}
        >
          Get Insured
        </button>
        <div>
          <h4>Premium Cost</h4>
          <h1>${value}</h1>
        </div>
      </div>
    </div>
  );
};

export default FoodData;
