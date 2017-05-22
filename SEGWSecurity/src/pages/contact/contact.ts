import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


  /**
  *** This class is in charge of the manual mode of the device 
  **/

export class ContactPage{


  private man = false; /*Boolean to the manual checkbox*/
  private mov = 0;  /*Value of movement of the device*/


  /**
  ***  Constructor of the class 
  ***  cdRef To refresh GUI
  ***  nacCtrl controler of the navigation
  ***  bluetoothSerial Connection to the device with bluetooth
  **/

  constructor(private cdRef:ChangeDetectorRef, public navCtrl: NavController, public bluetoothSerial: BluetoothSerial) {

  }

  /** 
  ** This method turn on or off the manual mode of the device 
  **/

  private turnOnManual(){
    if(this.man){
        this.bluetoothSerial.write('MM'); /*Writes MM to turn on the manual mode*/
    }
    else{
        this.bluetoothSerial.write('mm'); /*Writes mm to turn off the manual mode*/
    }
    this.cdRef.detectChanges(); /*Refresh GUI*/
    this.bluetoothSerial.clear(); /*Flush the serial*/
  }

  /**
  **  This method is in charge of send movement to the device
  **/

  private sendMovement(){
    /*Cast the int value of the movement and send it as String*/
    this.bluetoothSerial.write(String(this.mov)); 
    this.bluetoothSerial.clear();
  }

  /**
  ** This method is in charge of send the signal to make an alert with laser 
  **/
  private shoot(){
    this.bluetoothSerial.write('T'); /*Send T to make the alert*/
    this.bluetoothSerial.clear(); 
  }
  

}
