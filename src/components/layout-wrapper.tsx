import { StaggeredMenu } from "@/components/staggered-menu";
import { Footer } from "@/components/footer";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
  { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
  { label: 'Skills', ariaLabel: 'View my skills', link: '#skills' },
  { label: 'Projects', ariaLabel: 'Explore my projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/CodeWithSindhu' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/kevalkumar-sindhu01/' },
  { label: 'Twitter', link: 'https://x.com/thekevalsindhu' }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#EAEAEA"
        openMenuButtonColor="#EAEAEA"
        changeMenuColorOnOpen={false}
        colors={['#151518', '#4F46E5']}
        accentColor="#4F46E5"
        isFixed={true}
        logoUrl="SK."
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

