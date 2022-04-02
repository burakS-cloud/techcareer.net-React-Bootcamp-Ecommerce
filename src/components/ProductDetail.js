import React, {useState, useContext, useEffect} from 'react'
import { baseService } from '../network/services/baseService'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button } from "antd"
import CartContext from '../contexts/CartContext'

const ProductDetail = () => {
  let navigate = useNavigate();

  const [productsDetail, setProductsDetail] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
        const data = await baseService.get('/products');
        setProductsDetail(data);
        
    } catch (error) {
        console.log('Get products error', error);
    }
}

const addToCart = (product) => {
    let cartProduct = cart.find(q => q.id === product.id)
    
    console.log(cartProduct)
  
    if (cartProduct) {
        cartProduct.quantity += 1
                 
        setCart([...cart])
    } else {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.unitPrice,
            quantity: 1
        }
  
        setCart(prev => [...prev, cartProduct])
    }
  }

  console.log(cart)
  
  // const removeItem = (id) => {
  //   // console.log(id);
  //   setCart(prev => prev.filter(q => q.id !== id))
  // }


let theProduct = [];
let { id } = useParams();
let ID = parseInt(id);

theProduct = productsDetail.filter(product => product.id === ID);

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
  title: 'Supplier ID',
  dataIndex: 'supplierId',
  key: 'supplierId',
},
  {
      title: 'Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
  },
  
  {
      title: 'Add to Cart',
      dataIndex: 'id',
      key: 'id',
      render: product => (<Button type="primary" primary onClick={() => { theProduct.map(product => addToCart(theProduct[0]))}}>Add to Cart</Button>)
  }
];

/* <div style={{ width: "80%"}}>
            <Table dataSource={theProduct} columns={columns}  />
            <button onClick={() => addToCart(theProduct)}>Add to Cart</button>
        </div> */


  return (
    <>
     {/* <ul>   
      {theProduct.map(product => (
        <>
        <li>Product Name:{product.name}</li>
        <li>Product ID:{product.id}</li>
        <li>Product's Category ID:{product.categoryId}</li>
        <li>Product's Supplier ID:{product.supplierId}</li>
        <li>Product's Price:{product.unitPrice}</li>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        </>
      ))}
      </ul>
      <Link to="/">Go back Home</Link>  */}
      <div style={{ width: "80%"}}>
            <Table dataSource={theProduct} columns={columns}  />
        </div> 
      </>
  )
}

export default ProductDetail