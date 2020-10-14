#include <WiFi.h>
#include <PubSubClient.h>
#include <keys.h>
#include <DHT.h>

WiFiClient espClient;
PubSubClient client(espClient);

// Time Configurations
int periodoMuestreo = 2000;
unsigned long lastMsg = 0;

// MQTT Configurations
#define MSG_BUFFER_SIZE (100)
#define TOPIC_BUFFER_SIZE (30)
char msg[MSG_BUFFER_SIZE];
char topic[TOPIC_BUFFER_SIZE];

// Device Configurations
int deviceId = 0;
String altaTopic = clientId + "/alta";
String inTopic = "/actuador";

// DHT Configurations
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup_wifi()
{
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Si el mensaje proviene del topic de alta, corresponde al ID de dispositivo
  if ((String)topic == altaTopic)
  {
    deviceId = atoi((char *)payload);
    inTopic = deviceId + inTopic;
    client.subscribe(inTopic.c_str());
    client.unsubscribe(altaTopic.c_str());
  }

  // Si el mensaje proviene del topic de entrada, ejecuto la acción
  if ((String)topic == inTopic.c_str())
  {
    if ((char)payload[0] == '1')
    {
      digitalWrite(BUILTIN_LED, HIGH);
    }
    else
    {
      digitalWrite(BUILTIN_LED, LOW);
    }
  }
}

void reconnect()
{
  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      client.subscribe(altaTopic.c_str());
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  pinMode(BUILTIN_LED, OUTPUT); // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  Serial.println(mqtt_server);
  client.setServer(mqtt_server, 1884);
  client.setCallback(callback);
  dht.begin();
}

void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > periodoMuestreo)
  {
    lastMsg = now;
    if (deviceId > 0)
    {
      // int temp = random(100);
      // int hum = random(100);
      int temp = int(dht.readTemperature());
      int hum = int(dht.readHumidity());
      if (!isnan(temp) && !isnan(hum))
      {
        snprintf(topic, TOPIC_BUFFER_SIZE, "%d/sensor", deviceId);
        snprintf(msg, MSG_BUFFER_SIZE, "{\"temp\": %d,\"hum\": %d,\"id\": %d}", temp, hum, deviceId);
        Serial.print("Publish message: ");
        Serial.println(msg);
        client.publish(topic, msg);
      }
    }
    else
    {
      snprintf(topic, TOPIC_BUFFER_SIZE, "%d/alta", deviceId);
      snprintf(msg, MSG_BUFFER_SIZE, "{\"clientId\": \"%s\",\"id\": %d}", clientId.c_str(), deviceId);
      Serial.print("Publish message: ");
      Serial.println(msg);
      client.publish(topic, msg);
    }
  }
}
