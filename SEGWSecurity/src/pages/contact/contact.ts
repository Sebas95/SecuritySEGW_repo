import { Component,  OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


export class ContactPage{

   /*ngOnInit(){
    alert("yeah perro");
    this.bluetoothSerial.isConnected().then(
        function(){
            this.bluetoothSerial.write('MM');
        },
        function(){
            alert("No esta conectado");
        }
    );
   }*/

  private mov = 0;
  private test = 0;

  constructor(public navCtrl: NavController, public bluetoothSerial: BluetoothSerial) {

  }

  private sendMM(){
    alert("jiji");
    this.bluetoothSerial.write('MM');
  }

  private sendmm(){
    alert("jiji");
    this.bluetoothSerial.write('mm');
  }

  private sendMovement(){
    this.bluetoothSerial.write(String(this.mov));
  }

  private shoot(){
    this.bluetoothSerial.write('T');
  }
  

}
