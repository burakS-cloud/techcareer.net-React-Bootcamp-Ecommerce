import React, { useState, useLayoutEffect } from 'react'
import { Table } from "antd"
import { useNavigate } from 'react-router-dom'
import { baseService } from '../network/services/baseService'
const Home = () => {
  let navigate = useNavigate();
  const [wholeProducts, setWholeProducts] = useState([])

  useLayoutEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
        const data = await baseService.get('/products');
        setWholeProducts(data);
    } catch (error) {
        console.log('Get whole products error', error);
    }
}
   
   let productsToRender = [];
   productsToRender = [...wholeProducts];
   
   let finalArr =  productsToRender.sort(function (a, b) {  return a.unitPrice - b.unitPrice; }).reverse().slice(0,10)

   const columns = [
    {
        title: 'Product ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        onCell: (record,rowIndex) => {
          return {
            onClick: (ev) => {
              navigate(`/products/${record.id}`)
            }
          }
        }
    },
    {
        title: 'Price',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
    }
];
  
  return (
    <>
    <h1>10 Most Expensive Products!</h1>
    {/* { <ul>
      {finalArr.map((product,key) => (
        <Link to={`/products/${product.id}`}><li key={key}>{key+1}- {product.name} - {product.unitPrice}</li></Link>
      ))}
    </ul> } */}
    <div style={{ width: "50%"}}>
            <Table dataSource={finalArr} columns={columns}  />
        </div>
    </>
  )
}

export default Home