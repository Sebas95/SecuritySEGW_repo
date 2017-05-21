import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
   
  private status = false; 
  onhh = false;
  private son = true;

  constructor(private bluetoothSerial: BluetoothSerial) {
        
  }

   turnOnDevice(){ 
    if(!this.status){
       this.bluetoothSerial.write("D");        
    }
    else{
        this.bluetoothSerial.write("d");
    }
    this.status = !this.status;
  };


  turnOnSound(){
    if(this.son){
        this.bluetoothSerial.write('S');
    }
    else{
        this.bluetoothSerial.write('s');
    }
  };

  listBluetooth(){
    this.bluetoothSerial.list().then(function(data){
        alert(data[0].id.toString());
        this.variable = data[0].id;
    });
  }

  bluetoothEnabled(){
    this.bluetoothSerial.isEnabled().then(function(data){
        alert('Enabled');
    });
  }

  bluetoothConected(){
      this.bluetoothSerial.isConnected().then(function(data){
        alert('Conected');
    },function(data){
        alert('NOT Conected');
    });

  }

  connectHc(){
    var blue = this.bluetoothSerial.connect('20:17:02:23:24:85');
    blue.subscribe();
  }
  
  onLed(){
    alert('Si se envia');
    this.bluetoothSerial.write('D');

  }

  onLed2(){
    this.onhh = false;
    alert('Si se envia');
    this.bluetoothSerial.write('D');

  }

}
