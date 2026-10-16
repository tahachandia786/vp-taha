import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Server as ServerIcon, Mail, Lock, User } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast({
          title: "Kamyabi",
          description: "Aap kamyabi se log in ho chuke hain",
        });
      } else {
        await register(formData.email, formData.password, formData.name);
        toast({
          title: "Kamyabi",
          description: "Aap ka account ban chuka hai",
        });
      }
    } catch (error: any) {
      toast({
        title: "Kharabi",
        description: error.message || "Kuch ghalt ho gaya hai",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ServerIcon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Multi VPS Server Management
          </CardTitle>
          <CardDescription>
            {isLogin ? "Apne account me log in karein" : "Naya account banayein"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Naam</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Apna username darj karein"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    data-testid="input-name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Apna email address darj karein"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Apna password darj karein"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  data-testid="input-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="button-submit"
            >
              {loading ? "Sabar karein..." : isLogin ? "Log In" : "Register Karein"}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground"
              data-testid="button-toggle-mode"
            >
              {isLogin ? "Account nahi hai? Muft register karein" : "Pehle se account hai? Abhi log in karein"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
