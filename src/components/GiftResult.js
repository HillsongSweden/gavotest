import axios from "axios";
import React, { useState } from "react";
import Dropdown from "./Dropdown";

import translations from "../functions/translations";

const CAMPUSES = [
  "Stockholm City",
  "Stockholm Norra",
  "Stockholm Södra",
  "Göteborg",
  "Jönköping",
  "Örebro",
];

export default function ({ topGifts, resetForm, language }) {
  const [email, setEmail] = useState("");
  const [campus, setCampus] = useState("Stockholm City");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [shareWithCampusPastor, setShareWithCampusPastor] = useState(false);

  async function sendResult(e) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await axios.post("/.netlify/functions/mail", {
        topGifts,
        email,
        campus,
        shareWithCampusPastor,
        language,
        firstname,
        lastname,
      });

      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (emailSent) {
    return (
      <div>
        <h1>{translations.thank_you_for_taking_the_test[language]}</h1>
        <button className="btn" type="button" onClick={resetForm}>
          {translations.start_over[language]}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>{translations.these_are_your_top_three[language]}</h3>
      {topGifts.map((g, i) => {
        return <h2 key={i}>{translations[g][language]}</h2>;
      })}
      <form onSubmit={sendResult} className="email-result">
        <h3>{translations.send_your_results_to_yourself[language]}</h3>
        <div className="form-group">
          <Dropdown
            options={[...CAMPUSES, translations.another_church[language]]}
            onSelect={setCampus}
            placeholderText={translations.select_your_campus[language]}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder={translations.firstname[language]}
            required
          />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder={translations.lastname[language]}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={translations.email[language]}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="shareWithPastor"
            type="checkbox"
            checked={shareWithCampusPastor}
            onChange={(e) => setShareWithCampusPastor(e.target.checked)}
            placeholder={translations.email[language]}
          />
          <label htmlFor="shareWithPastor" className="campus-pastor">
            {translations.share_your_results_with_your_campus_pastor[language]}
          </label>
        </div>
        <button className="btn send-result-btn" type="submit">
          {translations.send[language]}
        </button>
      </form>
    </div>
  );
}
