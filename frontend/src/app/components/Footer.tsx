const Footer = () => (
  <footer className="bg-black text-white p-8">
    <div className="flex justify-between">
      <div>FOLLOW US</div>
      <div>
        <ul>
          <li>Shipping & Returns</li>
          <li>Size Guide</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <p>Sign up to receive news and updates.</p>
        <input type="email" placeholder="Email Address" className="p-2"/>
        <button className="bg-white text-black p-2">Sign Up</button>
      </div>
    </div>
    <p className="text-center mt-4">&copy; SEEN THE LABEL 2020 / MADE WITH SQUARESPACE</p>
  </footer>
);

export default Footer;
