import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Easy Submission",
      description: "Submit complaints in minutes with our user-friendly form. Add photos, documents, and precise location details.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
    },
    {
      title: "Real-time Tracking",
      description: "Monitor your complaint's progress with instant updates and notifications at every stage of resolution.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="m16.24 16.24 2.83 2.83" />
        </svg>
      ),
    },
    {
      title: "Smart Routing",
      description: "Our AI-powered system ensures your complaint reaches the right department for quick resolution.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01" />
          <path d="M16 15.5v.01" />
          <path d="M12 12v.01" />
          <path d="M11 17v.01" />
          <path d="M7 14v.01" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Your Complaint",
      description: "Fill out our simple form with details about the issue, including location and category. Add photos or documents if needed.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Automatic Routing",
      description: "Our system automatically categorizes your complaint and routes it to the appropriate government department for review.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Status Updates",
      description: "Receive real-time updates on your complaint's status. Track its progress through various stages until resolution.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Resolution & Feedback",
      description: "Once resolved, you'll receive a notification. You can provide feedback on the resolution process and service quality.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  const categories = [
    {
      title: "Community Safety",
      description: "Street lighting, road safety, public spaces",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Infrastructure",
      description: "Roads, water supply, waste management",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-500",
    },
    {
      title: "Public Services",
      description: "Healthcare, education, transportation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m2 12 5.25 5.25" />
          <path d="m2 12 5.25-5.25" />
          <path d="m12 2 5.25 5.25" />
          <path d="m12 2-5.25 5.25" />
          <path d="m22 12-5.25-5.25" />
          <path d="m22 12-5.25 5.25" />
          <path d="m12 22-5.25-5.25" />
          <path d="m12 22 5.25-5.25" />
        </svg>
      ),
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white h-[90vh]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
        </div>

        <div className="absolute top-0 -left-4 w-56 h-56 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-56 h-56 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        <div className="container relative mx-auto px-4 h-full">
          <div className="grid lg:grid-cols-2 gap-12 h-full">
            <div className="hidden lg:flex items-start justify-center pt-24 lg:pt-32 order-2">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl blur opacity-25" />
                <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="space-y-4">
                    {categories.map((category, index) => (
                      <div 
                        key={index} 
                        className="group flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r hover:scale-102 transition-all duration-200 cursor-pointer"
                        style={{ background: `linear-gradient(to right, ${category.color})` }}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center ${category.iconColor} group-hover:bg-white/20 transition-colors`}>
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-medium text-base text-white group-hover:text-white/90 transition-colors">
                            {category.title}
                          </div>
                          <div className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center order-1">
              <div className="max-w-xl">
                <div className="inline-block mb-6">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    Empowering Citizens
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Your Voice Matters in Building a Better Community
                </h1>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Citizen Connect bridges the gap between citizens and local government. Report issues, track resolutions, and help improve your community - all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-2.5 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                    onClick={() => navigate("/submit")}
                  >
                    Report an Issue
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border border-white/20 text-white hover:bg-white/10 px-8 py-2.5 text-base font-semibold backdrop-blur-sm transition-all duration-200"
                    onClick={() => navigate("/track")}
                  >
                    Track Existing Complaint
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Citizen Connect?</h2>
          <p className="text-slate-600 text-lg">
            We've built a platform that makes it simple and efficient to report and track community issues. Here's what makes us different:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border-slate-200">
              <CardHeader className="p-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Button variant="ghost" className="w-full text-primary hover:text-primary/90 hover:bg-primary/5" onClick={() => navigate("/submit")}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-32 bg-slate-50">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-slate-600 text-lg">
            Our streamlined process makes it easy to submit and track your complaints. Here's how we handle your concerns:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-5 w-10 h-0.5 bg-primary/20" />
              )}
              
              <Card className="h-full hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border-slate-200">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="px-8" onClick={() => navigate("/submit")}>
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 