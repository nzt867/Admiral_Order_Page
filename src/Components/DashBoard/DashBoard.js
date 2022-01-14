import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InsuranceData from '../InsuranceData/InsuranceData';
import '../DashBoard/DashBoard.css';
import Header from '../Utils/Header';
import Footer from '../Utils/Footer';
const DashBoard = () => {
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get('./data.json', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setProducts(res.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderData =
    products && products.map((el, i) => <InsuranceData prod={el} key={i} />);

  return (
    <React.Fragment>
      <Header />
      <section>{renderData}</section>
      <Footer />
    </React.Fragment>
  );
};

export default DashBoard;
