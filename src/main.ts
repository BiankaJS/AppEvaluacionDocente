import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, getDoc, doc, getDocs } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const firebaseConfig = environment.firebaseConfig;
initializeApp(firebaseConfig);
const firestore = getFirestore();
const storage = getStorage();
const StorageRef = ref(storage);

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

export const getEvaluaciones = async () => {
  try {
      const querySnapshot = await getDocs(collection(firestore, "evaluaciones"));
      const evaluaciones = querySnapshot.docs.map(doc => doc.data());
      console.log("Evaluaciones data:", evaluaciones);
      return evaluaciones;
  } catch (error) {
      console.error("Error getting documents:", error);
      return [];
  }
};


interface Question {
  PreguntaId: number,
  Pregunta: string,
  Ranking: number
}