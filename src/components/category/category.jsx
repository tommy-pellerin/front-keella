import { useEffect,useState } from 'react';
import { getData, deleteData } from '../../services/data-fetch'
import CategoryForm from './catagory-form';
import LoadingSpinner from '../static/LoadingSpinner.jsx'

const Category = () => {
  const [categories,setCategories] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getData(`/categories`);
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getCategories();
  }, []);

  const handleDelete = (id) => {
    console.log("delete", id);
    const deleteCategory = async () => {
    try {
      const data = await deleteData(`/categories/${id}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    };
    deleteCategory();
  }

  if (isLoading) {
    return <div><LoadingSpinner/></div>;
  }

  return(
    <div className='container mx-auto my-5'>
      <h1>Categories</h1>
      <button className='button-green-small my-3' onClick={()=>{setShowCreateForm(!showCreateForm)}}>Create</button>
      {showCreateForm && <CategoryForm />}
    {categories.map((category) => (
      <div key={category.id} className='grid grid-cols-4 my-3'>
        <div className='col-span-2'>
          <p>image</p>
        </div>
        <h3 className='col-span-1'>{category.name}</h3>
        <div className='col-span-1'>
          <button className='button-primary-small'>Edit</button>
          <button className='button-red-small' onClick={() => handleDelete(category.id)}>Delete</button>
        </div>
      </div>
    ))}
    </div>
  )
}

export default Category