import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { baseService } from "../network/services/baseService";
import CategoryCard from "./CategoryCard";
import CategoryListStyles from "../assets/css/CategoryList.css";

const CategoryList = () => {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await baseService.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log("Get categories error", error);
    }
  };

  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     onCell: (record, rowIndex) => {
  //       return {
  //         onClick: (ev) => {
  //           navigate(`/categories/${record.id}`);
  //         },
  //       };
  //     },
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  // ];

  return (
    <>
      {/* <div style={{ width: "80%" }}>
        <Table
          dataSource={categories.sort((a, b) => a.id - b.id)}
          columns={columns}
        />
      </div> */}
      <h1 style={{ marginTop: "1.5rem", fontSize: "2rem" }}>All Categories</h1>
      <div className="category__wrapper">
        {categories.map((category, index) => {
          return (
            <CategoryCard
              img="https://images.unsplash.com/photo-1529928520614-7c76e2d99740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              title={category.name}
              description={category.description}
              id={category.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryList;
