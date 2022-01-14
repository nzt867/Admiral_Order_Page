import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Utils/Header';
import Footer from '../Utils/Footer';
import './Payments.css';

const Payment = () => {
  const history = useHistory();
  const { value, product, name } = history.location.state;
  console.log(history.location.state);
  useEffect(() => {
    alert(`Payment Successful`);
  }, [value]);
  return (
    <React.Fragment>
      <Header />
      <div className="paymentConf">
        <h1>
          Payment of ${value} done for vehicle No {product}
        </h1>
        <div>
          <img src="./icons8-check-64.png" alt="Check" />
        </div>
      </div>

      <div className="salutation">Thanks {name} for choosing Admiral</div>

      <Footer />
    </React.Fragment>
  );
};

export default Payment;
