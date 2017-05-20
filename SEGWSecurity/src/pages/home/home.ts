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

  private connect(){
    this.bluetoothSerial.isEnabled().then(
    function(){
        this.bluetoothSerial.connect('20:17:02:23:24:85').then(
            function(data){
                data.subscribe("\n");
                alert("Conection Suceeded");
            },
            function(){
                alert("Conection failed");
            }
        );
    },
    function(){
        alert("Bluetooth is not enabled");
    }
    );

  }

}
