"use client";

import Link from 'next/link';
import './testimonials-animation.css';

interface Testimonial {
  company: string;
  quote: string;
  personName: string;
  personTitle: string;
}

const testimonials: Testimonial[] = [
  {
    company: "WENDY'S QUALITY SUPPLY CHAIN CO-OP",
    quote: "Now, we've not only fixed our inventory problem, we've now taken a problem that would go on for weeks and days and fixed it in five minutes, making our people incredibly efficient.",
    personName: "Pete Suerken",
    personTitle: "President & CEO, Wendy's Quality Supply Chain Co-op"
  },
  {
    company: "WALGREENS",
    quote: "We started with the goal of piloting 10 stores within about six months. However, leveraging Foundry and AIP, we began to see real promise quickly in composing AI-powered, end-to-end workflows that allowed us to get to about 4000 stores within eight months.",
    personName: "Jeff Hoffman",
    personTitle: "Walgreens, VP, Product Pharmacy"
  },
  {
    company: "AT&T",
    quote: "[S.C.O.U.T] began as a joint effort between AT&T and Palantir, and now has over 100 AT&T dedicated engineers and a dedicated support team…for this application. It's just one of the 660 applications we have on Foundry today.",
    personName: "Dan Wagner",
    personTitle: "Dir. of Technology, AT&T"
  },
  {
    company: "PAREXEL",
    quote: "We estimate that this solution reduces our time to submission materials by over 50% from the current 10 to 12 week average to around 3 to 4 weeks. We can create this process, manage the process, standardize it...and cut [in] half the time that is required to get there.",
    personName: "Dan Ballard",
    personTitle: "SVP Digital Innovation, Parexel"
  },
  {
    company: "HEINEKEN",
    quote: "We had a great chassis of the car. But our engine was underpowered. So we went to Palantir because we want to have the best engine out there...In three months, [the teams] built what took us three years before.",
    personName: "Laurens van de Rotte",
    personTitle: "Chief Operating Officer, Heineken USA"
  },
  {
    company: "L3HARRIS",
    quote: "I did not want a dashboard to tell me I was in trouble. I know when I'm in trouble. I wanted someone to give me some predictives, and some ways to...get me not only technologically advanced, but decisionally be more agile and and able to maximize cost [savings] and efficiencies.",
    personName: "Jay Abendroth",
    personTitle: "President, Integrated Vision Solutions Sector, L3Harris"
  },
  {
    company: "GENERAL MILLS",
    quote: "We're saving on average about $40,000 a day, which is about $14M annually – and it's really only deployed to part of our network.",
    personName: "Dave Jackett",
    personTitle: "General Mills, Sr. Director Supply Chain Digital Transformation"
  },
  {
    company: "UNITED AIRLINES",
    quote: "We deployed Chime late last year…we've already saved almost 300 delays, 20 cancellations...this represents millions of dollars of cost avoidance.",
    personName: "Luis Mesen",
    personTitle: "United Airlines, Dir. Of Tech Ops Data Analytics"
  },
  {
    company: "FUJITSU",
    quote: "We've combined Foundry's data integration capabilities and Fujitsu's machine learning AI to transform our operations … creating alert systems, demand forecasting, inventory control systems, and so on. This transformation resulted in an impressive annual cost reduction of $9M within just 3 months.",
    personName: "Kazuki Hiraiso",
    personTitle: "Fujitsu, Data Scientist"
  },
  {
    company: "ARCHER AVIATION",
    quote: "We've been able to build an ontology...and really get this all to come together in a faster time scale than ever been seen for an aircraft certification program of this magnitude.",
    personName: "Adam Wormoth",
    personTitle: "Archer Aviation, Head of Product"
  }
];

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <div className="hover-text-container">
        <div className="hover-earmark-text">{testimonial.company}</div>
        <div className="hover-title-text">"{testimonial.quote}"</div>
        <div className="hover-appear-section">
          <div className="person-name">{testimonial.personName}</div>
          <div className="hover-logo-text">{testimonial.personTitle}</div>
        </div>
      </div>
    </div>
  );
}

interface SocialProofSectionProps {
  testimonials?: any[]; // Keep this prop for backward compatibility but we'll use our own data
}

export function SocialProofSection({ testimonials: _ }: SocialProofSectionProps) {
  return (
    <section id="casos-exito" className="py-16 sm:py-24 bg-card">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="animated-line">
            <div className="animated-line-rule"></div>
          </div>
          
          <h2 className="text-4xl leading-tight my-12 font-normal tracking-tight text-card-foreground">
            What our partners say about us
          </h2>
          
          <div className="testimonials-cards">
            {/* First Track */}
            <div className="testimonials-track">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
        </div>

            {/* Second Track (Duplicate for seamless scrolling) */}
            <div className="testimonials-track" aria-hidden="true">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`duplicate-${index}`} testimonial={testimonial} />
              ))}
                    </div>
                  </div>
          
          <div className="animated-line">
            <div className="animated-line-rule"></div>
                  </div>
          
          <div className="footer-cta-container">
            <Link href="#" className="footer-cta footer-cta-light">
              <span>Request a Demo</span>
              <span>→</span>
            </Link>
            <Link href="#" className="footer-cta footer-cta-dark">
              <span>Empieza a usar</span>
              <span>→</span>
            </Link>
          </div>
          
          <div className="animated-line">
            <div className="animated-line-rule"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
