import AccountStatusNotice from "@/components/AccountStatusNotice";
import ContactBanner from "@/components/pages/contactus/Bannersection";
import ContactForm from "@/components/pages/contactus/ContactForm";
import ContactHeroSection from "@/components/pages/contactus/Herosection";
export default function Contact() {
  return (
    <>
      <main className="relative overflow-x-hidden w-full max-w-full">
        <ContactBanner />
        <ContactHeroSection />
        {/*
          Above the form on purpose. Someone whose account is still waiting on
          approval often arrives here to ask why a page will not open, so the
          answer should reach them before they write the message.
        */}
        <AccountStatusNotice className="py-6" />
        <ContactForm />
      </main>
    </>
  );
}
