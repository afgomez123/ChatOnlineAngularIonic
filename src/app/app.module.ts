// Creditos:
// https://github.com/RobotSolar/chatOnline/blob/master/src/app/servicios/chats.service.ts
// https://www.youtube.com/watch?v=ikMrTQvw8MQ&t=632s
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";//Componente principal de la aplicacion
import { AppRoutingModule } from "./app-routing.module";
import { firebaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from "@angular/fire/firestore";
import { ChatComponent } from "./componentes/chat/chat.component";
import { FormsModule } from "@angular/forms";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  // carga los componentes 
  declarations: [AppComponent, ChatComponent],
  entryComponents: [ChatComponent],
  // Carga datos del framework servicios rutas etc es pecifico los modulos
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  // carga servicios y ciertas configuracion en especifico
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  // con componente inicial de carga
  bootstrap: [AppComponent]
})
export class AppModule {}


