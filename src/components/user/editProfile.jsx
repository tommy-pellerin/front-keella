import { useState, useEffect } from "react";
import { getData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { useNavigate } from "react-router-dom";
import { updateData } from "../../services/data-fetch";
import { toast } from 'react-toastify';

export default function EditProfile({}) {
  const [user,setUser] = useAtom(userAtom);
  const [email, setEmail] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [avatar, setAvatar] = useState(null)
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const profileData = async () => {
        try {
            const data = await getData(`/users/${user.id}`);
            console.log("user: ", data);
            if(data.avatar){
            setPreviewUrl(data.avatar)
            setAvatar(data.avatar)
            }
            setEmail(data.email)
            setUsername(data.username)
        } catch (error) {
            console.error(error);
        }
    };
    profileData();
}, [user]);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      console.log(imageFile);
      setAvatar(imageFile)
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateData(`/users`, {
        user: { 
          username:username, 
          email:email,
          avatar:avatar
        },
      });
      setUser(prevUser => ({
        ...prevUser,
        email: email,
      }));
      if(updatedUser){
        console.log("updated");
        toast.success("Profil mise à jour");
      }
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error('Error caught in calling function:', error);
      if (error.response) {
        console.log(error.response);
        error.response.json().then((body) => {
          console.error('Erreur du serveur:', body.errors);
          toast.error( `${body.errors.join(', ')}`);
        });
      }
      
    }
  };

  return (
    <div className="container bg-gray-200 mx-auto lg:w-3/5 my-5 border border-gray rounded-lg">
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 my-5">
        <div className="w-36 h-36 overflow-hidden rounded-full">
        {previewUrl ?
            <img src={previewUrl} alt="Preview" className="w-60 h-60 mt-5" />
        :
            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='default img' />
        }
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e)}
            className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="sm:w-full lg:w-3/5">
          <label>User name</label>
          <br />
          <input
            type="username"
            placeholder="Votre nom utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
          ></input>
        </div>

        <div className="w-3/5">
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
          ></input>
        </div>
        <div className="w-3/5">
          <button type="submit" className="button-primary-large" onClick={handleSubmit}>Sauvegarder</button>
        </div>
      </form>
    </div>
  );
}