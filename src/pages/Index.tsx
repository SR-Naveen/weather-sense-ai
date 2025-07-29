import { useState } from "react";
import WeatherForm from "@/components/WeatherForm";
import WeatherPrediction from "@/components/WeatherPrediction";
import { useToast } from "@/hooks/use-toast";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudCover: string;
  season: string;
  location: string;
}

const Index = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock prediction function - in a real app, this would call your ML API
  const predictWeather = async (data: WeatherData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction logic based on the input data
      let weatherType = "";
      
      if (data.temperature > 30 && data.humidity < 40) {
        weatherType = "sunny_hot";
      } else if (data.temperature < 0) {
        weatherType = "snowy";
      } else if (data.humidity > 80 && data.pressure < 1010) {
        weatherType = "rainy";
      } else if (data.windSpeed > 25) {
        weatherType = "windy";
      } else if (data.cloudCover === "overcast" && data.pressure < 1000) {
        weatherType = "stormy";
      } else if (data.cloudCover === "clear" && data.temperature > 20) {
        weatherType = "sunny";
      } else if (data.cloudCover === "partly_cloudy") {
        weatherType = "partly_cloudy";
      } else {
        weatherType = "cloudy";
      }
      
      setPrediction(weatherType);
      
      toast({
        title: "Weather Prediction Complete",
        description: "AI has analyzed your weather data successfully!",
      });
    } catch (error) {
      toast({
        title: "Prediction Error",
        description: "Sorry, there was an error predicting the weather. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-weather-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Weather Sense AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced weather classification powered by machine learning. Input atmospheric conditions and get instant weather type predictions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <WeatherForm onPredict={predictWeather} isLoading={isLoading} />
            </div>
            
            <div className="flex items-center justify-center">
              {prediction ? (
                <WeatherPrediction 
                  prediction={prediction} 
                  confidence={Math.floor(Math.random() * 20) + 80} // Mock confidence
                />
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-3xl">🌤️</span>
                  </div>
                  <p className="text-lg">Enter weather data to see prediction</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
