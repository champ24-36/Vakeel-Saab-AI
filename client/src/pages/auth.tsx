import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useToast } from "@/hooks/use-toast";
import { 
  LogIn, 
  UserPlus, 
  Scale, 
  Shield, 
  CheckCircle,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { API_ENDPOINTS } from "@/lib/constants";

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Signup Schema
const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  preferredLanguage: z.string().min(1, "Please select a preferred language"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      preferredLanguage: "english",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', API_ENDPOINTS.AUTH.LOGIN, {
        email: data.email,
        password: data.password,
      });
      const result = await response.json();
      
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${result.user.firstName}!`,
      });
      
      // Handle successful login (store user data, redirect, etc.)
      console.log("Login successful:", result.user);
      
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      const { confirmPassword, acceptTerms, ...userData } = data;
      
      const response = await apiRequest('POST', API_ENDPOINTS.AUTH.REGISTER, userData);
      const result = await response.json();
      
      setIsSuccess(true);
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to LegalAI. You can now start using our AI legal assistant.",
      });
      
      // Reset form after successful signup
      setTimeout(() => {
        setIsSuccess(false);
        signupForm.reset();
        setActiveTab("login");
      }, 3000);
      
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-navy to-vintage-charcoal flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white space-y-8 lg:pr-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-antique-gold rounded-full flex items-center justify-center shadow-lg">
                <Scale className="w-8 h-8 text-vintage-navy" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold">LegalAI</h1>
                <p className="text-gray-300">Your AI Legal Assistant</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold leading-tight">
                Professional Legal
                <span className="text-antique-gold block">Assistance Simplified</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Access instant legal advice, connect with qualified lawyers, and get support 
                in your preferred Indian language - all in one platform.
              </p>
              
              <div className="space-y-4">
                {[
                  "24/7 AI-powered legal assistance",
                  "Connect with verified lawyers nationwide",
                  "Multi-language support for all Indian languages",
                  "Secure and confidential consultations"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-antique-gold flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-serif font-bold text-vintage-navy mb-3">
                        Welcome to LegalAI!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Your account has been created successfully. You'll be redirected to login shortly.
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting...</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="forms"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                          <TabsTrigger value="login" className="flex items-center space-x-2">
                            <LogIn className="w-4 h-4" />
                            <span>Sign In</span>
                          </TabsTrigger>
                          <TabsTrigger value="signup" className="flex items-center space-x-2">
                            <UserPlus className="w-4 h-4" />
                            <span>Sign Up</span>
                          </TabsTrigger>
                        </TabsList>

                        {/* Login Tab */}
                        <TabsContent value="login">
                          <div className="space-y-6">
                            <div className="text-center">
                              <h3 className="text-2xl font-serif font-bold text-vintage-navy">
                                Welcome Back
                              </h3>
                              <p className="text-gray-600 mt-2">
                                Sign in to access your legal assistant
                              </p>
                            </div>

                            <Form {...loginForm}>
                              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                                <FormField
                                  control={loginForm.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-vintage-charcoal">Email</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="email"
                                          placeholder="Enter your email"
                                          className="border-2 border-gray-200 focus:border-antique-gold"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={loginForm.control}
                                  name="password"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-vintage-charcoal">Password</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="border-2 border-gray-200 focus:border-antique-gold pr-10"
                                          />
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                          >
                                            {showPassword ? (
                                              <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                              <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                          </Button>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={loginForm.control}
                                  name="rememberMe"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm text-vintage-charcoal">
                                          Remember me
                                        </FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />

                                <Button
                                  type="submit"
                                  disabled={isLoading}
                                  className="w-full bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors btn-vintage"
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Signing In...
                                    </>
                                  ) : (
                                    <>
                                      <LogIn className="w-4 h-4 mr-2" />
                                      Sign In
                                    </>
                                  )}
                                </Button>
                              </form>
                            </Form>

                            <div className="text-center">
                              <a href="#" className="text-sm text-antique-gold hover:underline">
                                Forgot your password?
                              </a>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Signup Tab */}
                        <TabsContent value="signup">
                          <div className="space-y-6">
                            <div className="text-center">
                              <h3 className="text-2xl font-serif font-bold text-vintage-navy">
                                Create Account
                              </h3>
                              <p className="text-gray-600 mt-2">
                                Join thousands of users who trust LegalAI
                              </p>
                            </div>

                            <Form {...signupForm}>
                              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={signupForm.control}
                                    name="firstName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-vintage-charcoal">First Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            className="border-2 border-gray-200 focus:border-antique-gold"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={signupForm.control}
                                    name="lastName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-vintage-charcoal">Last Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            className="border-2 border-gray-200 focus:border-antique-gold"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Username and Email */}
                                <FormField
                                  control={signupForm.control}
                                  name="username"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-vintage-charcoal">Username</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          className="border-2 border-gray-200 focus:border-antique-gold"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={signupForm.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-vintage-charcoal">Email</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="email"
                                          className="border-2 border-gray-200 focus:border-antique-gold"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                {/* Phone and Language */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={signupForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-vintage-charcoal">Phone (Optional)</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="tel"
                                            className="border-2 border-gray-200 focus:border-antique-gold"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={signupForm.control}
                                    name="preferredLanguage"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-vintage-charcoal">Preferred Language</FormLabel>
                                        <FormControl>
                                          <LanguageSelector
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="border-2 border-gray-200 focus:border-antique-gold"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Password Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={signupForm.control}
                                    name="password"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-vintage-charcoal">Password</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              {...field}
                                              type={showPassword ? "text" : "password"}
                                              className="border-2 border-gray-200 focus:border-antique-gold pr-10"
                                            />
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                              onClick={() => setShowPassword(!showPassword)}
                                            >
                                              {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                              ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                              )}
                                            </Button>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={signupForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-vintage-charcoal">Confirm Password</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              {...field}
                                              type={showConfirmPassword ? "text" : "password"}
                                              className="border-2 border-gray-200 focus:border-antique-gold pr-10"
                                            />
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                              {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                              ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                              )}
                                            </Button>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Terms and Conditions */}
                                <FormField
                                  control={signupForm.control}
                                  name="acceptTerms"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm text-vintage-charcoal">
                                          I agree to the{" "}
                                          <a href="#" className="text-antique-gold hover:underline">
                                            Terms of Service
                                          </a>{" "}
                                          and{" "}
                                          <a href="#" className="text-antique-gold hover:underline">
                                            Privacy Policy
                                          </a>
                                        </FormLabel>
                                        <FormMessage />
                                      </div>
                                    </FormItem>
                                  )}
                                />

                                <Button
                                  type="submit"
                                  disabled={isLoading}
                                  className="w-full bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors btn-vintage"
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Creating Account...
                                    </>
                                  ) : (
                                    <>
                                      <UserPlus className="w-4 h-4 mr-2" />
                                      Create Account
                                    </>
                                  )}
                                </Button>
                              </form>
                            </Form>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-center"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-2 text-white text-sm">
                    <Shield className="w-4 h-4 text-antique-gold" />
                    <span>Your data is secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
