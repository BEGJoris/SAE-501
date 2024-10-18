export interface PredictionInterface {
    bbox: [number, number, number, number]; // Les coordonnées du rectangle de la boîte englobante
    class: string; // Le nom de la classe (par exemple, 'person', 'car')
    score: number; // La confiance de la prédiction (entre 0 et 1)
  }
  