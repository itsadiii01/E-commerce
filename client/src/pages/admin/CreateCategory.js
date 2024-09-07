import React from "react";
import { useEffect, useState } from "react";
import AdminMenu from "../../component/La/AdminMenu";
import Layout from "../../component/La/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../component/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //hndle frm
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://aditya-ecom-backend.onrender.com/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`, { duration: 5000 });
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting input form");
    }
  };
  //gt all ctgries
  const getAllCategory= async () => {
    try {
      const { data } = await axios.get(
        `https://aditya-ecom-backend.onrender.com/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
// updte ctgry

const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://aditya-ecom-backend.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

//dlte ctgry
const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://aditya-ecom-backend.onrender.com/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - create category"}>
      <div className="conatiner-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Cateogry</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}>Edit</button>
                          <button className="btn btn-danger ms-2"onClick={() => {
                              handleDelete(c._id);
                            }}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
