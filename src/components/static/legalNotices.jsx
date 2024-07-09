import { Helmet } from "react-helmet";

const LegalNotices = () => {
  return (
    <>
      <Helmet>
        <title>Keella | Mentions légales</title>
        <meta name="description" content="Mentions légales" />
      </Helmet>
      <div className="background-blue-500">
        <h1 className="text-center">Conditions d&apos;utilisation</h1>
      </div>
      <div className="mx-5">
        <p>
          Le site Internet{" "}
          <a href="https://www.front-keella.vercel.app" target="_blank">
            www.front-keella.vercel.app
          </a>
          , ci-après dénommé « Keella », propose un service de mise en relation
          de sportifs cherchant des partenaires ou équipes pour des Activités
          Sportives.
        </p>

        <p>
          L&apos;accès au site, sa consultation et son utilisation sont
          subordonnés à l&apos;acceptation sans réserve des présentes{" "}
          <a href="/terms-of-use">
            Conditions Générales d&apos;Utilisation de Keella
          </a>
          .
        </p>

        <p>Éditeur du site :</p>
        <ul>
          <li>Keella SAS</li>
          <li>Société par Actions Simplifiée au capital de 1000 euros</li>
          <li>
            Immatriculée au registre du commerce et des sociétés de Paris sous
            le numéro 123456789
          </li>
          <li>
            Siège social : 123 boulevard de strasbourg, 94130 Nogent sur Marne
          </li>
        </ul>

        <p>Directeur de la publication :</p>
        <ul>
          <li>Monsieur Tommy Pellerin</li>
        </ul>

        <p>Numéro de TVA intracommunautaire : FR12345678901</p>

        <p>
          Pour toute question ou réclamation concernant le site Keella, vous
          pouvez nous contacter à l&apos;adresse suivante :{" "}
          <a href="mailto:contact@keella.com">contact@keella.com</a>.
        </p>
      </div>
    </>
  );
};

export default LegalNotices;
