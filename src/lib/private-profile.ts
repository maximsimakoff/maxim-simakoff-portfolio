import "server-only";

export type PrivateLink = {
  label: string;
  value: string;
  href: string;
};

export type PrivateProfile = {
  location: string;
  email: PrivateLink | null;
  phone: PrivateLink | null;
  linkedin: PrivateLink | null;
  github: PrivateLink | null;
  contactLinks: PrivateLink[];
};

function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

function withoutProtocol(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function makeLink(label: string, value: string, href: string): PrivateLink | null {
  if (!value || !href) {
    return null;
  }

  return { label, value, href };
}

export function getPrivateProfile(): PrivateProfile {
  const location = clean(process.env.PORTFOLIO_LOCATION) || "Massachusetts";
  const emailValue = clean(process.env.PORTFOLIO_EMAIL);
  const phoneValue = clean(process.env.PORTFOLIO_PHONE);
  const phoneHref = clean(process.env.PORTFOLIO_PHONE_HREF);
  const linkedinHref = clean(process.env.PORTFOLIO_LINKEDIN_URL);
  const githubHref = clean(process.env.PORTFOLIO_GITHUB_URL);

  const email = makeLink("Email", emailValue, emailValue ? `mailto:${emailValue}` : "");
  const phone = makeLink(
    "Phone",
    phoneValue,
    phoneHref || (phoneValue ? `tel:${phoneValue.replace(/[^\d+]/g, "")}` : "")
  );
  const linkedin = makeLink(
    "LinkedIn",
    clean(process.env.PORTFOLIO_LINKEDIN_LABEL) || withoutProtocol(linkedinHref),
    linkedinHref
  );
  const github = makeLink(
    "GitHub",
    clean(process.env.PORTFOLIO_GITHUB_LABEL) || withoutProtocol(githubHref),
    githubHref
  );

  return {
    location,
    email,
    phone,
    linkedin,
    github,
    contactLinks: [email, linkedin, github, phone].filter(
      (item): item is PrivateLink => item !== null
    )
  };
}
