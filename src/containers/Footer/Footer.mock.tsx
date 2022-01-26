import { ReactElement } from 'react';

import { DiscordIcon, MediumIcon, TelegramIcon, TwitterIcon } from 'components/Icons';

interface SocialsI {
  href: string;
  icon: ReactElement;
  alt: string;
}

type SocialT = SocialsI[];

export const socials: SocialT = [
  {
    href: 'https://medium.com/@GweiFinance',
    icon: <MediumIcon />,
    alt: 'medium',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <TwitterIcon />,
    alt: 'twitter',
  },
  {
    href: 'https://discord.com/invite/qKCBSGJk82',
    icon: <DiscordIcon />,
    alt: 'discord',
  },
  {
    href: 'https://t.me/gweifinance',
    icon: <TelegramIcon />,
    alt: 'telegram',
  },
];

export const PrivacyText: JSX.Element = (
  <div>
    <h3>Introduction</h3>
    <p>
      GWEI Finance and its affiliates (hereinafter, “GWEI Finance”, “the Company”, “we”, “us” or
      “our”) are committed to protecting and respecting your privacy. In addition, we recognize that
      persons who use GWEI Finance value their privacy. This Privacy Policy together with our Terms
      of Service governs our collection, processing and use of your Personal Information. By
      accessing GWEI Finance, you are consenting to the information collection and use practices
      described in this Privacy Policy.
    </p>
    <p>
      If you reside within the European Union (EU), European Economic Area (EEA), or Switzerland,
      GWEI Finance will be the data controller responsible for processing Your Information. See the
      Contact section of this Privacy Policy for details.
    </p>
    <p>
      This Privacy Policy applies to the operations of GWEI Finance in the European Economic Area
      (EEA). It gives you rights by operation of the EU GDPR. If you live outside the EEA, GWEI
      Finance will undertake best efforts to give you a similar degree of control over your privacy.
    </p>
    <h3>Purpose of Privacy Policy</h3>
    <p>
      The purpose of this Privacy Policy is to set out in an accountable and transparent way the
      collection and use of information by GWEI Finance.
    </p>
    <h3>Personal Information</h3>
    <p>
      “Personal Information” is information which identifies you personally or by which your
      identity can reasonably be ascertained. This may include but is not limited to:
    </p>
    <ul>
      <li>
        Full legal name, address for service, e-mail address, phone number, date of birth,
        photographic identification, government issued identification and other contact details.
      </li>

      <li>
        GWEI Finance requires the highest level of browser permissions that could potentially lead
        to procurement of more Personal Information than enclosed in the definition of Personal
        Information.
      </li>

      <li>
        World Wide Web related information, including but not limited to IP Addresses, operating
        system and browser type may be received by GWEI Finance as a result of your interactions
        with GWEI Finance.
      </li>

      <li>
        GWEI Finance uses Google Analytics for purposes of monitoring web traffic. Any identifying
        information collected via Google Analytics is controlled by Google.
      </li>

      <li>
        Solana blockchain and other public blockchains provide transparency into transactions and
        GWEI Finance is not responsible for preventing or managing information broadcasted on a
        blockchain.
      </li>
    </ul>
    <h3>Purpose of Personal Information collection</h3>
    <p>Personal Information is collected in order to:</p>
    <ul>
      <li>Provide our services efficiently and effectively;</li>
      <li>Inform you about lending and financing features;</li>
      <li>Develop, enhance, market and deliver products and services to you;</li>
      <li>Understand your needs and your eligibility for products and services;</li>
      <li>
        Provide information to you about developments and new products, including changes and
        enhancements to the Site;
      </li>
      <li>Process billing and collection of any fees;</li>
      <li>Conduct surveys and get feedback from you;</li>
      <li>Establish and maintain a responsible commercial relationship with you;</li>
      <li>
        Provide you with news and other matters of general interest to you as GWEI Finance customer;
      </li>
      <li>
        Meet GWEI Finance legal and regulatory requirements (eg, information required to verify your
        identity).
      </li>
    </ul>
    <h3>Security, Protection and Use of Personal Information</h3>
    <p>
      GWEI Finance is committed to protecting your privacy. Internally, only a specified number of
      employees within our business have access to your Personal Information. These employees have
      duties which reasonably require access to your Personal Information.
    </p>
    <p>
      GWEI Finance systems and data are constantly under review to ensure that you are getting the
      best level of service and that market leading security features are in place.
    </p>
    <p>
      GWEI Finance reserves the right to retain and share certain Personal Information in order to
      meet our regulatory and statutory requirements. In addition, GWEI Finance reserves the right
      to retain and share certain Personal Information with our corporate partners, and third
      parties acting on behalf of GWEI Finance.
    </p>
    <p>
      Personal Information and other related data may be exported outside of the jurisdiction in
      which you reside. Your Personal Information may be processed and stored in a foreign country
      or countries. Under those circumstances, the governments, courts, law enforcement or
      regulatory agencies of that country or those countries may be able to obtain access to your
      Personal Information through foreign laws. You need to be aware that the privacy standards of
      those countries may be lower than those of the jurisdiction in which you reside. You should
      note that you are not obliged to give your Personal Information to GWEI Finance, but if you
      choose not to do so, we may not be able to provide our services, or your access to our
      services may be limited.
    </p>
    <h3>Consent</h3>
    <p>
      Consent is required for the collection of Personal Information and the subsequent use of
      disclosure of Personal Information. The form of consent may vary depending upon the
      circumstances and the type of Personal information obtained. Your agreement with GWEI Finance
      Terms of Service constitutes your consent to the collection and use of Personal Information as
      described in this Privacy Policy. GWEI Finance reserves the right to use and disclose Personal
      Information without your knowledge or consent as permitted by applicable law.
    </p>
    <h3>Disclosure of Personal Information</h3>
    <p>
      We use the Personal Information for the purposes indicated at the time you provide us with
      such information, and/or otherwise for the purposes set out in this Privacy Policy and/or as
      otherwise permitted by law. We may make available the Personal Information that you provide to
      us to our affiliates, agents, representatives, service providers and contractors for these
      purposes. We also reserve the right to disclose Personal information that GWEI Finance
      believes, in good faith, is appropriate or necessary to enforce our Terms of Use, take
      precautions against liability or harm, to investigate and respond to third-party claims or
      allegations, to respond to a court order or official requests, to protect security or
      integrity of GWEI Finance and to protect the rights, property or safety of GWEI Finance, our
      uses or others.
    </p>
    <p>
      We may share Users’ Personal Information with any financial dispute resolution scheme to which
      the Company subscribes, and other law enforcement bodies, regulatory agencies, courts,
      arbitration bodies and dispute resolution schemes, both in Switzerland and internationally, as
      may be required by law.
    </p>
    <p>
      If you request it in writing, we may share your Personal Information with your nominated
      advisers. Except where disclosure of your Personal Information is required by law or requested
      by you, we will generally require any third party which receives or has access to Personal
      Information to protect such Personal Information and to use it only to carry out the services
      they are performing for you or for us, unless otherwise required or permitted by law. We will
      ensure that any such third party is aware of our obligations under this Privacy Policy and we
      will take reasonable steps to ensure that contracts we enter with such third parties binds
      them to terms no less protective of any Personal Information disclosed to them than the
      obligations we undertake to you under this Privacy Policy or which are imposed on us under
      applicable data protection laws.
    </p>
    <p>
      In the event that GWEI Finance is involved in a merger, acquisition, sale, bankruptcy,
      insolvency, reorganization, receivership, assignment or the application of laws or change of
      control, there may be a disclosure of your information to another entity related to such an
      event.
    </p>
    <h3>Access and Changing of Personal Information</h3>
    <p>
      You have the right to access the Personal Information we hold about you, and to require the
      correction, updating and blocking of inaccurate and/or incorrect data by sending an email to
      us. We will aim respond to your request within 14 days. You may also request the deletion or
      destruction of your Personal Information, your Account details, or your Transaction details by
      sending an email to us. GWEI Finance will act on your request only when it is not inconsistent
      with its legal and regulatory obligations and compliance procedures. Upon your written
      request, we will inform you of the use and general disclosure of your Personal Information.
      Depending on the nature of your request, there may be a minimal charge for accessing your
      Personal Information.
    </p>
    <h3>Security</h3>
    <p>
      We take reasonable steps to protect your Personal Information from misuse, loss, unauthorised
      access, modification or disclosure, including implementing appropriate security measures. The
      security measures in place will, from time to time, be reviewed in line with legal and
      technical developments. However, we give no guarantee that such misuse, loss, unauthorised
      access, modification or disclosure will not occur. There are protective measures that you
      should take which as well include but are not limited to changing password regularly, not
      sharing your Personal Information with other unless you clearly understand the purpose of
      their request and you know with whom you are dealing.
    </p>
    <h3>Retention of Personal Information</h3>
    <p>
      We will hold your Personal Information only for as long as it is necessary for us to do so,
      having regard to the purposes described in this Privacy Policy and our own legal and
      regulatory requirements. In general, Personal Information relating to your Account for at
      least a period of 5 years after your Account is closed. Similarly, we usually retain
      information about Transactions on your Account for a period of 5 years from the date of the
      Transaction. Personal Information which is collected for other purposes will be discarded inn
      accordance with our policies in place from time to time.
    </p>
    <h3>Users Under Age of 13</h3>
    <p>
      GWEI Finance does not knowingly collect or store any personal information about children under
      13 without verifiable prior parental consent. If you believe such information has been
      inadvertently collected, we will take necessary steps in order to remove such information from
      our database. Users under 13 must seek and obtain parental consent to use this website.
    </p>
    <h3>Links</h3>
    <p>
      There may be links from our Site to other sites and resources provided by third parties. This
      Privacy Policy applies only to our Site. Accessing those third-party sites or sources requires
      you to leave our Site. We do not control those third party sites or any of the content
      contained therein and you agree that we are in no way responsible or liable for any of those
      third party sites, including, without limitation, their content, policies, failures,
      promotions, products, services or actions and/or any damages, losses, failures or problems
      caused by, related to or arising from those sites. We encourage you to review all policies,
      rules, terms and regulations, including the privacy policies, of each site that you visit.
    </p>
    <h3>Changes</h3>
    <p>
      Our policies, content, information, promotions, disclosures, disclaimers and features may be
      revised, modified, updated, and/or supplemented at any time and without prior notice at the
      sole and absolute discretion of the Company. If we change this Privacy Policy, we will take
      steps to notify all Users by a notice on our website and will post the amended Privacy Policy
      on the website.
    </p>
    <h3>Contact Us</h3>
    <p>
      If you have any questions, comments, or concerns regarding our Privacy Policy and/or
      practices, please contact us at <a href="mailto:hi@gwei.fi">hi@gwei.fi</a>
    </p>
    <p>
      Should you have any question about these Terms, or wish to contact us for any reason
      whatsoever, please do so by sending us an email at
    </p>
  </div>
);

