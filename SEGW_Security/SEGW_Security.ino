
#include <Servo.h> 
// This constant won't change:


Servo myservo;  // create servo object to control a servo 
boolean soundDetectionEnable = true;  //flag that indicates if sound detection is enabled
int pos = 0;    // variable to store the servo position 

const int  inSensorSonido = 3;    // the pin that the sound sensor is attached to
const int  inSensorPersonas = 5;  // the pin that the PIR sensor is attached to
const int  inSensorInfrarojo = A5; // the pin that the infrared sensor is attached to
const int  inBluetooth = 3;       // the pin that the bluetooth is attached to
const int  outLaser = 2;       // the pin that the bluetooth is attached to

int estadoInSonido = 0;
int estadoInInfrarojo = 0;
int estadoOutLaser = 0;
int estadoInPersonas = 0;



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
  // read the pushbutton input pin:
  estadoInSonido = digitalRead(inSensorSonido);
  estadoInInfrarojo = analogRead(inSensorInfrarojo);
  estadoInPersonas = digitalRead(inSensorPersonas);
  int pos = 0;
  
  Serial.println(estadoInPersonas); 
  
  
  if(alertDetected()){
    ProcessAutaticMovement() 
  }
   
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
  return estadoInPersonas == 1;
}

//returns true if sound is detected
boolean soundDetected()
{
  return estadoInSonido == 1;
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
  estadoInInfrarojo = analogRead(inSensorInfrarojo);
  return estadoInInfrarojo > 250 ;
}

void giroIzquierdo()
{
    while(pos < 180)  // goes from 0 degrees to 180 degrees 
    {                          // in steps of 1 degree 
      
      if(tarjetDetected()){
        digitalWrite(outLaser,HIGH);
      }
      else{
        digitalWrite(outLaser,LOW);
        myservo.write(pos);              // tell servo to go to position in variable 'pos' 
        pos += 1;
      }
     delay(15);  // waits 15ms for the servo to reach the position 
    }
}

void giroDerecho()
{
   pos = 180;
    while(pos>=1)     // goes from 180 degrees to 0 degrees 
    {             
      
      if(tarjetDetected()){
        digitalWrite(outLaser,HIGH);
      }
      else{
        digitalWrite(outLaser,LOW);
        myservo.write(pos);              // tell servo to go to position in variable 'pos' 
        pos -= 1;
      }
     delay(15);  // waits 15ms for the servo to reach the position 
    }
}

