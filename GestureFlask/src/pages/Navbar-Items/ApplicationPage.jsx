import React from 'react';
import { motion } from 'framer-motion';
import { Car, Home, Lock, Building, Utensils, Store } from 'lucide-react';

const ApplicationPage = () => {
    const applications = [
        {
            title: "Automotive",
            icon: <Car className="w-8 h-8 text-emerald-500" />,
            description: "With the pivot to electric and self-driving vehicles, comes a new and exciting way to experience both the interior and exterior of the car-of-the-future. Add contactless interactions to navigation, climate control, and infotainment systems. Operate sunroof, wipers and doors without the need to touch.",
            image: "data:image/jpeg;base64,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",
            imageAlt: "Automotive gesture control"
        },
        {
            title: "Smart Home Interior",
            icon: <Home className="w-8 h-8 text-emerald-500" />,
            description: "Never have to find the remote control again! Use contractless software to interact with TV, control temperature of shower or demist your smart mirror. Operate lighting, computer applications and thermostats with natural and intuitive hand tracking and gestures.",
            image: "https://media.istockphoto.com/id/1069504040/photo/man-using-smart-home-application-on-mobile-phone.jpg?s=612x612&w=0&k=20&c=a-cOdOvjLdDLJ2w30bIOafEKPqwo6P302Yu1-vT1eTw=",
            imageAlt: "Smart home interior control"
        },
        {
            title: "Smart Home Exterior",
            icon: <Lock className="w-8 h-8 text-emerald-500" />,
            description: "Security has never been more important and easy ways to communicate with multiple devices is of the utmost importance. Add contactless interface to control security cameras and to lock/unlock entry doors. Operate garage doors, sprinklers and search lights with hand tracking and gestures.",
            image: "https://media.istockphoto.com/id/1412771100/photo/phone-control-with-smart-home-app-in-luxury-house.jpg?s=612x612&w=0&k=20&c=XiQ86U9IQyTrgc--h5ON7-wiFkrnWXao95OkSM6SQIU=",
            imageAlt: "Smart home exterior control"
        },
        {
            title: "Hospitality",
            icon: <Building className="w-8 h-8 text-emerald-500" />,
            description: "Seamlessly arrive in your hotel room to relax and enjoy the trip. Adding contactless interaction to digital check-in and elevator floor selection takes you effortlessly into privacy. Operate TV, lights, and even curtains without the need to touch or find remote controls!",
            image: "https://media.istockphoto.com/id/1393696392/vector/businessmen-make-deal.jpg?s=612x612&w=0&k=20&c=-gXjlLid5XJAzl8t9CMVe7aDmVsq82BndaX6Ahv69p0=",
            imageAlt: "Hospitality gesture control"
        },
        {
            title: "Kitchen Appliances",
            icon: <Utensils className="w-8 h-8 text-emerald-500" />,
            description: "Kitchen is the heart of any home and requires multiple appliances interactions. Add touch-free interaction with the refrigerator to see what's inside without opening the doors. Set the oven, and power the exhaust system. Rewind video recipes without touching screen with dirty hands.",
            image: "https://media.istockphoto.com/id/1127696675/vector/home-automatic-kettle-controlled-by-woman-smart-tech-teapot-recognizes-commands-voice.jpg?s=612x612&w=0&k=20&c=2PYZrQH2pMJrBPjFoWNFtGwdvcAtK6J43n_0JFUtyk8=",
            imageAlt: "Kitchen appliances control"
        },
        {
            title: "Retail",
            icon: <Store className="w-8 h-8 text-emerald-500" />,
            description: "Navigate to your favorite store seamlessly, try on your favorite jewelry and even sample and send clothes to the changing room with natural, intuitive gestures. No need to touch these devices, you can add contactless interaction to digital maps, online shopping, and even live surveys on digital displays.",
            image: "https://media.istockphoto.com/id/1345690660/photo/to-gain-access-to-personal-financial-data-a-businessman-uses-fingerprint-identification-e-kyc.jpg?s=612x612&w=0&k=20&c=j9KrvVnUKd6t_Ke8mzDRkofrQVgsbSBvHhmpvXoAyKE=",
            imageAlt: "Retail gesture control"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
          
            <section className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0b556d] leading-tight mb-8">
                        Unlock endless possibilities with camera-based hand tracking!
                        </h1>
                        <p className="text-2xl md:text-3xl text-teal-700 font-light">
                            Add powerful contactless interface to any product, in any sector
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center items-center"
                    >
                        <img
                            src="https://www.motiongestures.com/assets/Uploads/MOG-Hand-Banner-square-Peace-v2.jpg"
                            alt="Hand tracking illustration showing peace sign with tracking points"
                            className="w-full max-w-md h-auto"
                        />
                    </motion.div>
                </div>
            </section>

           
            <section className="container mx-auto px-4 py-12">
                <div className="space-y-24">
                    {applications.map((app, index) => (
                        <motion.div
                            key={app.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                                }`}
                        >
                            <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                <div className="flex items-center gap-4 mb-4">
                                    {app.icon}
                                    <h2 className="text-3xl font-bold text-[#0b556d]">{app.title}</h2>
                                </div>
                                <p className="text-2xl text-gray-600 leading-relaxed">{app.description}</p>
                            </div>
                            <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100"
                                >
                                    <img
                                        src={app.image}
                                        alt={app.imageAlt}
                                        className="w-full h-96"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            
        </div>
    );
};

export default ApplicationPage;