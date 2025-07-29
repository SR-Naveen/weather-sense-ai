import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CloudSun, Droplets, Wind, Gauge } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudCover: string;
  season: string;
  location: string;
}

interface WeatherFormProps {
  onPredict: (data: WeatherData) => void;
  isLoading?: boolean;
}

const WeatherForm = ({ onPredict, isLoading = false }: WeatherFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<WeatherData>({
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    pressure: 1013,
    cloudCover: "",
    season: "",
    location: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cloudCover || !formData.season || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get an accurate weather prediction.",
        variant: "destructive"
      });
      return;
    }

    onPredict(formData);
  };

  const updateField = (field: keyof WeatherData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-cloud border-0 bg-card/80 backdrop-blur-sm animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Weather Sense AI
        </CardTitle>
        <CardDescription className="text-lg">
          Enter weather parameters to predict weather conditions using AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature */}
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-primary" />
                Temperature (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                value={formData.temperature}
                onChange={(e) => updateField('temperature', Number(e.target.value))}
                className="bg-card border-border focus:ring-primary"
                step="0.1"
              />
            </div>

            {/* Humidity */}
            <div className="space-y-2">
              <Label htmlFor="humidity" className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-primary" />
                Humidity (%)
              </Label>
              <Input
                id="humidity"
                type="number"
                value={formData.humidity}
                onChange={(e) => updateField('humidity', Number(e.target.value))}
                className="bg-card border-border focus:ring-primary"
                min="0"
                max="100"
              />
            </div>

            {/* Wind Speed */}
            <div className="space-y-2">
              <Label htmlFor="windSpeed" className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-primary" />
                Wind Speed (km/h)
              </Label>
              <Input
                id="windSpeed"
                type="number"
                value={formData.windSpeed}
                onChange={(e) => updateField('windSpeed', Number(e.target.value))}
                className="bg-card border-border focus:ring-primary"
                min="0"
                step="0.1"
              />
            </div>

            {/* Pressure */}
            <div className="space-y-2">
              <Label htmlFor="pressure" className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-primary" />
                Pressure (hPa)
              </Label>
              <Input
                id="pressure"
                type="number"
                value={formData.pressure}
                onChange={(e) => updateField('pressure', Number(e.target.value))}
                className="bg-card border-border focus:ring-primary"
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cloud Cover */}
            <div className="space-y-2">
              <Label htmlFor="cloudCover">Cloud Cover</Label>
              <Select value={formData.cloudCover} onValueChange={(value) => updateField('cloudCover', value)}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select cloud cover" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">Clear</SelectItem>
                  <SelectItem value="partly_cloudy">Partly Cloudy</SelectItem>
                  <SelectItem value="cloudy">Cloudy</SelectItem>
                  <SelectItem value="overcast">Overcast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Season */}
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select value={formData.season} onValueChange={(value) => updateField('season', value)}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="autumn">Autumn</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location Type</Label>
              <Select value={formData.location} onValueChange={(value) => updateField('location', value)}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coastal">Coastal</SelectItem>
                  <SelectItem value="inland">Inland</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg shadow-weather-glow transition-all duration-300 hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing Weather..." : "Predict Weather Type"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeatherForm;