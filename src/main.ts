import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const firebaseConfig = environment.firebaseConfig;
initializeApp(firebaseConfig);
const firestore = getFirestore();

export const saveUser = async (userid: number | undefined, token: string | undefined) => {
  if (!userid ||!token) {
    throw new Error("userid o token no pueden ser undefined");
  }

  return await addDoc(collection(firestore, "login"), {userid, token});
};

export const saveResult = async (UserId: number, TeacherId: number, Questions: [Question]) => {
  if (!UserId ||!TeacherId) {
    throw new Error("Both UserId and TeacherId must be defined.");
  }
  
  return await addDoc(collection(firestore, "evaluaciones"), {UserId, TeacherId, Questions});
}


interface Question {
  PreguntaId: number,
  Pregunta: string,
  Ranking: number
}