export const TermsText: JSX.Element = (
  <div>
    <h3>1. Introduction</h3>
    <p>
      In these GWEI Finance General Terms of Use (“Terms”), “GWEI Finance”, “we” and “us” refers GWEI Finance and we own
      and operate the website <a href='https://gwei.fi/'>www.gwei.fi</a> (“the Site”) which acts as a front-end to the
      decentralized GWEI Finance Protocol. These Terms apply to you (“You”) as a user of the Site and GWEI Finance
      front-end, including all the products, services, tools, and information made available on the Site.
    </p>
    <p>
      Please read these Terms carefully before using the Site. These Terms apply to any person accessing the Site and by
      using the Site you agree to be bound by them. If you don’t want to be bound by them, you should not access the
      Site. By using the Site in any capacity, you agree that you have read and understood these Terms.
    </p>

    <p>
      Please read these Terms carefully to ensure that you understand each provision. This agreement contains a
      mandatory individual arbitration and class action/jury trial waiver provision that requires the use of arbitration
      on an individual basis to resolve disputes, rather than jury trials or class actions.
    </p>
    <p>
      You must be able to form a legally binding contract online either as an individual or on behalf of a legal entity.
      You represent that, if you are agreeing to these Terms on behalf of a legal entity, you have the legal authority
      to bind the company or other legal entity to these Terms and you are at least 18 years old or the age of majority
      where you reside, whichever is older, can form a legally binding contract online, and have the full, right, power
      and authority to enter into and to comply with the obligations under these Terms.
    </p>
    <p>
      You are advised to check these Terms periodically to familiarise yourself with any changes to the Terms. GWEI
      Finance in its sole discretion, reserves the right to make changes to our terms of services. Changes are binding
      on users of the Site and will take effect immediately upon posting. As a user, you agree to be bound by any
      changes, variations, or modifications to our terms of service and your continued use of the Site shall constitute
      acceptance of any such changes, variations, or modifications.
    </p>
    <p>
      GWEI Finance will indicate on the Site of the changes to these Terms. You accept by doing so, we provide you with
      sufficient notice of such change.
    </p>
    <p>
      Our Privacy Policy and Cookie Policy also apply to your use of the Site.
    </p>
    <h3>2. Site</h3>
    <p>
      As part of the Site, GWEI Finance provides access to a decentralized finance application (“Application”) on the
      Ethereum (Uniswap V3) blockchain, that allows lenders or borrowers of Ethereum/Uniswap assets (“Cryptocurrency
      assets”) to transact using smart contracts (“Smart Contracts”).
    </p>
    <p>
      Using the GWEI Finance Protocol may require that you pay a fee, such as gas charges on the Ethereum network to
      perform a transaction. You acknowledge and agree that GWEI Finance has no control over any transactions, the
      method of payment of any transactions, or any actual payments of transactions. You must ensure that you have a
      sufficient balance to complete any transaction on the GWEI Finance Protocol before initiating such transaction.
    </p>
    <p>
      You acknowledge and agree that GWEI Finance has no control over any transactions over GWEI Finance Protocol, the
      method of payment of any transactions or any actual payments of transactions. Accordingly, you must ensure that
      you have a sufficient balance of the applicable cryptocurrency tokens stored at your GWEI Finance
      Protocol-compatible wallet address (“Cryptocurrency Wallet”) to complete any transaction on the GWEI Finance
      Protocol or the Ethereum network before initiating such transaction.
    </p>
    <h3>3. Access to the Site</h3>
    <p>
      Access to the Site is provided “as is” and “as available” basis only. We do not guarantee that the Site, or any
      content on it, will always be available or uninterrupted. From time to time, access may be interrupted, suspended
      or restricted, including because of a fault, error or unforeseen circumstances or because we are carrying out
      planned maintenance.
    </p>
    <p>
      We reserve the right to limit the availability of the site to any person, geographic area or jurisdiction we so
      desire and/or to terminate your access to and use of the site, at any time and in our sole discretion.
    </p>
    <p>
      We may suspend or disable your access to the Site if we consider it reasonable to do so, e.g. you breach these
      Terms.
    </p>
    <p>
      We may remove or amend the content of the Site at any time. However, some of the content may be out of date at any
      given time and we are under no obligation to update it. We do not guarantee that the Site, or any content on it,
      will be free from errors or omissions.
    </p>
    <p>
      We will not be liable to you for any loss or damage you may suffer as a result of the Site being unavailable at
      any time for any reason.
    </p>
    <p>
      You will comply with all applicable domestic and international laws, statutes, ordinances and regulations
      applicable to your use of the site.
    </p>
    <p>
      As a condition to accessing or using the the Site, you:
    </p>
    <ul>
      <li>will only use the Services and the Site for lawful purposes and in accordance with these Terms;</li>
      <li>will ensure that all information that you provide on the Site is current, complete, and accurate;</li>
      <li>will maintain the security and confidentiality of access to your cryptocurrency wallet address; and</li>
    </ul>
    <p>
      As a condition to accessing or using the Site or the Services, you will not:
    </p>
    <ul>
      <li>Violate any Applicable Law, including, without limitation, any relevant and applicable anti-money laundering
        and anti-terrorist financing laws and any relevant and applicable privacy and data collection laws, in each case
        as may be amended.
      </li>

      <li>use the Site for any purpose that is unlawful;</li>

      <li>Export, reexport, or transfer, directly or indirectly, any GWEI Finance technology in violation of applicable
        export laws or regulations;
      </li>

      <li>Infringe on or misappropriate any contract, intellectual property or other third-party right, or commit a tort
        while using the Site;
      </li>

      <li>Misrepresent the truthfulness, sourcing or reliability of any content on the Site;</li>

      <li>Use the Site in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from
        fully enjoying the Site or the GWEI Finance Protocol, or that could damage, disable, overburden, or impair the
        functioning of the Site or the GWEI Finance Protocol in any manner;
      </li>

      <li>Attempt to circumvent any content filtering techniques or security measures that GWEI Finance employs on the
        Site, or attempt to access any service or area of the Site that you are not authorized to access;
      </li>

      <li>Use any robot, spider, crawler, scraper, or other automated means or interface not provided by us, to access
        the Site to extract data;
      </li>

      <li>Introduce any malware, virus, Trojan horse, worm, logic bomb, drop-dead device, backdoor, shutdown mechanism
        or other harmful material into the Site;
      </li>

      <li>Post content or communications on the Site that are, in our sole discretion, libellous, defamatory, profane,
        obscene, pornographic, sexually explicit, indecent, lewd, vulgar, suggestive, harassing, hateful, threatening,
        offensive, discriminatory, bigoted, abusive, inflammatory, fraudulent, deceptive or otherwise objectionable;
      </li>

      <li>Post content on the Site containing unsolicited promotions, commercial messages or any chain messages or user
        content designed to deceive or trick the user of the Site; or
      </li>

      <li>Encourage or induce any third party to engage in any of the activities prohibited under these Terms.</li>
    </ul>
    <p>You acknowledge that the Site and your use of the Site contain certain risks, including without limitation the
      following risks:</p>
    <ul>
      <li>That any Smart Contracts you interact with are entirely your own responsibility and liability, and that GWEI
        Finance is not party to the Smart Contracts;
      </li>

      <li>At any time, your access to your cryptocurrency assets may be suspended or terminated or there may be a delay
        in your access or use of your cryptocurrency assets which may result in the cryptocurrency assets diminishing in
        value or you being unable to complete a Smart Contract;
      </li>

      <li>If you are a borrower of cryptocurrency assets and if your collateral declines such that your collateral is no
        longer sufficient to secure your borrowed cryptocurrency assets, other users may seize your collateral to close
        out your borrowed cryptocurrency asset balance;
      </li>

      <li>And site and/or application may be suspended or terminated for any or no reason, which may limit your access
        to your cryptocurrency assets.
      </li>
    </ul>
    <p>Accordingly, you expressly agree that:</p>
    <ul>
      <li>you assume all risk in connection with your access and use of the Site, the Application and the Smart
        Contracts;
      </li>
      <li>that you expressly waive and release GWEI Finance from any and all liability, claims, causes of action, or
        damages arising from or in any way related to your use of the Site, the Application or the Smart Contracts.
      </li>
    </ul>
    <h3>4. Third-Party Links</h3>
    <p>The Site may contain hyperlinks or references to third party websites. Any such hyperlinks or references are
      provided for your information and convenience only. We have no control over third party websites and accept no
      legal responsibility for any content, material or information contained in them. The display of any hyperlink and
      reference to any third-party website does not mean that we endorse that third party’s website, products or
      services. Your use of a third-party site may be governed by the terms and conditions of that third-party site.</p>
    <h3>5. Privacy Policy and Cookie Policy</h3>
    <p>
      Certain areas of our website may record and collect information about you. You can find more information about how
      we will you process your personal information in our Privacy Policy.
    </p>
    <h3>6. Intellectual Property Rights</h3>
    <p>
      We are the owner of all intellectual property rights in the Site and the material published on them. These works
      are protected by copyright laws and all such rights are reserved.
    </p>
    <p>
      <a href='https://gwei.fi/'>www.gwei.fi</a> is the uniform resource locator (‘URL’) of GWEI Finance. You will not
      make use of this URL (or any other URL owned by us) on another website or digital platform without our prior
      written consent.
    </p>
    <p>
      You agree not to monitor, use or copy our web pages without our prior consent. Any unauthorised use or
      reproduction may be prosecuted.
    </p>
    <p>
      You will retain ownership of all copyright in data you upload or submit to the Site. You grant us a worldwide,
      royalty-free, irrevocable licence to use, copy, distribute or publish and send this data in any manner.
    </p>
    <h3>7. Disclaimers</h3>
    <p>
      We do not guarantee that the Site will be secure or free from bugs or viruses.
    </p>
    <p>
      You are responsible for configuring your information technology, computer programmes and platform in order to
      access the Site. You should use your own virus protection software.
    </p>
    <p>
      We cannot promise that the use of the Site, or any content taken from the Site, will not infringe the rights of
      any third party.
    </p>
    <p>
      The content and materials available on the Site are for informational purposes only and is not intended to address
      your particular requirements. In particular, the content and materials available on the Site does not constitute
      any form of advice or recommendation by us, should not be regarded as an offer, solicitation, invitation or
      recommendation to buy or sell investments, securities or any other financial services and is not intended to be
      relied upon by you in making any specific investment or other decisions. We recommend that you seek independent
      advice from financial advisory before making any such decision.
    </p>
    <p>
      Nothing included in the site constitutes an offer or solicitation to sell, or distribution of, investments and
      related services to anyone in any jurisdiction.
    </p>
    <p>
      From time to time, reference may be made to data we have gathered. These references may be selective or, may be
      partial. As markets change continuously, previously published information and data may not be current and should
      not be relied upon.
    </p>
    <h3>General</h3>
    <p>
      We may perform any of our obligations, and exercise any of the rights granted to us under these Terms, through a
      third-party. We may assign any or all our rights and obligations under these Terms to any third-party.
    </p>
    <p>
      If any clause or part of any clause of these Terms is found to be void, unenforceable or invalid, then it will be
      severed from these Terms, leaving the remainder in full force and effect, provided that the severance has not
      altered the basic nature of these Terms.
    </p>
    <p>
      No single or partial exercise, or failure or delay in exercising any right, power or remedy by us shall constitute
      a waiver by us of, or impair or preclude any further exercise of, that or any right, power or remedy arising under
      these terms and conditions or otherwise.
    </p>
    <p>
      If any of the provisions in these Terms are found to be illegal, invalid or unenforceable by any court of
      competent jurisdiction, the remainder shall continue in full force and effect.
    </p>
    <p>
      All disclaimers, indemnities and exclusions in these Terms shall survive termination of the Terms and shall
      continue to apply during any suspension or any period during which the Site is not available for you to use for
      any reason whatsoever.
    </p>
    <p>
      These Terms and the documents referred to in them set out the entire agreement between you and us with respect to
      your use of the site, GWEI Finance and the services provided via the site and supersede any and all prior or
      contemporaneous representations, communications or agreements (written or oral) made between you or us.
    </p>
    <p>
      Any dispute, controversy, or claim arising out of or in relation to these Terms, including the validity,
      invalidity, breach or termination thereof, shall be settled by arbitration in accordance with the Swiss Rules of
      International Arbitration of the Swiss Chambers of Commerce in force on the date when the Notice of Arbitration is
      submitted in accordance with these Rules. The number of arbitrators shall be one or three; the seat of the
      arbitration shall be determined by the arbitrator(s); the arbitral proceedings shall be conducted in English. The
      applicable law shall be Swiss law.
    </p>
    <p>
      With respect to all persons and entities, regardless of whether they have obtained or used the site for personal,
      commercial or other purposes, all disputes, controversies or claims must be brought in the parties’ individual
      capacity, and not as a plaintiff or class member in any purported class action, collective action or other
      representative proceeding. This waiver applies to class arbitration, and, unless we agree otherwise, the
      arbitrator may not consolidate more than one person’s claims. You agree that, by entering into this agreement, you
      and GWEI Finance are each waiving the right to a trial by jury or to participate in a class action, collective
      action, or other representative proceeding of any kind.
    </p>
    <h3>Contacting Us</h3>
    <p>
      Should you have any question about these Terms, or wish to contact us for any reason whatsoever, please do so by
      sending us an email at <a href="mailto:hi@gwei.fi">hi@gwei.fi</a>
    </p>
  </div>
);
