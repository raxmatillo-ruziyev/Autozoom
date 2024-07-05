import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Image, Input, Modal, Popconfirm, Table, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react'







//GET 



const Brand = () => {
  const BrendUrl = 'https://autoapi.dezinfeksiyatashkent.uz/api/brands'
  const imageURL = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  const [form] = Form.useForm();
  const [loader, setLoader] = useState([]);
  const [data, setData] = useState();
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);


  //upload
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  //


  const getData = () => {
    setLoader(true)

    fetch(BrendUrl)
      .then(res => res.json())
      .then(data => {
        setData(data.data)



      })
      .catch(err => message.error(err))
      .finally(() => setLoader(false))
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      index: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Images',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: <Button onClick={() => setIsModalOpen(true)} type='primary'>Add Brand</Button>,
    }
  ];
  


  //Post
  const [postName, setPostName] = useState('');
  const [postImage, setPostImage] = useState(null);
  const token = localStorage.getItem('access_token');

  const postData = () => {
    const formData = new FormData();
    formData.append('title', postName);
    formData.append('images', postImage);
    fetch(BrendUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,


    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        getData();
        setIsModalOpen(false);
        message.success(data.message);
        setPostImage(null);
        setPostName('')
        form.resetFields();
      })
      .catch((err) => {

        console.log(err)
      })
  }
//Delete
const deleteData = (id) => {
  fetch(`${BrendUrl}/${id}`, {
    method: 'DELETE',
    headers:{
      Authorization: `Bearer ${token}`
    }
  
  })
  .then(res => res.json())
  .then(data => {
   getData()
   message.success(data.message)
  })
  .catch((err) => {
    message.error(err.message)
  })
}


const dataSource =
    data &&
    data.map((brand, index) => ({
      index: index + 1,
      key: brand.id,
      name: brand.title,
      image: <Image
        width={100}
        src={`${imageURL}${brand.image_src}`} alt={brand.title} />,
      action: (
        <Flex gap="small">
          <Button type="primary">Edit</Button>

          <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={()=> deleteData(brand.id)}
    okText="Yes"
    cancelText="No"
  >
  <Button type="primary" danger>
            Delete
          </Button>
  </Popconfirm>
         
        </Flex>
      ),
    }));






  return (
    <div>
      <h1>Brands</h1>


      <Table
        loading={loader ? true : false}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: '5' }} />




      <Modal
        title="Post Brand"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}>

        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={postData}
          autoComplete="off"
          layout='vertical'
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input onChange={(e) => setPostName(e.target.value)} />
          </Form.Item>


          <Form.Item
            label="Images"
            name="images"
            rules={[
              {
                required: true,
                message: 'Please input your image!',
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept='image/*'
              listType="picture-card"
              customRequest={({ onSuccess }) => { onSuccess("ok") }}
              onChange={(e) => setPostImage(e.file.originFileObj)}>
              <button
                style={{
                  border: 0,
                  background: 'none',
                }}
                type="button"

              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>



          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>





    </div>
  )
}

export default Brand






