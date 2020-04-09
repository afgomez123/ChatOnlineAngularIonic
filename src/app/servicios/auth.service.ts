import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => rejected(err));
    });
  }

  // ejemplo de la ejecucion del codigo sin la promesa
  //   this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res => {
  //     console.log("Estas logueado:" + res);
  //   })
  //   .catch(err => console.log("Error: " + err));
  // }
  //

  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
  // Registro del usuario
  register(email: string, password: string, name: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
          // aca posdemos crear el usuario despues de acceder al sistema de autenticacion de google
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db
            .collection("users")
            .doc(uid)
            .set({
              name: name,
              password:password,
              uid: uid
            });
        })
        .catch(err => reject(err));
    });
  }
}
