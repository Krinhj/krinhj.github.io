import React from 'react';
import { Mail, Linkedin, Github, MapPin, ExternalLink } from 'lucide-react';
import { SectionTitle, QuoteText } from '../UI/HolographicText';
import { CtaButton, NeonButton } from '../UI/NeonButton';

export const ContactPortal = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "ron.talabuconjr.dev@gmail.com",
      link: "mailto:ron.talabuconjr.dev@gmail.com",
      color: "primary"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "ronnie-talabucon-jr",
      link: "https://www.linkedin.com/in/ronnie-talabucon-jr-30528b31b",
      color: "primary-glow"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@Krinhj",
      link: "https://github.com/Krinhj",
      color: "primary"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Roxas City / Iloilo City, Philippines",
      link: "#",
      color: "primary-glow"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header with holo-text breathing effect */}
        <SectionTitle subtitle="Establish secure connection to the matrix">
          CONTACT PORTAL
        </SectionTitle>

        {/* Contact methods grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="energy-card rounded-xl p-6 group transition-all duration-300 hover:scale-105"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in 0.8s ease-out forwards'
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-electric bg-opacity-20 rounded-lg group-hover:animate-pulse">
                    <IconComponent className="w-6 h-6 text-red-electric" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-electric mb-1">
                      {method.label}
                    </h3>
                    <p className="text-white text-opacity-80 text-sm">
                      {method.value}
                    </p>
                  </div>
                  {method.link.startsWith('http') && (
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-electric transition-colors" />
                  )}
                </div>

                {/* Scan line effect on hover */}
                <div className="scan-line mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-px bg-gradient-to-r from-transparent via-red-electric to-transparent" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="energy-card rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-red-electric mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-white text-opacity-80 mb-6 leading-relaxed">
              Let's collaborate on your next project. Whether it's building cutting-edge web applications, 
              architecting robust databases, or exploring AI-powered solutions, I'm ready to make it happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton
                href="mailto:ron.talabuconjr.dev@gmail.com"
                icon={<Mail size={16} />}
              >
                SEND MESSAGE
              </CtaButton>
              <NeonButton
                href="#"
                variant="secondary"
                size="lg"
                className="font-bold tracking-wide"
              >
                <ExternalLink size={16} />
                DOWNLOAD RESUME
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Footer quote with glitch effect */}
        <div className="text-center mt-16">
          <QuoteText className="mb-2">
            "Mieux que jamais"
          </QuoteText>
          <p className="text-sm text-gray-400 mt-2">
            Leaving every project better than I found it
          </p>
        </div>

        {/* Bottom scan line */}
        <div className="mt-16 scan-line">
          <div className="h-px bg-gradient-to-r from-transparent via-red-electric to-transparent" />
        </div>
      </div>
    </section>
  );
};