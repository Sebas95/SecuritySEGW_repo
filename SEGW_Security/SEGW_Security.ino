

// This constant won't change:

const int  inSensorSonido = 2;    // the pin that the pushbutton is attached to
const int  inSensorPersonas = 2;  // the pin that the pushbutton is attached to
const int  inSensorInfrarojo = 2; // the pin that the pushbutton is attached to
const int  inBluetooth = 2;       // the pin that the pushbutton is attached to

int estadoInSonido = 0;




void setup() {
  // initialize the button pin as a input:
  pinMode(inSensorSonido, INPUT);
  // initialize the button pin as a input:
  pinMode(inSensorPersonas, INPUT);
  // initialize the button pin as a input:
  pinMode(inSensorInfrarojo, INPUT);
  // initialize the button pin as a input:
  pinMode(inBluetooth, INPUT);
  // initialize serial communication:
  Serial.begin(9600);
}


void loop() {
  // read the pushbutton input pin:
  estadoInSonido = digitalRead(inSensorSonido);
  
}









