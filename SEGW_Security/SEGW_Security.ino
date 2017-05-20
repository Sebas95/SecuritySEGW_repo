
#include <Servo.h> 
// This constant won't change:




//----------------------------PIN DECLARATION CONSTANTS---------------------------------

const int  inSensorSonido = 3;    // the pin that the sound sensor is attached to
const int  inSensorPersonas = 5;  // the pin that the PIR sensor is attached to
const int  inSensorInfrarojo = A5; // the pin that the infrared sensor is attached to
const int  inBluetooth = 3;       // the pin that the bluetooth is attached to
const int  outLaser = 2;       // the pin that the bluetooth is attached to

//-------------------------------GLOBAL VARIABLES ---------------------------------------

Servo myservo;  // create servo object to control a servo 
boolean soundDetectionEnable = true;  //flag that indicates if sound detection is enabled  //################################################
int servo_position = 0;    // variable to store the servo position 

boolean DeviceOn = true;  //################################################

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
}


void loop() {
  
  //refresh servo initial position
  int servo_position = 0;
  
  //if bluetooth pairing solicitude is detected (interruption)
  if(requestForManualControl())
  {
    ProcessManualMovement();
  }
  //if device is on and alert detected(interruption) 
  if(alertDetected() && DeviceOn){ 
    //start automatic mode
    ProcessAutaticMovement(); 
  }
   
}

boolean requestForManualControl()  //################################################
{
  return false;
}

void ProcessManualMovement()  //################################################
{
  
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
  return digitalRead(inSensorPersonas) == 1;
}

//returns true if sound is detected
boolean soundDetected()
{
  return digitalRead(inSensorSonido) == 1;
}

//returns if an alert is happening
boolean alertDetected()
{
  if(soundDetectionEnable) //if sound detection is enabled
  {
    return  motionDetected() || soundDetected()  ; //checks both sound and motion sensor states
  }
  else
  { 
    return motionDetected(); //checks only motion sensor state
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

