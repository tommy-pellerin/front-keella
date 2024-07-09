import { useState, useEffect } from "react";
import { postData, updateData } from "../../services/data-fetch";
import { toast } from 'react-toastify';

const CategoryForm = (props) => {
  const [name,setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [image,setImage] = useState(null)

  // Set form fields when category prop changes
  useEffect(() => {
    if (props.category) {
      setName(props.category.name);
      // setPreviewUrl(props.category.category_image);
      // Note: You can't set the image file from a URL, so we leave it as null
    }
  }, [props.category]);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setImage(imageFile)
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saveCategory = async() => {
      if(image === null){
        alert("Image est vide");
        return;
      }
      try {
        let category;
        if (props.category) {
          // Edit mode: PATCH request
          category = await updateData(`/categories/${props.category.id}`, {
            category: { 
              name:name,
              category_image: image
            },
          });
        } else {
          // Create mode: POST request
          category = await postData("/categories", {
            category: { 
              name:name,
              category_image: image
            },
          });
        }
        if(category){
          toast.success("Catégorie enregistrée");
          props.onCategorySaved();
        }
        
      } catch (error) {
        // console.error('Error caught in calling function:', error);
        if (error.response) {
          error.response.json().then((body) => {
            // console.error('Erreur du serveur:', body.errors);
            toast.error(`${body.errors.join(', ')}`);
          });
        }
        
      }
    }
    saveCategory();
  }

  return(
    <>
      <h1>Category Form</h1>
      <div className="container bg-gray-200 mx-auto lg:w-3/5 my-5 border border-gray rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 my-5">
          
          {previewUrl && <img src={previewUrl} alt="Preview" className="w-60 h-60 mt-5" />}

          <div className="sm:w-full lg:w-3/5">
            <label>Image de la categorie</label>
            <br />
            <input
              type="file"
              onChange={(e) => handleImageUpload(e)}
              className="w-full h-10 px-2 border rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="w-3/5">
            <label>Nom de la categorie</label>
            <br />
            <input
              type="name"
              placeholder="nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-2 border rounded-md focus:border-blue-500 focus:outline-none"
            ></input>
          </div>
          
          <div className="w-3/5">
            <button type="submit" className="button-primary-large">Submit</button>
          </div>
          
        </form>
      </div>
    </>
  )
}

export default CategoryForm