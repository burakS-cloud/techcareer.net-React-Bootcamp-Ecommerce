import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table } from "antd"
//import ProductList from './ProductList'
import { baseService } from '../network/services/baseService'

const CategoryDetail = () => {
  let navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([])
  

  useEffect(() => {
    getProducts();
  }, [])


  const getProducts = async () => {
    try {
        const data = await baseService.get('/products');
        setAllProducts(data);
    } catch (error) {
        console.log('Get all products error', error);
    }
}


let location = window.location.href;

let idToUse = location.charAt(location.length -1);

let numberId = parseInt(idToUse);

let categoriesProducts = [];
 categoriesProducts = allProducts.filter(product => product.categoryId === numberId);

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
    title: 'Category ID',
    dataIndex: 'categoryId',
    key: 'categoryId',
},
  {
      title: 'Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
  }
];



  return (
    <>
      {/* <ul>
        {categoriesProducts.map(product => (
          <Link style={{color:'olive'}} to={`/products/${product.id}`}><li>Product Name: {product.name} - Product ID: {product.id} - Category ID: {product.categoryId}</li></Link>
        ))}
      </ul> */}
      <div style={{ width: "50%"}}>
            <Table dataSource={categoriesProducts} columns={columns}  />
        </div>
    </>
  )
}

export default CategoryDetail