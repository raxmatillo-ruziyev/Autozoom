import { Button, Flex, Image, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
const BrendUrl = 'https://autoapi.dezinfeksiyatashkent.uz/api/brands'
const imageURL = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
//GET 



const Brand = () => {
  const [loader, setLoader] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    setLoader(true)

    fetch(BrendUrl)
      .then(res => res.json())
      .then(data => {
        setData(data.data)



      })
      .finally(()=>setLoader(false))



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
      title: <Button type='primary'>Add Brand</Button>,
    }
  ];
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
          <Button type="primary" danger>
            Delete
          </Button>
        </Flex>
      ),
    }));




  //Post

  return (
    <div>
      <h1>Brands</h1>


      <Table
        loading={ loader?true:false}
         dataSource={dataSource} 
         columns={columns} 
         pagination={{pageSize:'5'}}/>

    </div>
  )
}

export default Brand
