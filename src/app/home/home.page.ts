import { Component, OnInit } from "@angular/core";
import { AuthService } from "../servicios/auth.service";
import { ChatsService, chat } from "../servicios/chats.service";
import { ModalController } from "@ionic/angular";
import { ChatComponent } from "../componentes/chat/chat.component";
import { ActionSheetController } from "@ionic/angular";
import { Router } from "@angular/router";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public chatsRooms: any = [];
  constructor(
    
    public authService: AuthService,
    public chatsService: ChatsService,
    public modal: ModalController,
    public actionSheetController: ActionSheetController,
    public router:Router,
    private qrScanner: QRScanner 
  ) {}
  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.chatsService.getChatRooms().subscribe(chats => {
      this.chatsRooms = chats;
    });
  }
  openChat(chat) {
    this.modal
      .create({
        component: ChatComponent,
        componentProps: {
          chat: chat
        }
      })
      .then(modal => modal.present());
  }
// Mensaje del desconectar
   async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Opciones",
      buttons: [
        {
          text: "Desconectarse",
          role: "destructive",
          icon: "log-out",
          handler: () => {
            // console.log("Delete clicked");
            this.onLogout();
          }
        },
      
        {
          text: "Escaneo QR",
          role: "destructive",
          icon: "barcode",
          handler: () => {
            // console.log("Delete clicked");
           this.router.navigate(['/lectorqr'])
          }
        },
        {
          text:"Editar Perfil",
          role:"destructive",
          icon:"people",
        },{
        text: "Chats",
        role: "destructive",
        icon: "chatboxes",
        handler: () => {
          // console.log("Delete clicked");
         this.router.navigate(['/home'])
        }
      }      ],
        
    });
    await actionSheet.present();
  }

leerQr(){
  // Optionally request the permission early
this.qrScanner.prepare()
.then((status: QRScannerStatus) => {
   if (status.authorized) {
     // camera permission was granted


     // start scanning
     let scanSub = this.qrScanner.scan().subscribe((text: string) => {
       console.log('Scanned something', text);

       this.qrScanner.hide(); // hide camera preview
       scanSub.unsubscribe(); // stop scanning
     });

   } else if (status.denied) {
     // camera permission was permanently denied
     // you must use QRScanner.openSettings() method to guide the user to the settings page
     // then they can grant the permission from there
   } else {
     // permission was denied, but not permanently. You can ask for permission again at a later time.
   }
})
.catch((e: any) => console.log('Error is', e));


}

}
