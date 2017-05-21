import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial) {
        
  }

  connect2(){
    var variable = this.bluetoothSerial.connect('20:17:02:23:24:85');
    variable.subscribe();
  
  }

  private connect(){
    this.bluetoothSerial.isEnabled().then(
    function(){
        var data = this.bluetoothSerial.connect('20:17:02:23:24:85');
        data.subscribe();
    },
    function(){
        alert("Bluetooth is not enabled");
    }
    );

  }

}
