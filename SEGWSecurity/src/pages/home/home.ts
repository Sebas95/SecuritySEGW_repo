import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Observable } from 'rxjs/Observable';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AboutPage]
})
export class HomePage {

  static testVariable = "Prueba global";
  constructor(public about: AboutPage, public navParams: NavParams, public navCtrl: NavController, private bluetoothSerial: BluetoothSerial) {
        this.about = about;
        //console.log(navParams.data.alerts);
  }

  connect2(){
    var variable = this.bluetoothSerial.connect('20:17:02:23:24:85');
    variable.subscribe(data => alert(data));
    //this.bluetoothSerial.subscribe('-').subscribe(data => {this.changeNotification(data)});
    //this.bluetoothSerial.subscribe('-').subscribe(data => {this.about.alertew()});
  }

  changeNotification(data){
    if(data=='M -'){
      //this.alerTest = 'Asas'
      alert("alerte M1");
    }
    else if(data=='S -'){
      //this.alertTest = 'EEEE'
      alert("alerte S1"); 
    }
    else{
      alert("alerte A1");
      //this.alertTest = 'wewewe'
    }
  };

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
