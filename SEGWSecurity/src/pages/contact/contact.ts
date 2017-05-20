import { Component,  OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


export class ContactPage implements OnInit{

   ngOnInit(){
    alert("yeah perro");
    this.bluetoothSerial.isConnected().then(
        function(){
            this.bluetoothSerial.write("Mm");
        },
        function(){
            alert("No esta conectado");
        }
    );
   }

  private mov = 0;
  private test = 0;

  constructor(public navCtrl: NavController, public bluetoothSerial: BluetoothSerial) {

  }

  private sendMovement(){
    //this.test = this.test + 1;
    //this.bluetoothSerial.write(this.mov);

    this.bluetoothSerial.isConnected().then(
        function(){
            this.bluetoothSerial.write(this.mov);
        },
        function(){
            alert("No esta conectado");
        }
    );
  }

  

}
