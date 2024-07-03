import { Helmet } from "react-helmet";
const Help = () => {
  return (
    <>
      <Helmet>
        <title>Keella | Aide & F.A.Q</title>
        <meta name="description" content="Aide et questions fréquentes" />
      </Helmet>
      <div className="container mx-auto my-5">
        <div className="background-blue-500">
          <h1 className="text-center">Aide</h1>
        </div>
        <div className="flex flex-wrap mt-1 mb-5">
          <div className="w-full md:w-1/2 p-2">
            <div className="h-full p-5 rounded-lg shadow-lg bg-gray-50">
              <div>
                <h5 className="text-center text-lg font-semibold mb-4">
                  Je suis propriétaire
                </h5>
                <div>
                  <p>1. Je dépose mon annonce gratuitement sur la plateforme</p>
                  <p>
                    Cliquez sur &quot;Créer une annonce&quot; (présent dans le
                    menu) pour déposer votre annonce en un clic. Ajoutez les
                    détails de vos équipements et fixez vous-même le prix de la
                    location. N&apos;oubliez pas d&apos;y insérer quelques
                    photos !
                  </p>
                  <p>2. Je reçois des demandes de réservation</p>
                  <p>
                    Dès que vous recevez une demande, vous avez la possibilité
                    d&apos;accepter ou de refuser celle-ci en fonction de vos
                    disponibilités.
                  </p>
                  <p> 3. J&apos;accueille les sportifs</p>
                  <p>
                    Le jour venu, vous accueillez les locataires pour
                    qu&apos;ils puissent disposer librement des équipements.
                  </p>
                  <p>4. Je perçois le règlement</p>
                  <p>
                    Vous recevez automatiquement le montant de la transaction
                    sur votre compte bancaire dans un délai de 3 à 10 jours.
                  </p>
                  <p>5. Je laisse un avis sur la plateforme</p>
                  <p>
                    Une fois la location effectuée, vous avez la possibilité de
                    laisser un commentaire pour faire part de votre expérience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <div className="h-full p-5 rounded-lg shadow-lg bg-gray-50">
              <div>
                <h5 className="text-center text-lg font-semibold mb-4">
                  Je suis locataire
                </h5>
                <div>
                  <p>1. Je cherche des équipements</p>
                  <p>
                    Entrez la localisation souhaitée dans la barre de recherche
                    et sélectionnez les équipements dont vous avez besoin. Vous
                    avez la possibilité de voir le profil du propriétaire afin
                    de voir des informations supplémentaires.
                  </p>
                  <p>2. Je recharge mes crédits</p>
                  <p>
                    Dans la version actuelle, Keella utilise un systeme de
                    crédits internes. Les locataires doivent acheter les crédits
                    pour pouvoir réserver.
                  </p>
                  <p>2. Je réserve en ligne</p>
                  <p>
                    Réservez les équipements ou l&apos;infrastructure en
                    sélectionnant la date de la location. Vous ne serez pas
                    facturé immédiatement.
                  </p>
                  <p>3. Je prépare ma venue</p>
                  <p>
                    Une fois votre demande de réservation acceptée, vous pourrez
                    prendre connaissance de l&apos;adresse exacte de la
                    location. Il ne vous reste plus qu&apos;à préparer vos
                    muscles !
                  </p>
                  <p>4. Je profite de ma séance de sport</p>
                  <p>
                    Le jour J est arrivé ! Profitez d&apos;une séance de sport
                    avec un matériel de qualité.
                  </p>
                  <p>5. Je laisse un avis sur la plateforme</p>
                  <p>
                    C&apos;est déjà fini... N&apos;hésitez pas à laisser un
                    commentaire sur la qualité de l&apos;accueil que vous avez
                    reçu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background-blue-500">
          <h1 className="text-center">F.A.Q</h1>
        </div>
        <h3 className="text-center m-4">
          Quelques questions qui reviennent souvent
        </h3>
        <div className="flex flex-wrap mt-1 mb-5">
          <div className="w-full md:w-1/2 p-2">
            <div className="h-full p-5 rounded-lg shadow-lg bg-gray-50">
              <div>
                <h5 className="text-center text-lg font-semibold mb-4">
                  Je suis propriétaire
                </h5>
                <div>
                  <p>
                    1.Est-ce qu&apos;un locataire peut me régler en liquide ?
                  </p>
                  <p>
                    Non, n&apos;acceptez jamais une location en dehors du site.
                    Aucun règlement en liquide n&apos;est autorisé pour payer
                    une location. Pourquoi ? Parce qu&apos;en cas
                    d&apos;accident ou de vol, vous ne serait pas assurée par
                    Keella. Le paiement en ligne est un gage de sécurité pour
                    vous, ne prenez pas de risques inutiles en contournant le
                    paiement sur le site.
                  </p>
                  <p>2. Quand suis-je crédité ?</p>
                  <p>
                    Vous serez crédité sur votre compte par virement entre 3 et
                    5 jours après la réalisation de la réservation.
                  </p>
                  <p>
                    3. Que se passe-t-il si le locataire ne se présente pas ou
                    est en retard ?
                  </p>
                  <p>
                    Si le locataire ne se présente pas au lieu de rendez-vous au
                    plus tard dans un délai de 30 minutes à compter de
                    l&apos;heure convenue, aucun remboursement ne pourra être
                    effectué.
                  </p>
                  <p>4. Comment contacter le locataire ?</p>
                  <p>
                    Dans la version actuelle de Keella, il n&apos;y a pas de
                    messagerie, vous pouvez contacter vos clients par mail via
                    &ldquo;mon compte &gt; mes annonces &gt; contacter le
                    client&ldquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <div className="h-full p-5 rounded-lg shadow-lg bg-gray-50">
              <div>
                <h5 className="text-center text-lg font-semibold mb-4">
                  Je suis locataire
                </h5>
                <div>
                  <p>1. Quels sont les moyens de paiement acceptés ?</p>
                  <p>
                    Actuellement, Keella n&apos;accepte que les paiements par
                    carte bancaire. Tout paiement en espèces ou en dehors du
                    site est considéré comme une infraction aux conditions
                    générales d&apos;utilisation et constitue un motif de
                    bannissement de la communauté. Utiliser notre plateforme
                    permet d&apos;une part la protection de vos données, et
                    d&apos;autre part une assurance en cas de problème.
                  </p>
                  <p>2. Quand serai-je débité ?</p>
                  <p>Vous êtes débité dès que le paiement est passé.</p>
                  <p>3. Réservation : le propriétaire ne me répond pas/plus</p>
                  <p>
                    Avant acceptation de la réservation, Il peut arriver que
                    certains propriétaires ne répondent pas ou ne soient pas
                    libres, il est donc conseillé d&apos;envoyer un message à
                    plusieurs propriétaires différents avant de réserver pour
                    s&apos;assurer de leurs disponibilités avant
                    d&apos;effectuer une demande de réservation.
                  </p>
                  <p>4. Comment contacter l&apos;hote ?</p>
                  <p>
                    Dans la version actuelle de Keella, il n&apos;y a pas de
                    messagerie, vous pouvez contacter votre hote par mail via
                    &ldquo;mon compte &gt; mes réservations &gt; contacter
                    l&apos;hote&ldquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
