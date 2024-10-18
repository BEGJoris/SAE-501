import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';


import { PredictionInterface } from '../interfaces/predictions.interface';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.page.html',
  styleUrls: ['./detection.page.scss'],
})
export class DetectionPage implements OnInit {
  @ViewChild('video', { static: true })
  video!: ElementRef;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef;

  
  model: any;

  constructor() {}

  async ngOnInit() {
    await tf.setBackend('webgl');
    await tf.ready();
    // Charge le modèle COCO-SSD
    this.model = await cocoSsd.load();
  }

  ngAfterViewInit() {
    const screenHeight = window.innerHeight
    const screenWidth = window.innerWidth;
    // Accéder à la caméra
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: { ideal: 'environment' },
          width: { ideal: screenWidth },
          height: { ideal:screenHeight }
         }, audio: false,
          // Utiliser la caméra arrière par défaut

      }).then(stream => {
        this.video.nativeElement.srcObject = stream;

        // Démarrer la détection une fois la vidéo prête
        this.video.nativeElement.onloadeddata = () => {
          this.detectFrame(this.video.nativeElement);
        };
      });
    }
  }

  detectFrame(video: HTMLVideoElement) {
    if (!this.model) {
      console.error('Modèle non chargé !');
      return;
    }
    this.model.detect(video).then((predictions: PredictionInterface[]) => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video);
      });
    }).catch((error: any) => {
      console.error('Erreur lors de la détection : ', error);
    });
  }

  renderPredictions(predictions: PredictionInterface[]) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Ajuster la taille du canvas à celle de la vidéo
    const videoWidth = this.video.nativeElement.videoWidth;
    const videoHeight = this.video.nativeElement.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Effacer le canvas avant chaque nouveau dessin
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Dessiner chaque prédiction
    predictions.forEach((prediction: PredictionInterface) => {
      const [x, y, width, height] = prediction.bbox;

      // Dessiner un rectangle autour de l'objet détecté
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'green';
      ctx.fillStyle = 'green';
      ctx.stroke();

      // Ajouter le texte du label et le score
      ctx.font = '18px Arial';
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  }
}
