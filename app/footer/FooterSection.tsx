import React from "react";
import Link from "next/link";

interface FooterItem {
  name: string;
  icon: React.ReactNode;
  link: string;
  highlight?: boolean;
}

interface FooterSectionProps {
  title: string;
  items: FooterItem[];
  iconColor?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  items,
  iconColor = "text-[#0F766E]",
}) => {
  const sectionId = title.replace(/\s+/g, "-").toLowerCase() + "-heading";

  return (
    <section aria-labelledby={sectionId}>
      <h3 id={sectionId} className="mb-5 text-lg font-bold text-[#111827]">
        {title}
      </h3>

      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.link}>
            <Link
      prefetch={false}
              href={item.link}
              className="group flex min-h-[36px] items-center gap-3 rounded-lg px-2 py-1.5 text-[#475569] transition hover:bg-white hover:text-[#0F766E]"
            >
              <span className={`${iconColor} text-base`}>{item.icon}</span>
              <span className="flex items-center gap-2">
                {item.name}
                {item.highlight && (
                  <span className="rounded-lg border border-[#F97316]/30 bg-[#C2410C]/10 px-2 py-[2px] text-[10px] text-[#F97316]">
                    Popular
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterSection;
