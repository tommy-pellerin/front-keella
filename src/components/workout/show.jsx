import { useState } from "react"

const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
  }
  return(
    <>
      <div className="border border-black my-5">
        Images
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 my-5">
          
          <div className="col-span-2">
            <div>
              <h1>Titre</h1>
              <p>petite description</p>
              <div>Notes</div>
            </div>
            <div>
              <p>Description</p>
            </div>                      
          </div>

          <div className="col-span-1">
            Reservation
            <h2>Prix :</h2>
            <p>Data</p>
            <p>Debut</p>
            <p>Fin</p>
            <p>durée</p>
            <div>
              <p>Nombre de place : {quantity}</p>
              <div className="flex justify-around">
                <button className="border" onClick={increaseQuantity}>+</button>
                <button className="border" onClick={decreaseQuantity}>-</button>
              </div>  
            </div>
            <button className="border">Envoyer une demande de réservation</button>
          </div>
        </div>

        <div className="my-5">
          Commentaires
        </div>
      </div>
    </>
  )
}

export default WorkoutShow