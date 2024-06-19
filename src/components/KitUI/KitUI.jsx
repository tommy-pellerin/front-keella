const KitUI = () => {
  return(
    <>
    <h1>Hello world</h1>
    <h2>Hello world</h2>
    <h3>Hello world</h3> 
    {/* h4 et h5 ne sont pas personnalisé */}
    <h4>Hello world</h4>
    <h5>Hello world</h5>
    <p>Hello world</p>
    
    {/* couleurs */}
    <p className="text-primary">Hello world</p>
    <p className="text-secondary">Hello world</p>
    <p className="text-tertiary">Hello world</p>

    {/* boutons */}
    <button className="button-primary-small">Click</button>
    {/* bouton prenant toute la largeur */}
    <button className="button-primary-large">Click</button>

    {/* boutons */}
    <button className="button-green-small">Click</button>
    {/* bouton prenant toute la largeur */}
    <button className="button-green-large">Click</button>

      {/* boutons */}
      <button className="button-red-small">Click</button>
    {/* bouton prenant toute la largeur */}
    <button className="button-red-large">Click</button>

    </>
  )
}

export default KitUI