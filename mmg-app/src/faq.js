import React, { useState, useEffect } from "react";
import "./faq.css";
import Protein from "./assets/protein.png";
import MilkTM from "./assets/Logo-TM-1.svg";
import Top from "./assets/Top.png";
import Instagramheader from "./assets/instagram-header.svg";
import LinkedInheader from "./assets/linkedin-header.svg";
import Facebookheader from "./assets/facebook-header.svg";
import Copyright1 from "./assets/copyright1.svg";
import Copyrightline from "./assets/Line 23.svg";

const tabData = {
  general: [
    {
      question: "1. What is MilkMyGains, and what makes it unique?",
      answer:
        "We’re an active lifestyle brand dedicated to bringing high-protein, low-fat, low-calorie dairy products that support your fitness and health goals. Our mission? To solve the protein gap, by transforming traditional dairy into a powerhouse of nutrition and purity. With every product, you get top-quality, traceable ingredients that fuel an active, healthy lifestyle.",
    },
    {
      question: "2. Why focus on high-protein dairy products?",
      answer:
        "MilkMyGains is more than just a dairy brand! We’re an active lifestyle brand dedicated to bringing high-protein, low-fat, low-calorie dairy products that support your fitness and health goals. Our mission? To solve the protein gap, especially for vegetarians, by transforming traditional dairy into a powerhouse of nutrition and purity. With every product, you get top-quality, traceable ingredients that fuel an active, healthy lifestyle.",
    },
    {
      question: "3. Who can benefit from MilkMyGains products?",
      answer:
        "Everyone! Whether you’re a fitness enthusiast, young professional, busy parent, or simply looking to make healthier choices, MilkMyGains has you covered. Our products support a wide range of goals, from muscle gain to fat loss to general wellness, making it easier for anyone to live an active, fulfilling lifestyle.",
    },
    {
      question: "4. What is the mission behind MilkMyGains?",
      answer:
        "Our mission is to change the perception of dairy in India and make high-protein options accessible to everyone. We want to empower you with clean, traceable, nutritious options that support active lifestyles, helping you reach goals for fitness, energy, longevity, and overall well-being.",
    },
    {
      question: "5. How does MilkMyGains maintain quality?",
      answer:
        "Quality is in our DNA! From sourcing premium ingredients to rigorous quality checks at every step, we ensure our products meet the highest standards. Every item undergoes testing and certification, and we proudly share this with you through our traceable supply chain.",
    },
    {
      question: "6. Can I join the MilkMyGains community?",
      answer:
        "Yes! Follow us on Instagram @milkmygains, join our facebook community, and look out for events and challenges on our website where you can connect with others who share a passion for fitness and wellness.",
    },
  ],
  "why-high-protein": [
    {
      question: "1. Why is protein important for my health?",
      answer:
        "Protein is the building block of life! It helps your body repair tissues, build muscle, support immune function, and maintain healthy skin, hair, and nails. Whether you’re looking to boost energy, recover from workouts, or stay full and satisfied throughout the day, protein plays a key role in keeping you healthy and strong.",
    },
    {
      question: "2. How much protein do I need?",
      answer:
        "Your protein needs depend on your age, activity level, and health goals. Generally, active individuals require more protein to support muscle repair and growth. Aiming for 1.2 to 2.0 grams of protein per kilogram of body weight is ideal for those with fitness goals, while those with general health goals may need a bit less.",
    },
    {
      question: "3. Can I get enough protein on a vegetarian diet?",
      answer:
        "Yes, and we’re here to make it even easier! Traditional vegetarian diets can sometimes fall short on protein, which is why we created high-protein dairy products that fit seamlessly into vegetarian meals. Our offerings are packed with natural protein, allowing vegetarians to reach their health and fitness goals without relying on supplements.",
    },
    {
      question: "4. How does high protein support fitness goals?",
      answer:
        "Protein is your workout’s best friend! It’s essential for muscle repair, recovery, and growth, helping you make the most of every training session. A diet high in protein also supports fat loss by keeping you full longer, preserving lean muscle, and helping boost metabolism.",
    },
    {
      question: "5. Is high protein only for bodybuilders or athletes?",
      answer:
        "Not at all! High protein isn’t just for athletes; it’s for everyone who wants to feel strong, energized, and satisfied. High-protein diets can benefit people of all ages, helping to maintain muscle mass, support weight management, and even promote longevity and bone health.",
    },
    {
      question: "6. Can high protein help with weight management?",
      answer:
        "Yes! Protein is known to promote feelings of fullness and satiety, which can help control hunger and reduce snacking. By keeping you full and satisfied, a protein-rich diet can support weight management goals and keep your energy steady throughout the day.",
    },
  ],
  "about-product": [
    {
      question: "1. What products does MilkMyGains offer?",
      answer:
        "MilkMyGains currently offers high-protein, low-fat paneer—a delicious way to boost your protein intake! We’re planning to expand our lineup soon with other high-protein, dairy-based options like milk, curd, puddings, and even ice cream. Stay tuned for more ways to make every meal high-protein and low-calorie!",
    },
    {
      question: "2. What makes MilkMyGains products different?",
      answer:
        "Our product is crafted with a purpose: High in protein, low in fat, and low in calories—without compromising on taste. Making it a perfect choice for anyone focused on health and fitness.",
    },
    {
      question: "3. Are MilkMyGains products vegetarian-friendly?",
      answer:
        "Absolutely! All our products are vegetarian and designed to meet the protein needs of those following a vegetarian diet. We’re here to offer tasty, natural protein options for vegetarians and anyone looking to increase their protein intake without supplements.",
    },
    {
      question:
        "4. Do MilkMyGains products contain any additives or preservatives?",
      answer:
        "Nope! MilkMyGains is committed to providing clean, natural, and nutritious products. We keep our ingredients simple and free from unnecessary additives, artificial preservatives, and fillers. Just pure, powerful protein you can trust.",
    },
    {
      question: "5. Are MilkMyGains products antibiotic-free?",
      answer:
        "Yes, our products are made from milk sourced from farms with strict quality and antibiotic-free practices. You can feel confident in the purity of every bite, knowing we prioritize high standards of safety and quality.",
    },
    {
      question:
        "6. Can I consume MilkMyGains products if I’m lactose intolerant?",
      answer:
        "Our products are designed to be high in protein and low in lactose. However, if you have lactose intolerance, we recommend checking with your healthcare provider before consuming dairy products. We’re also working on lactose-free options to expand our product range in the future!",
    },
    {
      question: "7. Where do you source your ingredients from?",
      answer:
        "We partner with trusted local farms that meet our strict quality and ethical standards. Each farm is committed to sustainable practices and producing the highest quality milk, ensuring MilkMyGains products are pure, nutritious, and environmentally conscious.",
    },
    {
      question: "8. Are there any allergens in MilkMyGains products?",
      answer:
        "Our primary allergen is dairy, as our products are made from milk. If you have any specific allergies or concerns, please review our ingredient lists or reach out to us—we’re here to help with any questions.",
    },
    {
      question: "9. Can I expect a certificate of analysis for each product?",
      answer:
        "Yes! Each MilkMyGains product comes with a certificate of analysis detailing its macro and micronutrient content. We believe in full transparency, so you know exactly what you’re getting in each product.",
    },
  ],
  subscription: [
    {
      question: "Does MilkMyGains offer a subscription service?",
      answer:
        "Yes! We offer a flexible subscription service where you can have MilkMyGains products delivered weekly for 30, 60, or 90 days.",
    },
    {
      question: "What are the benefits of a MilkMyGains subscription?",
      answer:
        "With a subscription, you’ll never run out of your go-to high-protein products! You’ll also receive exclusive perks like discounts, early access to new products, and priority customer support.",
    },
  ],
  "order-shipping": [
    {
      question: "1. How can I place an order with MilkMyGains?",
      answer:
        "Ordering is easy! Just visit our website, browse our products, and add your favorites to the cart. Follow the checkout process to confirm your purchase, and you’re all set! We’re also available on select quick commerce platforms for faster delivery options.",
    },
    {
      question: "2. Where does MilkMyGains deliver?",
      answer:
        "Currently, we deliver to select locations within Bangalore. We’re expanding quickly, so stay tuned for updates as we grow our delivery network to reach more cities and areas!",
    },
    {
      question: "3. How long does delivery take?",
      answer:
        "Once your order is confirmed, you can expect delivery within 1-2 days if you’re in our standard delivery area. For certain locations, we may offer same-day or next-day delivery options, especially through our quick commerce partners.",
    },
    {
      question: "4. Is there a minimum order amount for delivery?",
      answer:
        "To ensure freshness and efficient delivery, we may have a minimum order requirement. You can check our website for details or get in touch with us for more information on order requirements and options.",
    },
    {
      question: "5. Can I track my order?",
      answer:
        "Yes, you’ll receive an order confirmation email with a tracking link once your order is on its way. You can use this link to check the status of your delivery at any time.",
    },
    {
      question: "6. What are the shipping fees?",
      answer:
        "Shipping fees may vary depending on your location and order size. We strive to keep delivery costs as low as possible, and we also offer free shipping promotions on select orders! Check our website for the latest details on shipping rates.",
    },
    {
      question: "7. Can I change or cancel my order after placing it?",
      answer:
        "We understand that plans change! If you need to modify or cancel your order, please contact our customer service team as soon as possible. We’ll do our best to accommodate your request if the order hasn’t yet shipped.",
    },
    {
      question:
        "8. What should I do if I receive a damaged or incorrect product?",
      answer:
        "We’re committed to ensuring that you receive your products in perfect condition. If there’s an issue with your order, please contact us with your order details and a photo of the item. We’ll work quickly to resolve the issue with a replacement or refund, as needed.",
    },
    {
      question: "9. Can I return products if I change my mind?",
      answer:
        "Due to the perishable nature of our products, we’re unable to accept returns for items that have already been delivered. However, if you’re unsatisfied with your purchase, reach out to our support team—we’re here to help make things right!",
    },
    {
      question: "10. Do you offer gift options or packaging?",
      answer:
        "Yes! MilkMyGains products make great gifts for health-conscious friends and family. We offer special packaging and gift options during select seasons. Check our website or reach out to us directly for more details on gift packaging.",
    },
    {
      question: "11. Will I be notified if there’s a delay with my order?",
      answer:
        "Yes, if there’s an unexpected delay, we’ll notify you right away with updated delivery information. You can also reach out to our support team at any time for updates on your order.",
    },
    {
      question: "12. What if I’m not home during delivery?",
      answer:
        "No problem! You can add delivery instructions during checkout to let us know if it’s okay to leave your package with a neighbor or at a designated spot. Alternatively, you can reschedule the delivery if needed—just contact us for assistance.",
    },
  ],
  subscription: [
    {
      question: "1. Does MilkMyGains offer a subscription service?",
      answer:
        "Yes! To make it easier for you to get your favorite high-protein products regularly, we offer a flexible subscription service. You can choose to have MilkMyGains products delivered weekly for 30,60 or 90 days.",
    },
    {
      question: "2. How do I sign up for a subscription?",
      answer:
        "Signing up is simple! Just select the “Subscribe” option on the product page, choose your preferred delivery frequency, and add it to your cart. Follow the checkout process, and you’re all set! You’ll receive your first order right away, and subsequent orders will follow the schedule you selected.",
    },
    {
      question: "3. What are the benefits of a MilkMyGains subscription?",
      answer:
        "With a subscription, you’ll never run out of your go-to high-protein products! You’ll also receive exclusive perks like discounts on each subscription order, early access to new products, and priority customer support. Plus, you can skip or modify deliveries whenever needed, giving you flexibility and peace of mind.",
    },
    {
      question: "4. Can I change my delivery frequency after subscribing?",
      answer:
        "Yes, you’re in full control! You can adjust your delivery frequency at any time by logging into your account and selecting your preferred schedule. If you need assistance, our customer service team is also happy to help.",
    },
    {
      question: "5. Can I pause or skip a delivery?",
      answer:
        "Absolutely. We understand that plans change, so you can pause or skip an upcoming delivery anytime through your account. Whether you’re going on vacation or just need a break, we’ve got you covered.",
    },
    {
      question: "6. How do I cancel my subscription?",
      answer:
        "If you decide to cancel your subscription, you can do so at any time by visiting your account settings. There are no cancellation fees, and you can reactivate your subscription whenever you’d like!",
    },
    {
      question: "7. Will I be notified before each subscription delivery?",
      answer:
        "Yes, you’ll receive a notification a few days before each delivery, so you can review or make any adjustments to your order. This way, there are no surprises, and you’ll always know when your next shipment is arriving.",
    },
    {
      question: "8. Can I add or remove products from my subscription?",
      answer:
        "Definitely! You can customize your subscription by adding more products or changing your current selections. Just log into your account to make adjustments, or reach out to us if you need assistance.",
    },
    {
      question: "9. Are there discounts for subscribing?",
      answer:
        "Yes, as a subscriber, you’ll enjoy a discount on each delivery compared to one-time purchases. Subscriptions are our way of saying “thank you” for being a loyal MilkMyGains customer!",
    },
    {
      question: "10. What payment methods can I use for my subscription?",
      answer:
        "We accept all major credit and debit cards for subscription payments. You can also update your payment details anytime through your account.",
    },
    {
      question: "11. Will I be able to try new products as a subscriber?",
      answer:
        "Yes! As a subscriber, you’ll get early access to new products and flavors before they’re available to everyone else. Keep an eye out for special announcements and be the first to try our latest high-protein offerings!",
    },
    {
      question: "12. Is there a minimum subscription period?",
      answer:
        "No, there’s no minimum commitment. You’re free to cancel or adjust your subscription anytime, making it a totally risk-free way to keep up with your high-protein goals.",
    },
  ],
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active question
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScroll(scrolled);
    };

    const updateScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  const scrollToTop = () => {
    document.querySelector(".home-wrapper")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <>
        <div className="main-color">
          <div className="main-container">
            <h1 className="frequent-heading">FREQUENTLY ASKED QUESTION</h1>
            <div className="tabs">
              {Object.keys(tabData).map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>

            <div className="faq-content show">
              {tabData[activeTab].map((item, index) => (
                <div key={index} className="faq-item">
                  <h3
                    className="faq-question"
                    onClick={() =>
                      window.innerWidth < 500 && toggleSection(index)
                    }
                  >
                    {item.question}
                    {window.innerWidth < 500 && (
                      <span className="plus-icon">
                        {activeIndex === index ? "-" : "+"}
                      </span>
                    )}
                  </h3>
                  {/* Only show the answer if the screen width is less than 500px and the question is active */}
                  {(window.innerWidth < 500 ? activeIndex === index : true) && (
                    <p className="faq-answer">{item.answer}</p>
                  )}
                </div>
              ))}

              {/* {privacyData.map((section, index) => (
                <div className="conditions" key={index}>
                  <h3
                    className="terms-title"
                    onClick={() =>
                      window.innerWidth < 500 && toggleSection(index)
                    }
                  >
                    {section.title}
                    {window.innerWidth < 500 && (
                      <span className="plus-icon">
                        {activeIndex === index ? "-" : "+"}
                      </span>
                    )}
                  </h3>
                  {(window.innerWidth < 500 ? activeIndex === index : true) && (
                    <div className="terms-para">{section.content}</div>
                  )}
                </div>
              ))} */}
            </div>
          </div>
          {/* Scroll to Top Button */}
          <div className="top">
            <img
              src={Top}
              className="top-image"
              onClick={() => scrollToTop()}
              alt="Back to top"
            />
          </div>
          <div className="proteins-container pt-5 pb-5">
            <div className="milk-pic-container">
              <img src={MilkTM} className="milk-image2" alt="milk-pic" />
            </div>
            <div className="signup-container">
              <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
              <div>
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="email-placing"
                />
                <button className="Subscribe-button">Subscribe</button>
              </div>
            </div>
            {/* <div className="social-media-containers-2">
              <img src={LinkedInheader} className="linked-in" alt="" />
              <img src={Facebookheader} className="facebook" alt="" />
              <img src={Instagramheader} className="instagram" alt="" />
            </div> */}
            <div className="footers-column shop-footers mt-5">
              <div className="footer-column-links">
                <ul className="footers-links">
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/product/milk-my-gains-sample-product"
                    >
                      SHOP
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/about"
                    >
                      ABOUT US
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/faq"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/contact"
                    >
                      CONTACT
                    </a>
                  </li>
                </ul>
                <ul className="footer-links-1">
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/shipping"
                    >
                      SHIPPING
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/refund"
                    >
                      REFUND & RETURNS
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/terms"
                    >
                      TERMS & CONDITIONS
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/privacy"
                    >
                      PRIVACY POLICY
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
      <div className="footers mb-3">
        <p className="copyright-text">Copyright © 2025. All rights reserved</p>
      </div>
    </>
  );
};

export default Faq;
