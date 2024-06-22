  // Fonction pour mettre à jour le statut des réservations
  const updateReservationStatus = async (workoutId, reservationId, newStatus) => {
    console.log(`Mise à jour de la réservation ${reservationId} pour le workout ${workoutId} avec le nouveau statut: ${newStatus}`);
  
    // Trouver la réservation correspondant à l'ID
    const workoutToUpdate = workoutData.find(workout => workout.id === workoutId);
    console.log('Workout trouvé:', workoutToUpdate);
  
    const reservationToUpdate = workoutData.find(workout => workout.id === workoutId)
      ?.reservations.find(reservation => reservation.id === reservationId);
    console.log('Réservation à mettre à jour:', reservationToUpdate);
  
    if (!reservationToUpdate) {
      console.error('Réservation non trouvée pour cet ID:', reservationId);
      return;
    }
  
    // Mettre à jour l'objet workoutData avec le nouveau statut
    const updatedWorkoutData = workoutData.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          reservations: workout.reservations.map(reservation => {
            if (reservation.id === reservationId) {
              return { ...reservation, status: newStatus };
            }
            return reservation;
          })
        };
      }
      return workout;
    });
  
    console.log('Données mises à jour:', updatedWorkoutData);
    // Préparer les données pour l'envoi
    const reservationData = { status: newStatus };
    console.log('Données à envoyer:', reservationData);
  
    // Appeler la méthode updateData pour envoyer les modifications au serveur
    try {
      const response = await updateData(`/reservations/${reservationId}`, { status: newStatus }, [], true);
      console.log('Réponse du serveur:', response);
      if (response) {
        // Si la réponse est positive, mettre à jour l'état local avec les nouvelles données
        setWorkoutData(updatedWorkoutData);
      }
    } catch (error) {
      // Gérer l'erreur ici
      console.error('Erreur lors de la mise à jour du statut de la réservation', error);
    }
  };