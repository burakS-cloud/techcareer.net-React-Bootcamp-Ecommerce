import React, {useState, useLayoutEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table } from "antd"
import { baseService } from '../network/services/baseService'

const CategoryList = () => {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    try {
        const data = await baseService.get('/categories');
        setCategories(data);
    } catch (error) {
        console.log('Get categories error', error);
    }
}

const columns = [
  {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
  },
  {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onCell: (record,rowIndex) => {
        return {
          onClick: (ev) => {
            navigate(`/categories/${record.id}`)
          }
        }
      }
  },
  {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
  }
];


  return (
    <>
    {/* <ul>
      <div>
      {categories.map(category => (
        <>
        <li style={{color:'orange'}}>{category.id}- <Link to={`/categories/${category.id}`}>{category.name}</Link></li>
        <p style={{color:'green'}}>Description: {category.description}</p>
        </>
      ))}
      </div>
    </ul> */}
    <div style={{ width: "80%"}}>
            <Table dataSource={categories.sort((a,b) => a.id - b.id)} columns={columns}  />
        </div>

    </>
  )
}

export default CategoryList