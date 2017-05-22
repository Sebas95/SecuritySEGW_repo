import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{


  ngOnInit(){
    this.bluetoothSerial.subscribe('.').subscribe(data => this.alertem(data));
   }
   
  private status = false; 
  onhh = false;
  private son = true;
  private alertSound = false;
  private alertMovement = false
  private alerta = false;

  constructor(private cdRef:ChangeDetectorRef, public navCtrl: NavController, private zone: NgZone, private bluetoothSerial: BluetoothSerial) {
        
  }

  public alertem(carac){
    if(carac.includes("M")){
      alert("Movement Alert");
      this.alertMovement = true;
      setTimeout(() => {this.alertMovement = false;this.cdRef.detectChanges();}, 10000);
      this.cdRef.detectChanges();
      this.bluetoothSerial.clear();
    }
    else{
      if(carac.includes("S")){
        alert("Sound Alert");
        this.alertSound = true;
        setTimeout(() => {this.alertSound = false;this.cdRef.detectChanges();}, 10000);
        this.cdRef.detectChanges();
        this.bluetoothSerial.clear();
      }
      else{
        this.bluetoothSerial.clear();  
      }
      
    }
  };

  changeNotification(data){
    if(data=='M -'){
      alert("alerta2");
    }
  };

   turnOnDevice(){ 
    if(!this.status){
       this.bluetoothSerial.write("D");
       this.bluetoothSerial.clear();      
    }
    else{
        this.bluetoothSerial.write("d");
        this.bluetoothSerial.clear();
    }
    this.status = !this.status;
  };


  turnOnSound(){
    if(this.son){
        this.bluetoothSerial.write('S');
        this.cdRef.detectChanges();
        this.bluetoothSerial.clear();
    }
    else{
        this.bluetoothSerial.write('s');
        this.bluetoothSerial.clear();
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
