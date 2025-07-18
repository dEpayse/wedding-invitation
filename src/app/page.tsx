import Image from "next/image";
import styles from "./page.module.css";
import Container from "./components/Container";
import TopContent from "./components/TopContent";
import MainMessage from "./components/MainMessage";
import LoopVideo from "./components/common/PingpongVideo";
import ViewPortDate from "./components/ViewPortDate";
import { Calendar } from "./components/date/Calendar";
import { Dday } from "./components/date/Dday";
import {FamilyInfos} from "@/app/components/family/FamilyInfos";
import Gallery from "@/app/components/gallery/Gallery";
import Location from "@/app/components/location/Location";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Container>
          <TopContent />
          <MainMessage />
          <LoopVideo
            src="/videos/video_spiez.mp4"
            muted={true}
            controls={false}
            autoPlay={true}
            width="100%"
            height="auto"
          />
          <ViewPortDate />
          <Calendar />
          <Dday />
          <FamilyInfos />
          <Gallery />
          <Location />
        </Container>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
