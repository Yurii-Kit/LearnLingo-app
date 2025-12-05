import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import personImage from "../../assets/68e4226188648a055ee1b42bed644f46-sticker 1@1x.png";
import personImage2x from "../../assets/68e4226188648a055ee1b42bed644f46-sticker 1@2x.png";
import macImage from "../../assets/Mac.png";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <Container className={css.heroContainer}>
      <section className={css.hero}>
        <div className={css.leftBox}>
          <h1 className={css.title}>
            Unlock your potential with the best&nbsp;
            <span className={css.text}>language</span> tutors
          </h1>
          <p className={css.description}>
            Embark on an Exciting Language Journey with Expert Language
            <br />
            Tutors: Elevate your language proficiency to new heights by
            <br />
            connecting with highly qualified and experienced tutors.
          </p>
          <Link to="/teachers" className={css.ctaButton}>
            Get started
          </Link>
        </div>
        <div className={css.rightBox}>
          <img
            src={personImage}
            srcSet={`${personImage} 1x, ${personImage2x} 2x`}
            alt="smiling person"
            className={css.personImage}
          />
          <img src={macImage} alt="laptop" className={css.laptopImage} />
        </div>
      </section>
      <section className={css.stats}>
        <ul className={css.statList}>
          <li className={css.statItem}>
            <span className={css.statNumber}>32,000+</span>
            <span className={css.statLabel}>Experienced tutors</span>
          </li>
          <li className={css.statItem}>
            <span className={css.statNumber}>300,000+</span>
            <span className={css.statLabel}>5-star tutor reviews</span>
          </li>
          <li className={css.statItem}>
            <span className={css.statNumber}>120+</span>
            <span className={css.statLabel}>Subjects taught</span>
          </li>
          <li className={css.statItem}>
            <span className={css.statNumber}>200+</span>
            <span className={css.statLabel}>Tutor nationalities</span>
          </li>
        </ul>
      </section>
    </Container>
  );
}
