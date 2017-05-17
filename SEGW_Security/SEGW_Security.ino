

// This constant won't change:

const int  inSensorSonido = 3;    // the pin that the sound sensor is attached to
const int  inSensorPersonas = 5;  // the pin that the PIR sensor is attached to
const int  inSensorInfrarojo = A5; // the pin that the infrared sensor is attached to
const int  inBluetooth = 3;       // the pin that the bluetooth is attached to
const int  outLaser = 2;       // the pin that the bluetooth is attached to

int estadoInSonido = 0;
int estadoInInfrarojo = 0;
int estadoOutLaser = 0;



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
  Serial.begin(9600);
}


void loop() {
  // read the pushbutton input pin:
  estadoInSonido = digitalRead(inSensorSonido);
  estadoInInfrarojo = analogRead(inSensorInfrarojo);
  //Serial.println(estadoInInfrarojo);
  
  Serial.println(estadoInSonido);
  
  if(estadoInInfrarojo > 130){
    digitalWrite(outLaser,HIGH);
  }
  else{
    digitalWrite(outLaser,LOW);
  }
  delay(50);
  
}
