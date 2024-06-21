import { useState } from "react";
import { postData } from "../../services/data-fetch";

//atom
import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";

const CategoryForm = () => {
  const [name,setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [image,setImage] = useState(null)
  const [,setAlert] = useAtom(alertAtom);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      console.log(imageFile);
      setImage(imageFile)
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createCategory = async() => {
      if(image === null){
        alert("Image est vide");
        return;
      }
      try {
        const category = await postData("/categories", {
          category: { 
            name:name,
            category_image: image
          },
        });
        if(category){
          setAlert({
            showAlert:true,
            message:"Categorie créé",
            alertType:"success"
          })
        }
        
      } catch (error) {
        console.error(error); 
        setAlert({
          showAlert:true,
          message:"Une erreur est survenue. Veuillez réessayer ou voir le serveur",
          alertType:"error"
        })
      }
    }
    createCategory();
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
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
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
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
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