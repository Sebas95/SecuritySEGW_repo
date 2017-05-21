import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial) {
        
  }

  connect2(){
    var variable = this.bluetoothSerial.connect('20:17:02:23:24:85');
    variable.subscribe(data => alert(data));
    this.bluetoothSerial.subscribe('.').subscribe(data => alert(data));
  }

  private alerte(data){
    alert(data);
  }

  private connect(){
    this.bluetoothSerial.isEnabled().then(
    function(){
        var data = this.bluetoothSerial.connect('20:17:02:23:24:85');
        data.subscribe('.',function(data){
            alert(data);
        },function(data){}        
        );
    },
    function(){
        alert("Bluetooth is not enabled");
    }
    );

  }

}
