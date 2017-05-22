import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AboutPage]
})

  /**
  *** This class is in charge of the initial connection of the device 
  **/
export class HomePage {

 /* ------------------------- Class attributes --------------------------------- */

 /* ------------------------- Class methods ------------------------------------ */

  /**
  ***  Constructor of the class 
  ***  navParams Initial Params of the class
  ***  nacCtrl controler of the navigation
  ***  bluetoothSerial Connection to the device with bluetooth
  **/
  constructor(public about: AboutPage, public navParams: NavParams, public navCtrl: NavController, private bluetoothSerial: BluetoothSerial) {
        this.about = about;
  }

  /**
  *** This method is in charge of the connection with bluetooth
  **/

  connect2(){
    var variable = this.bluetoothSerial.connect('20:17:02:23:24:85'); /*Connect to MAC of device*/
    variable.subscribe(data => alert("Conection succeeded")); /*Subscribe to connect*/
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
