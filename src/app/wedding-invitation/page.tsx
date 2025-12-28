import styles from "./page.module.css";
import Container from "../components/Container";
import TopContent from "../components/TopContent";
import MainMessage from "../components/MainMessage";
import { Calendar } from "../components/date/Calendar";
import { Dday } from "../components/date/Dday";
import { FamilyInfos } from "@/app/components/family/FamilyInfos";
import Gallery from "@/app/components/gallery/Gallery";
import Location from "@/app/components/location/Location";
import Rsvp from "@/app/components/rsvp/Rsvp";
import Account from "@/app/components/account/Account";
import Information from "@/app/components/information/Information";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Container>
          <TopContent />
          <MainMessage />
          <FamilyInfos />
          <Calendar />
          <Dday />
          <Gallery />
          <Location />
          <Rsvp />
          <Account />
          <Information />
          <Footer />
        </Container>
      </main>
    </div>
  );
}
