import React, {useState, useEffect} from 'react'
import { baseService } from '../network/services/baseService'
import { useNavigate } from 'react-router-dom'
import { Table } from "antd"

const ProductList = () => {
  const [products, setProducts] = useState([])
  let navigate = useNavigate();
  
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
        const data = await baseService.get('/products');
        setProducts(data);
    } catch (error) {
        console.log('Get products error', error);
    }
}

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
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/products/${record.id}`)
          }
        }
      }
  }
];

  return (
    <>
    <div style={{ width: "50%"}}>
            <Table dataSource={products} columns={columns} pagination={{ defaultPageSize: 10, defaultCurrent: 1 }} />  
        </div>
    </>
  )
}

export default ProductList