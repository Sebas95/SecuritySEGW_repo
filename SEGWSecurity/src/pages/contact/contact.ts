import { Component,  OnInit, ChangeDetectorRef } from '@angular/core';
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

  private man = false;
  private mov = 0;
  private test = 0;

  constructor(private cdRef:ChangeDetectorRef, public navCtrl: NavController, public bluetoothSerial: BluetoothSerial) {

  }

  private turnOnManual(){
    if(this.man){
        this.bluetoothSerial.write('MM');
    }
    else{
        this.bluetoothSerial.write('mm');
    }
    this.cdRef.detectChanges();
    this.bluetoothSerial.clear();
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
    this.bluetoothSerial.clear();
  }

  private shoot(){
    this.bluetoothSerial.write('T');
    this.bluetoothSerial.clear();
  }
  

}
