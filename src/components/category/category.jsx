import { useEffect,useState } from 'react';
import { getData, deleteData } from '../../services/data-fetch'
import CategoryForm from './catagory-form';
import LoadingSpinner from '../static/LoadingSpinner.jsx'
import { toast } from 'react-toastify';

const Category = () => {
  const [categories,setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWorkoutsLoading, setIsWorkoutsLoading] = useState(true); //just for using category ther are attached to category
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getData(`/categories?sort=name`);
      console.log(data);
      setCategories(data);
      setIsWorkoutsLoading(false);
      setSelectedCategory(null); // Reset selected category
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = (id) => {
    console.log("delete", id);
    const deleteCategory = async () => {
    try {
      const data = await deleteData(`/categories/${id}`);
      console.log(data);
      toast.success("Catégorie supprimée");
      getCategories();
    } catch (error) {
      console.error('Error caught in calling function:', error);
        if (error.response) {
          console.log(error.response);
          error.response.json().then((body) => {
            console.error('Erreur du serveur:', body.errors);
            toast.success(`${body.errors.join(', ')}`);
          });
        }
    }
    };
    deleteCategory();
    
  }
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  if (isLoading) {
    return <div><LoadingSpinner/></div>;
  }

  return(
    <div className='container my-5 mx-10'>
      <h1>Categories</h1>
      <button className='button-green-small my-3' onClick={()=>{setShowForm(!showForm)}}>Create</button>
      {showForm && <CategoryForm category={selectedCategory} onCategorySaved={getCategories}/>}
    {categories.map((category) => (
      <div key={category.id} className='grid grid-cols-5 my-3'>
        <div className='col-span-2 max-h-80'>
          {category.category_image ? 
            <img src={category.category_image} alt={`image de ${category.name}`} className="h-full w-auto" />
            :
            <p>No image</p>
          }
        </div>
        <h3 className='col-span-1'>{category.name}</h3>
        {isWorkoutsLoading ? (
          <p>Loading workouts...</p>
        ) : (
          <p className='col-span-1'>Nombre de workout attaché : {category.workouts.length}</p>
        )}
        <div className='col-span-1'>
        <button className='button-primary-small' onClick={() => handleEdit(category)}>Edit</button>
          <button className='button-red-small' onClick={() => handleDelete(category.id)}>Delete</button>
        </div>
      </div>
    ))}
    </div>
  )
}

export default Category