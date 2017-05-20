
#include <Servo.h> 
#include <SoftwareSerial.h>
// This constant won't change:




//----------------------------PIN DECLARATION CONSTANTS---------------------------------

const int  inSensorSonido = 3;    // the pin that the sound sensor is attached to
const int  inSensorPersonas = 5;  // the pin that the PIR sensor is attached to
const int  inSensorInfrarojo = A5; // the pin that the infrared sensor is attached to
const int  inBluetooth = 3;       // the pin that the bluetooth is attached to
const int  outLaser = 2;       // the pin that the bluetooth is attached to

//-------------------------------GLOBAL VARIABLES ---------------------------------------

Servo myservo;  // create servo object to control a servo 
boolean soundDetectionEnable = true;  //flag that indicates if sound detection is enabled 
int servo_position = 0;    // variable to store the servo position 
boolean DeviceOn = false; 
boolean manualMode = false; 
String message; // message of bluetooth
SoftwareSerial serial (0, 1);   //RX y TX
  



void setup() {
  // initialize the button pin as a input:
  pinMode(inSensorSonido, INPUT);
  // initialize the button pin as a input:
  pinMode(inSensorPersonas, INPUT);
  // initialize the button pin as a input:
  pinMode(inSensorInfrarojo, INPUT);
  // initialize the button pin as a input:
  pinMode(inBluetooth, INPUT);
  // initialize the button pin as a input:
  pinMode(outLaser, OUTPUT);  
  // initialize serial communication:
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object 
  Serial.begin(9600);
  serial.begin(9600); //comunication 
}


void loop() {
  receiveInstructionsFromAndroid();
  //refresh servo initial position
  //int servo_position = 0;
  
  //if bluetooth pairing solicitude is detected (interruption)
  if(manualMode)
  {
    ProcessManualMovement();
  }
  //if device is on and alert detected(interruption) 
  if(alertDetected() && DeviceOn && !manualMode){ 
    //start automatic mode
    ProcessAutaticMovement(); 
  }
   
}



void ProcessManualMovement()  //################################################
{
  
}

void receiveInstructionsFromAndroid()
{
  //Serial.flush(); //send data to android
   while (serial.available()) 
   {    // Mientras que lleguen caracteres por el puerto serial
     delay(5);
     char c = serial.read();     // Lee los caracteres uno a uno en la variable c
     message += c;                 // Almacena la suma de caracteres en el mensaje  
    
   }  
      if (manualMode)
      {
        if (message.toInt()>= 1 &&  message.toInt()<= 180 )
        {
           myservo.write(message.toInt());
           Serial.println(message.toInt());
        }
      }
      if ( message == "D")    {
        DeviceOn=true;
        Serial.println(message);}
       
      if( message == "d") {   
         DeviceOn=false;
         Serial.println(message);}
       
      if( message == "S"){    
        soundDetectionEnable = true;
        Serial.println(message);}
      
      if( message == "s")   {
        soundDetectionEnable = false;
        Serial.println(message);}
        
      if( message == "MM")  {
         manualMode = true;
         Serial.println(message);}
      
      if( message == "mm")    {
         manualMode = false;
         myservo.write(0);
         Serial.println(message);}
      
    message="";
}


//start checking around for intruders, moving servo 3 times 180 degrees
void ProcessAutaticMovement() 
{ 
    giroIzquierdo();
    giroDerecho();
    giroIzquierdo();
    giroDerecho();
    giroIzquierdo();
    giroDerecho();
}

//returns true if motion is detected
boolean motionDetected()
{
  return digitalRead(inSensorPersonas) == 1 && DeviceOn ;
}

//returns true if sound is detected
boolean soundDetected()
{
  return digitalRead(inSensorSonido) == 1 && DeviceOn ;
}

//returns if an alert is happening
boolean alertDetected()
{
  if(soundDetectionEnable) //if sound detection is enabled
  {
    return  ( motionDetected() || soundDetected() )  && DeviceOn;  //checks both sound and motion sensor states
  }
  else
  { 
    return motionDetected() && DeviceOn;  //checks only motion sensor state
  }
}



//returns if the tarjet is localized
boolean tarjetDetected()
{
  
  return analogRead(inSensorInfrarojo) > 250 ;
}

void giroIzquierdo()
{
    while(servo_position < 180)  // goes from 0 degrees to 180 degrees 
    {                          // in steps of 1 degree 
      
      if(tarjetDetected()){
        digitalWrite(outLaser,HIGH);
      }
      else{
        digitalWrite(outLaser,LOW);
        myservo.write(servo_position);              // tell servo to go to position in variable 'pos' 
        servo_position += 1;
      }
     delay(15);  // waits 15ms for the servo to reach the position 
    }
}

void giroDerecho()
{
   servo_position = 180;
    while(servo_position>=1)     // goes from 180 degrees to 0 degrees 
    {             
      
      if(tarjetDetected()){
        digitalWrite(outLaser,HIGH);
      }
      else{
        digitalWrite(outLaser,LOW);
        myservo.write(servo_position);              // tell servo to go to position in variable 'pos' 
        servo_position -= 1;
      }
     delay(15);  // waits 15ms for the servo to reach the position 
    }
}

