import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  ['about', 'Our Story'],
  ['how', 'How It Works'],
  ['features', 'The Observatory'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <Link className="logo" to="/#home">
        <svg className="logo-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20c0-8.5 6-14.5 16-16 .4 9.6-5.2 16-16 16Z" />
          <path d="M4.5 19.5C8 16 11.5 12.5 16 10" />
        </svg>
        Leafora
      </Link>
      <nav className="navlinks" aria-label="Main navigation">
        {links.map(([id, label]) => <Link key={id} to={'/#' + id}>{label}</Link>)}
      </nav>
      <Link className="btn" to="/#features">Try diagnosis <span aria-hidden="true">→</span></Link>
      <Button className="menu-toggle" aria-label="Open navigation" aria-expanded={open} icon={<Menu size={19} />} onClick={() => setOpen(true)} />
      <Drawer title="Leafora" size={300} open={open} onClose={() => setOpen(false)}>
        <nav className="flex flex-col gap-2 mobile-links" aria-label="Mobile navigation">
          {links.map(([id, label]) => <Link key={id} to={'/#' + id} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
      </Drawer>
    </header>
  );
}
