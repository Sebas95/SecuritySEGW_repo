import { Component,  OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


export class ContactPage implements OnInit{

   ngOnInit(){
    alert("yeah perro")

   }

  private mov = 0;
  private test = 0;

  constructor(public navCtrl: NavController, public bluetoothSerial: BluetoothSerial) {

  }

  sendMovement(){
    this.test = this.test + 1;
    this.bluetoothSerial.write(this.mov);
  }

  iniciarMovimientoManual(){
    this.bluetoothSerial.write("Mm");
  }
}
