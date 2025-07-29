import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, CloudRain, CloudSnow, Zap, Wind } from "lucide-react";

interface WeatherPredictionProps {
  prediction: string;
  confidence?: number;
}

const WeatherPrediction = ({ prediction, confidence }: WeatherPredictionProps) => {
  const getWeatherIcon = (weatherType: string) => {
    const type = weatherType.toLowerCase();
    if (type.includes('sunny') || type.includes('clear')) {
      return <Sun className="w-12 h-12 text-yellow-500 animate-float" />;
    } else if (type.includes('rain') || type.includes('drizzle')) {
      return <CloudRain className="w-12 h-12 text-blue-500 animate-float" />;
    } else if (type.includes('snow')) {
      return <CloudSnow className="w-12 h-12 text-blue-300 animate-float" />;
    } else if (type.includes('storm') || type.includes('thunder')) {
      return <Zap className="w-12 h-12 text-purple-500 animate-float" />;
    } else if (type.includes('wind')) {
      return <Wind className="w-12 h-12 text-gray-500 animate-float" />;
    } else {
      return <Cloud className="w-12 h-12 text-gray-400 animate-float" />;
    }
  };

  const getWeatherColor = (weatherType: string) => {
    const type = weatherType.toLowerCase();
    if (type.includes('sunny') || type.includes('clear')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (type.includes('rain') || type.includes('drizzle')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else if (type.includes('snow')) {
      return 'bg-blue-50 text-blue-700 border-blue-100';
    } else if (type.includes('storm') || type.includes('thunder')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    } else if (type.includes('wind')) {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    } else {
      return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatPrediction = (pred: string) => {
    // Convert prediction to readable format
    return pred.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-cloud border-0 bg-card/80 backdrop-blur-sm animate-fade-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Weather Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="flex justify-center">
          {getWeatherIcon(prediction)}
        </div>
        
        <div className="space-y-3">
          <Badge 
            variant="outline" 
            className={`text-lg px-4 py-2 font-semibold ${getWeatherColor(prediction)}`}
          >
            {formatPrediction(prediction)}
          </Badge>
          
          {confidence && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Confidence Level</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <p className="text-sm font-medium text-foreground">{confidence}%</p>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
          Prediction generated using machine learning algorithms based on historical weather patterns
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherPrediction;