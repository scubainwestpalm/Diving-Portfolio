'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import './socials.css';
import { MouseEventHandler } from "react";

export default function Socials() {
    return (
    <div className="flex socials flex-row space-x-5">
        <div className="icon text-blue-700" title="https://www.linkedin.com/in/austin-cisneros2000/" onClick={() => { return openNewTab("https://www.linkedin.com/in/austin-cisneros2000/") }}><FontAwesomeIcon icon={faLinkedin}/></div>
        <div className="icon text-zinc-700" title="https://github.com/scubainwestpalm" onClick={() => { return openNewTab("https://github.com/scubainwestpalm") }}><FontAwesomeIcon icon={faGithub}/></div>     
        <div className="icon text-white" title="austinbaron.coding@gmail.com" onClick={() => { window.open("mailto:austinbaron.coding@gmail.com", '_self') }}><FontAwesomeIcon icon={faEnvelope}/></div>   
        <div className="icon text-green-400" title="3864905130" onClick={() => { window.open("tel:3864905130", '_self') }}><FontAwesomeIcon icon={faPhoneAlt}/></div>         
    </div>
  )

  function openNewTab(url: string) {
    window.open(url, '_blank');
  }
}