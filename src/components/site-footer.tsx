import { portfolioContent } from "@/content/portfolio";
import { getPrivateProfile } from "@/lib/private-profile";

export function SiteFooter() {
  const privateProfile = getPrivateProfile();
  const footerLinks = [
    privateProfile.email,
    privateProfile.linkedin,
    privateProfile.github
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 pb-10 pt-4 text-sm text-stone-500 sm:px-8 lg:px-10">
      <div className="hairline w-full" />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="font-medium text-stone-300">{portfolioContent.person.name}</p>
          <p className="max-w-2xl text-stone-500">{portfolioContent.person.role}</p>
        </div>
        {footerLinks.length > 0 ? (
          <div className="flex flex-wrap gap-4 text-stone-400">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
