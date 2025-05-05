import './Footer.css';
import ContactUs from "@/components/ContactUs/ContactUs";


export default function Footer() {
    return (
      <footer className="footer">
        <h1>Vamos bater <span>um Papo?</span></h1>
        <ContactUs />
      </footer>
    );
  }