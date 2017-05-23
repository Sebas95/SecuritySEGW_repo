import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

  /**
  *** This class is in charge of the basic settings of the device 
  *** Implements OnInit in order to call a function when the page initialize
  **/
export class AboutPage implements OnInit{

  /** ngOnInit
  **  This method call the bluetooth instance to subscribe to be notified when data arrived
  **  The dot is the delimiter used in this case
  **/
  ngOnInit(){
    /* Notifies when dot arrives and call the function alertem with the data arrived*/
    this.bluetoothSerial.subscribe('.').subscribe(data => this.alertem(data));
    this.bluetoothSerial.write("O"); //Writes O to check for device status
    //this.bluetoothSerial.clear();
   }
   
   /* ------------------------- Class attributes --------------------------------- */

  private status = false; 
  onhh = false;
  private son = true;
  private alertSound = false;
  private alertMovement = false;
  private initFlagStatus = true;


   /* ------------------------- Class methods --------------------------------- */

  /** Constructor of the class 
  **  Takes the following instances
  **  cdRef to refresh GUI 
  **  navCtrl to navigate in Tabs
  **  bluetoothSerial to make connection to embebed sistem
  **/
  constructor(private cdRef:ChangeDetectorRef, public navCtrl: NavController, private zone: NgZone, private bluetoothSerial: BluetoothSerial) {
        
  }

  /** alertem(String carac)
  **  carac: Received caracter from bluetooth
  **  This methos compare the data from the serial comunication and 
  **  decides if it is an alert or just noise
  **/

  public alertem(carac){
    if(carac.includes("M")){ /*If M is in the data then it is a movement alert*/
      alert("Movement Alert"); /*Alert to user*/
      this.alertMovement = true; /*To make label visible*/
      /* After 10 seconds turn off the label*/
      setTimeout(() => {this.alertMovement = false;this.cdRef.detectChanges();}, 10000);
      this.cdRef.detectChanges(); /*refresh GUI*/
      this.bluetoothSerial.clear(); /* Flush the serial */
    }
    else{
      if(carac.includes("S")){ /*If has and S then it is sound alert*/
        alert("Sound Alert");
        this.alertSound = true;
        setTimeout(() => {this.alertSound = false;this.cdRef.detectChanges();}, 10000);
        this.cdRef.detectChanges();
        this.bluetoothSerial.clear();
      }
      else{
        if(carac.includes("Y") && this.initFlagStatus){ /*If D then the initial condition id D*/
          this.status = true; /*Set the checkbox true*/
          this.cdRef.detectChanges();
          this.initFlagStatus = false; /*To avoid entering a second time here after init*/
          this.bluetoothSerial.clear();;
        }
        else{
          this.bluetoothSerial.clear();  
        }
      }
      
    }
  };

 /** public alertem(carac){
    alert(carac);
    if(carac.includes("M")){ //If M is in the data then it is a movement alert
      alert("Movement Alert"); //Alert to user/
      this.alertMovement = true; //To make label visible/
      // After 10 seconds turn off the label/
      setTimeout(() => {this.alertMovement = false;this.cdRef.detectChanges();}, 10000);
      this.cdRef.detectChanges(); //refresh GUI/
      this.bluetoothSerial.clear(); // Flush the serial /
    }
    else{
      if(carac.includes("S")){ //If has and S then it is sound alert/
        alert("Sound Alert");
        this.alertSound = true;
        setTimeout(() => {this.alertSound = false;this.cdRef.detectChanges();}, 10000);
        this.cdRef.detectChanges();
        this.bluetoothSerial.clear();
      }
      else{
        if(carac.includes("Y")){ //If D then the initial condition id D/
          if(this.initFlagStatus){
            this.onhh = true; //Set the checkbox true/
            this.cdRef.detectChanges();
            this.initFlagStatus = false; //To avoid entering a second time here after init/
            this.bluetoothSerial.clear();
            alert('Aqui entre');
          }
          else{
            this.onhh = false; //Set the checkbox false/
            this.cdRef.detectChanges();
            this.bluetoothSerial.clear();
          }
        }
        else{
          this.bluetoothSerial.clear();  
        }
      }
      
    }
  };*/

  changeNotification(data){
    if(data=='M -'){
      alert("alerta2");
    }
  };


  /** This method turn on or off the device
  **  
  **
  **/

   turnOnDevice(){ 
    /*Subscribe bluetoth to detects . and then do the call to function */
    //this.bluetoothSerial.subscribe('.').subscribe(data => this.alertem(data));
    if(!this.status){ /*If device is off*/
       this.bluetoothSerial.write("D"); /* Send D to turn it on */
       this.bluetoothSerial.clear();      
    }
    else{ /*Device is on*/
        this.bluetoothSerial.write("d"); /*Send d to turn it off*/
        this.bluetoothSerial.clear();
    }
    this.status = !this.status;
    this.cdRef.detectChanges(); /*refresh GUI*/
  };

  /** This method is used to turn on and off the sound
  **
  **
  **/
  turnOnSound(){
    if(this.son){ /*If sound off*/
        this.bluetoothSerial.write('S'); /*Send S to turn it on*/
        this.cdRef.detectChanges(); /*Refresh GUI*/
        this.bluetoothSerial.clear(); 
    }
    else{ /*If sound on*/
        this.bluetoothSerial.write('s'); /*Send s to turn it off*/
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
